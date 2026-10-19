import { escapeHtml } from './richText';
import { fillTokens, fillTokensHtml } from './tokens';
import { LEGAL_PAGE_DEFAULTS } from './legalDefaults';
import { specToPortableText } from './legalPortableText';
import { clean, fetchOrNull } from './pageContent';
import { normalizeWebsiteCopy, textOr } from './sanity';
import type { LegalBlock, LegalPageContent } from './types';

/**
 * Legal pages (Accessibility, Privacy Policy, Terms) from Sanity.
 *
 * Each page is one document (`singleton-legal-<slug>`): headline, text under it, a list of sections, and the
 * closing banner. A section body is rich text — paragraphs, bullet lists, bold/italic and links.
 *
 * Fallback: document missing / Sanity unreachable → the approved copy in `legalDefaults.ts`.
 * Once the document exists, sections are used exactly as authored (an editor can add, remove or reorder them).
 */

type PortableChild = { _type?: string; text?: string | null; marks?: string[] | null };
type PortableBlockIn = {
  _type?: string;
  listItem?: string | null;
  children?: PortableChild[] | null;
  markDefs?: Array<{ _key?: string; _type?: string; href?: string | null }> | null;
};

type FetchedLegal = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heading?: string | null;
  subtitle?: string | null;
  sections?: Array<{ heading?: string | null; body?: PortableBlockIn[] | null }> | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
};

const SAFE_HREF = /^(\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i;

function spanToHtml(child: PortableChild, defs: PortableBlockIn['markDefs']): string {
  const text = normalizeWebsiteCopy(child.text ?? '');
  if (!text) return '';
  // Escape first, then line breaks, then tokens — so editor text can never inject markup.
  let html = fillTokensHtml(escapeHtml(text).replace(/\r?\n/g, '<br />'));
  for (const mark of child.marks ?? []) {
    if (mark === 'strong') html = `<strong>${html}</strong>`;
    else if (mark === 'em') html = `<em>${html}</em>`;
    else {
      const def = defs?.find((candidate) => candidate._key === mark && candidate._type === 'link');
      const href = def?.href?.trim();
      if (href && SAFE_HREF.test(href)) {
        const external = /^https?:\/\//i.test(href);
        html = `<a class="btn-link" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${html}</a>`;
      }
    }
  }
  return html;
}

function blocksToHtml(body: PortableBlockIn[] | null | undefined): LegalBlock[] {
  const out: LegalBlock[] = [];
  for (const block of body ?? []) {
    if (block._type !== 'block') continue;
    const html = (block.children ?? [])
      .filter((child) => child._type === 'span' || child._type === undefined)
      .map((child) => spanToHtml(child, block.markDefs))
      .join('')
      .trim();
    if (!html) continue;

    if (block.listItem) {
      const previous = out[out.length - 1];
      if (previous?.kind === 'list') previous.items.push(html);
      else out.push({ kind: 'list', items: [html] });
    } else {
      out.push({ kind: 'paragraph', html });
    }
  }
  return out;
}

export async function getLegalPage(slug: string): Promise<LegalPageContent> {
  const d = LEGAL_PAGE_DEFAULTS.find((page) => page.slug === slug);
  if (!d) throw new Error(`No legal page defaults for "${slug}"`);

  const doc = await fetchOrNull<FetchedLegal>(
    `legal:${slug}`,
    /* groq */ `*[_type == "legalPage" && _id == "singleton-legal-${slug}"][0] {
      metaTitle, metaDescription, heading, subtitle,
      "sections": sections[]{ heading, body },
      ctaTitle, ctaSubtitle
    }`
  );

  const fallbackSections = d.sections.map((section, index) => ({
    heading: section.heading,
    body: specToPortableText(section.blocks, `s${index + 1}`) as PortableBlockIn[],
  }));
  const sections = (doc ? (doc.sections ?? []) : fallbackSections)
    .filter((section) => section.heading?.trim() || section.body?.length)
    .map((section) => ({
      heading: fillTokens(clean(section.heading)),
      blocks: blocksToHtml(section.body),
    }));

  return {
    slug,
    meta: {
      title: fillTokens(textOr(doc?.metaTitle, d.meta.title)),
      description: fillTokens(textOr(doc?.metaDescription, d.meta.description)),
    },
    heading: fillTokens(textOr(doc?.heading, d.heading)),
    subtitle: fillTokens(doc ? clean(doc.subtitle) : d.subtitle),
    sections,
    cta: {
      title: fillTokens(textOr(doc?.ctaTitle, d.cta.title)),
      subtitle: fillTokens(textOr(doc?.ctaSubtitle, d.cta.subtitle)),
    },
  };
}
