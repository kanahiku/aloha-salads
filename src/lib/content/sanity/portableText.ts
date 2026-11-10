import { resolveContentImage, type SanityImageFields } from '../../sanity/image';
import type { BlogContentBlock, BlogPost, ContentImage } from '../types';

type SanityMarkDef = {
  _type: string;
  _key: string;
  href?: string;
  blank?: boolean;
};

type SanitySpan = {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type SanityPortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: SanitySpan[];
  markDefs?: SanityMarkDef[];
  // image fields
  src?: string;
  alt?: string;
  caption?: string;
  // table fields
  headerRow?: string[];
  rows?: Array<{ _key?: string; cells?: string[] }>;
  // callout fields (projected as calloutType from the "type" Sanity field)
  calloutType?: string;
  text?: string;
  // embed fields
  url?: string;
  title?: string;
  height?: number;
  // htmlEmbed fields
  code?: string;
  // imageCarousel fields
  images?: Array<{ _key?: string; src?: string; alt?: string; caption?: string } & SanityImageFields>;
} & SanityImageFields;

export type SanityBlogPost = Omit<BlogPost, 'image' | 'relatedPages' | 'body' | 'contentBlocks'> & {
  image?: ContentImage;
  relatedPages?: string[] | null;
  body?: SanityPortableBlock[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
};

export function authoredText(value: string | null | undefined): string {
  return typeof value === 'string' ? value.trim() : '';
}

function portableBlockText(block: SanityPortableBlock): string {
  return Array.isArray(block.children) ? block.children.map((child) => child.text ?? '').join('') : '';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const EMBED_HOSTS = [
  'www.google.com',
  'maps.google.com',
  'www.youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
  'www.instagram.com',
];

function safeEmbedUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || !EMBED_HOSTS.includes(url.hostname)) return null;
    if (url.hostname.endsWith('google.com') && !url.pathname.startsWith('/maps/embed')) return null;
    if (url.hostname === 'www.instagram.com' && !/^\/(p|reel)\/[\w-]+\/embed/.test(url.pathname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function spansToHtml(children: SanitySpan[] | undefined, markDefs: SanityMarkDef[] | undefined): string {
  if (!Array.isArray(children)) return '';
  const defsMap = new Map((markDefs ?? []).map((d) => [d._key, d]));

  return children
    .map((span) => {
      if (span._type !== 'span') return '';
      let html = escapeHtml(span.text ?? '');
      for (const mark of span.marks ?? []) {
        const def = defsMap.get(mark);
        if (def?._type === 'link') {
          const targetAttr = def.blank !== false ? ' target="_blank" rel="noopener noreferrer"' : '';
          html = `<a href="${escapeHtml(def.href ?? '')}"${targetAttr}>${html}</a>`;
        } else if (mark === 'strong') {
          html = `<strong>${html}</strong>`;
        } else if (mark === 'em') {
          html = `<em>${html}</em>`;
        } else if (mark === 'underline') {
          html = `<u>${html}</u>`;
        } else if (mark === 'strike-through') {
          html = `<s>${html}</s>`;
        } else if (mark === 'code') {
          html = `<code>${html}</code>`;
        }
      }
      return html;
    })
    .join('');
}

export function portableTextToContentBlocks(body: SanityPortableBlock[] | null | undefined): BlogContentBlock[] {
  if (!Array.isArray(body)) return [];

  const result: BlogContentBlock[] = [];

  // Buffer for consecutive list items of the same type
  let listBuffer: { _key: string; html: string; level: number }[] = [];
  let listType: 'bullet' | 'number' | null = null;
  let listStartKey = '';
  let faqMode: 'off' | 'faq' | 'questions' = 'off';
  let faqSectionStartKey = '';
  let faqSectionItems: { _key?: string; question: string; answer: string }[] = [];

  function flushList() {
    if (!listBuffer.length || !listType) return;
    result.push({ _type: 'list', _key: `list-${listStartKey}`, listType, items: listBuffer });
    listBuffer = [];
    listType = null;
    listStartKey = '';
  }

  function flushFaqSection() {
    if (faqSectionItems.length) {
      result.push({ _type: 'faq', _key: `faq-${faqSectionStartKey}`, items: faqSectionItems });
    }
    faqSectionItems = [];
    faqMode = 'off';
    faqSectionStartKey = '';
  }

  /** A short question line, including "1. Will guests…?", not a prompt like "Craving something savory?". */
  function isAccordionQuestion(value: string): boolean {
    const stripped = value.replace(/^\d+\.\s*/, '');
    return (
      value.endsWith('?') &&
      value.length < 180 &&
      /^(is|does|do|can|could|will|would|what|how|where|when|why|are|who|which)\b/i.test(stripped)
    );
  }

  function upcomingQuestionCount(start: number): number {
    let count = 0;
    for (let i = start; i < body.length; i++) {
      const next = body[i];
      if (next?._type === 'block' && (next.style === 'h1' || next.style === 'h2')) break;
      if (next?._type !== 'block' || next.style === 'h3' || next.style === 'h4' || next.listItem) continue;
      if (isAccordionQuestion(portableBlockText(next).trim())) count++;
    }
    return count;
  }

  function appendFaqAnswer(html: string) {
    const last = faqSectionItems[faqSectionItems.length - 1];
    const chunk = `<p class="text-[16px] md:text-[17px] font-normal leading-[160%]">${html}</p>`;
    last.answer = last.answer ? `${last.answer}${chunk}` : chunk;
  }

  body.forEach((block, index) => {
    const key = block._key || `block-${index}`;

    // ── Image ─────────────────────────────────────────────────────────────────
    if (block._type === 'image') {
      flushList();
      flushFaqSection();
      const image = resolveContentImage({
        src: block.src,
        alt: block.alt,
        crop: block.crop,
        hotspot: block.hotspot,
        asset: block.asset,
      });
      if (!image?.src) return;
      const caption = typeof block.caption === 'string' ? block.caption.trim() : '';
      result.push({ _type: 'image', _key: key, image, ...(caption ? { caption } : {}) });
      return;
    }

    // ── Image carousel / side-by-side image row ───────────────────────────────
    if (block._type === 'imageCarousel' || block._type === 'imageRow') {
      flushList();
      flushFaqSection();
      const images = (block.images ?? []).flatMap((item, ii) => {
        const image = resolveContentImage({
          src: item.src,
          alt: item.alt,
          crop: item.crop,
          hotspot: item.hotspot,
          asset: item.asset,
        });
        if (!image?.src) return [];
        const caption = typeof item.caption === 'string' ? item.caption.trim() : '';
        return [{ _key: item._key || `${key}-img-${ii}`, image, ...(caption ? { caption } : {}) }];
      });
      if (!images.length) return;
      if (block._type === 'imageRow') result.push({ _type: 'imageRow', _key: key, images });
      else result.push({ _type: 'imageCarousel', _key: key, images });
      return;
    }

    // ── Embed (map / video iframe) ────────────────────────────────────────────
    if (block._type === 'embed') {
      flushList();
      flushFaqSection();
      const url = safeEmbedUrl(block.url);
      if (!url) return;
      const height =
        typeof block.height === 'number' && block.height >= 200 && block.height <= 1200 ? block.height : 450;
      result.push({ _type: 'embed', _key: key, url, title: block.title?.trim() || 'Embedded map', height });
      return;
    }

    // ── HTML embed (pasted widget / social embed code) ───────────────────────
    if (block._type === 'htmlEmbed') {
      flushList();
      flushFaqSection();
      const code = typeof block.code === 'string' ? block.code.trim() : '';
      if (!code) return;
      result.push({ _type: 'htmlEmbed', _key: key, title: block.title?.trim() || 'Embedded content', code });
      return;
    }

    // ── Table ─────────────────────────────────────────────────────────────────
    if (block._type === 'table') {
      flushList();
      flushFaqSection();
      // Empty header cells are real columns (e.g. a blank corner cell); keep them so columns stay aligned.
      const headerRow = (block.headerRow ?? []).map((cell) => cell ?? '');
      if (headerRow.length < 2 || !headerRow.some((cell) => cell.trim())) return;
      result.push({
        _type: 'table',
        _key: key,
        ...(block.caption ? { caption: block.caption } : {}),
        headerRow,
        rows: (block.rows ?? []).map((row, ri) => ({
          _key: row._key || `row-${ri}`,
          cells: row.cells ?? [],
        })),
      });
      return;
    }

    // ── Callout ───────────────────────────────────────────────────────────────
    if (block._type === 'callout') {
      flushList();
      flushFaqSection();
      if (!block.text?.trim()) return;
      const calloutType = (['tip', 'info', 'warning', 'note'] as const).includes(
        block.calloutType as 'tip' | 'info' | 'warning' | 'note'
      )
        ? (block.calloutType as 'tip' | 'info' | 'warning' | 'note')
        : 'note';
      result.push({ _type: 'callout', _key: key, calloutType, text: block.text.trim() });
      return;
    }

    // ── Standard block ────────────────────────────────────────────────────────
    if (block._type !== 'block') return;

    const text = portableBlockText(block).trim();
    if (!text) return;

    const html = spansToHtml(block.children, block.markDefs) || escapeHtml(text);

    // Headings
    if (block.style === 'h1' || block.style === 'h2') {
      flushList();
      flushFaqSection();
      const startsFaq = /frequently asked questions|\bfaqs?\b/i.test(text);
      result.push({ _type: 'heading', _key: key, level: 2, text });
      if (startsFaq) {
        faqMode = 'faq';
        faqSectionStartKey = key;
      } else if (upcomingQuestionCount(index + 1) >= 2) {
        faqMode = 'questions';
        faqSectionStartKey = key;
      }
      return;
    }
    if (block.style === 'h3' || block.style === 'h4') {
      flushList();
      if (faqMode === 'faq') {
        faqSectionItems.push({ _key: key, question: text, answer: '' });
        return;
      }
      result.push({ _type: 'heading', _key: key, level: block.style === 'h4' ? 4 : 3, text });
      return;
    }

    // FAQ heading: a bold line or a line ending in "?" is a question.
    // Any other heading with two or more real questions: those questions become the accordion.
    if (faqMode !== 'off') {
      flushList();
      const spans = block.children ?? [];
      const allBold =
        spans.some((span) => (span.marks ?? []).includes('strong')) &&
        spans.every((span) => !(span.text ?? '').trim() || (span.marks ?? []).includes('strong'));
      const isQuestion =
        faqMode === 'faq' ? (allBold || text.endsWith('?')) && text.length < 200 : isAccordionQuestion(text);
      if (isQuestion) {
        faqSectionItems.push({ _key: key, question: text, answer: '' });
        return;
      }
      if (faqSectionItems.length) {
        appendFaqAnswer(html);
        return;
      }
    }

    // List items
    if (block.listItem === 'bullet' || block.listItem === 'number') {
      if (listType !== block.listItem) {
        flushList();
        listType = block.listItem;
        listStartKey = key;
      }
      listBuffer.push({ _key: key, html, level: block.level ?? 1 });
      return;
    }

    // Paragraph / blockquote
    flushList();
    result.push({
      _type: 'paragraph',
      _key: key,
      text,
      html,
      ...(block.style === 'blockquote' ? { quote: true } : {}),
    });
  });

  flushList();
  flushFaqSection();
  return result;
}

export function portableTextToParagraphs(body: SanityPortableBlock[] | null | undefined): string[] {
  return portableTextToContentBlocks(body)
    .filter((block): block is Extract<BlogContentBlock, { _type: 'paragraph' }> => block._type === 'paragraph')
    .map((block) => block.text); // plain text only — used for excerpts and lead paragraphs
}
