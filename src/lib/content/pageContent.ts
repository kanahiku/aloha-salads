import { sanityClient } from '../sanity/client';
import { resolveContentImage, type SanityImageFields } from '../sanity/image';
import { IMAGE_PROJECTION, normalizeWebsiteCopy, textOr } from './sanity';
import { ABOUT_DEFAULTS } from './aboutDefaults';
import {
  CAREERS_DEFAULTS,
  INGREDIENTS_DEFAULTS,
  INTERIOR_PAGE_DEFAULTS,
  PRESS_PAGE_DEFAULTS,
  REVIEWS_PAGE_DEFAULTS,
} from './pagesDefaults';
import { fillTokens } from './tokens';
import type {
  AboutContent,
  CateringMainContent,
  CateringSubpageContent,
  CareersContent,
  CateringTray,
  ContentImage,
  IngredientsContent,
  InteriorPageCopy,
  FaqEntry,
  PressPageContent,
  ReviewsPageContent,
} from './types';
import { clean, cleanList, cleanFaqs, fetchOrNull } from './pageShared';

export { clean, cleanList, cleanFaqs, fetchOrNull } from './pageShared';
export type { FetchedImage } from './pageShared';
export { getCateringContent } from './cateringContent';

/**
 * About + Catering page copy from Sanity.
 *
 * Fallback rules (so a page is never blank):
 *  - Document missing / Sanity unreachable → the whole page uses the approved defaults.
 *  - Single-line/paragraph text left empty → that field uses its default.
 *  - Lists (paragraphs, FAQs, cards, trays) and optional notes are used exactly as authored once the
 *    document exists, so an editor can remove an item or clear a note to hide it.
 */

// ─── About ────────────────────────────────────────────────────────────────────

type FetchedAbout = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroContent?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroSecondaryCtaLabel?: string | null;
  missionHeading?: string | null;
  missionQuote?: string | null;
  missionBody?: string | null;
  storyHeading?: string | null;
  storyParagraphs?: Array<string | null> | null;
  storyNote?: string | null;
  founderHeading?: string | null;
  founderTagline?: string | null;
  founderParagraphs?: Array<string | null> | null;
  founderQuotes?: Array<{ quote?: string | null; attribution?: string | null } | null> | null;
  founderClosing?: string | null;
  sustainabilityHeading?: string | null;
  sustainabilityParagraphs?: Array<string | null> | null;
  sustainabilityNote?: string | null;
  sustainabilityCtaLabel?: string | null;
  vendorsHeading?: string | null;
  vendorsParagraphs?: Array<string | null> | null;
  vendorsCtaLabel?: string | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
};

const ABOUT_QUERY = /* groq */ `
  *[_type == "aboutContent" && _id == "singleton-about"][0] {
    metaTitle, metaDescription,
    heroTitle, heroSubtitle, heroContent, heroPrimaryCtaLabel, heroSecondaryCtaLabel,
    missionHeading, missionQuote, missionBody,
    storyHeading, storyParagraphs, storyNote,
    founderHeading, founderTagline, founderParagraphs, founderQuotes[]{quote, attribution}, founderClosing,
    sustainabilityHeading, sustainabilityParagraphs, sustainabilityNote, sustainabilityCtaLabel,
    vendorsHeading, vendorsParagraphs, vendorsCtaLabel,
    ctaTitle, ctaSubtitle
  }
`;

export async function getSanityAboutContent(): Promise<AboutContent> {
  const d = ABOUT_DEFAULTS;
  const doc = await fetchOrNull<FetchedAbout>('about', ABOUT_QUERY);
  if (!doc) return d;

  // Founder Story keeps its punctuation exactly as written (apostrophes included), so it is trimmed but not
  // run through normalizeWebsiteCopy like the rest of the page.
  const verbatim = (value: string | null | undefined) => value?.trim() ?? '';
  const founderQuotes = (doc.founderQuotes ?? [])
    .map((q) => ({ quote: verbatim(q?.quote), attribution: verbatim(q?.attribution) }))
    .filter((q) => q.quote);
  const founderParagraphs = (doc.founderParagraphs ?? []).map(verbatim).filter(Boolean);

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      title: textOr(doc.heroTitle, d.hero.title),
      subtitle: textOr(doc.heroSubtitle, d.hero.subtitle),
      content: textOr(doc.heroContent, d.hero.content),
      primaryCtaLabel: textOr(doc.heroPrimaryCtaLabel, d.hero.primaryCtaLabel),
      secondaryCtaLabel: textOr(doc.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
    },
    mission: {
      heading: textOr(doc.missionHeading, d.mission.heading),
      quote: textOr(doc.missionQuote, d.mission.quote),
      body: textOr(doc.missionBody, d.mission.body),
    },
    story: {
      heading: textOr(doc.storyHeading, d.story.heading),
      paragraphs: cleanList(doc.storyParagraphs).length > 0 ? cleanList(doc.storyParagraphs) : d.story.paragraphs,
      note: clean(doc.storyNote),
    },
    founder: {
      heading: verbatim(doc.founderHeading) || d.founder.heading,
      tagline: verbatim(doc.founderTagline) || d.founder.tagline,
      paragraphs: founderParagraphs.length > 0 ? founderParagraphs : d.founder.paragraphs,
      quotes: founderQuotes.length > 0 ? founderQuotes : d.founder.quotes,
      closing: verbatim(doc.founderClosing) || d.founder.closing,
    },
    sustainability: {
      heading: textOr(doc.sustainabilityHeading, d.sustainability.heading),
      paragraphs:
        cleanList(doc.sustainabilityParagraphs).length > 0
          ? cleanList(doc.sustainabilityParagraphs)
          : d.sustainability.paragraphs,
      note: clean(doc.sustainabilityNote),
      ctaLabel: textOr(doc.sustainabilityCtaLabel, d.sustainability.ctaLabel),
    },
    vendors: {
      heading: textOr(doc.vendorsHeading, d.vendors.heading),
      paragraphs: cleanList(doc.vendorsParagraphs).length > 0 ? cleanList(doc.vendorsParagraphs) : d.vendors.paragraphs,
      ctaLabel: textOr(doc.vendorsCtaLabel, d.vendors.ctaLabel),
    },
    cta: { title: textOr(doc.ctaTitle, d.cta.title), subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
  };
}

// ─── Careers ──────────────────────────────────────────────────────────────────

type FetchedCareers = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  benefitsHeading?: string | null;
  benefits?: Array<string | null> | null;
  applyTitle?: string | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
};

const CAREERS_QUERY = /* groq */ `
  *[_type == "careersContent" && _id == "singleton-careers"][0] {
    metaTitle, metaDescription, heroTitle, heroContent,
    benefitsHeading, benefits, applyTitle, ctaTitle, ctaSubtitle
  }
`;

export async function getSanityCareersContent(): Promise<CareersContent> {
  const d = CAREERS_DEFAULTS;
  const doc = await fetchOrNull<FetchedCareers>('careers', CAREERS_QUERY);
  if (!doc) return d;

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: { title: textOr(doc.heroTitle, d.hero.title), content: textOr(doc.heroContent, d.hero.content) },
    benefits: { heading: textOr(doc.benefitsHeading, d.benefits.heading), items: cleanList(doc.benefits) },
    applyTitle: textOr(doc.applyTitle, d.applyTitle),
    cta: { title: textOr(doc.ctaTitle, d.cta.title), subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
  };
}

// ─── Ingredients ──────────────────────────────────────────────────────────────

type FetchedIngredients = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroSecondaryCtaLabel?: string | null;
  sourcingEyebrow?: string | null;
  facts?: Array<{ title?: string | null; description?: string | null }> | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
  faqTitle?: string | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
};

const INGREDIENTS_QUERY = /* groq */ `
  *[_type == "ingredientsContent" && _id == "singleton-ingredients"][0] {
    metaTitle, metaDescription,
    heroTagline, heroTitle, heroContent, heroPrimaryCtaLabel, heroSecondaryCtaLabel,
    sourcingEyebrow,
    "facts": facts[]{ title, description },
    ctaTitle, ctaSubtitle, faqTitle,
    "faqs": faqs[]{ question, answer }
  }
`;

export async function getSanityIngredientsContent(): Promise<IngredientsContent> {
  const d = INGREDIENTS_DEFAULTS;
  const doc = await fetchOrNull<FetchedIngredients>('ingredients', INGREDIENTS_QUERY);
  if (!doc) return d;

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      tagline: textOr(doc.heroTagline, d.hero.tagline),
      title: textOr(doc.heroTitle, d.hero.title),
      content: textOr(doc.heroContent, d.hero.content),
      primaryCtaLabel: textOr(doc.heroPrimaryCtaLabel, d.hero.primaryCtaLabel),
      secondaryCtaLabel: textOr(doc.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
    },
    sourcingEyebrow: textOr(doc.sourcingEyebrow, d.sourcingEyebrow),
    facts: (doc.facts ?? [])
      .filter((fact) => fact.title?.trim())
      .map((fact) => ({ title: clean(fact.title), description: clean(fact.description) })),
    cta: { title: textOr(doc.ctaTitle, d.cta.title), subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
    faqTitle: textOr(doc.faqTitle, d.faqTitle),
    faqs: cleanFaqs(doc.faqs),
  };
}

// ─── Simple interior pages (Gift Cards, Nutrition & Allergens) ────────────────

type FetchedInteriorPage = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heading?: string | null;
  lede?: string | null;
  sections?: Array<{
    heading?: string | null;
    body?: string | null;
    items?: Array<{ title?: string | null; description?: string | null }> | null;
    links?: Array<{ text?: string | null; href?: string | null }> | null;
  }> | null;
};

export async function getSanityInteriorPage(slug: string): Promise<InteriorPageCopy> {
  const d = INTERIOR_PAGE_DEFAULTS.find((page) => page.slug === slug);
  if (!d) throw new Error(`No interior page defaults for "${slug}"`);

  const doc = await fetchOrNull<FetchedInteriorPage>(
    `interior:${slug}`,
    /* groq */ `*[_type == "interiorPage" && _id == "singleton-interior-${slug}"][0] {
      metaTitle, metaDescription, heading, lede,
      "sections": sections[]{
        heading, body,
        "items": items[]{ title, description },
        "links": links[]{ text, href }
      }
    }`
  );
  if (!doc) return d;

  return {
    slug,
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    heading: textOr(doc.heading, d.heading),
    lede: clean(doc.lede),
    sections: (doc.sections ?? []).map((section) => ({
      ...(section.heading?.trim() ? { heading: clean(section.heading) } : {}),
      ...(section.body?.trim() ? { body: clean(section.body) } : {}),
      items: (section.items ?? [])
        .filter((item) => item.title?.trim())
        .map((item) => ({
          title: clean(item.title),
          ...(item.description?.trim() ? { description: clean(item.description) } : {}),
        })),
      links: (section.links ?? [])
        .filter((link) => link.text?.trim() && link.href?.trim())
        .map((link) => ({ text: clean(link.text), href: link.href!.trim() })),
    })),
  };
}

// ─── Press & Reviews page text ────────────────────────────────────────────────

export async function getPressPageContent(): Promise<PressPageContent> {
  const d = PRESS_PAGE_DEFAULTS;
  const doc = await fetchOrNull<{
    metaTitle?: string | null;
    metaDescription?: string | null;
    heading?: string | null;
    lede?: string | null;
  }>(
    'press page',
    `*[_type == "pressPage" && _id == "singleton-press"][0]{ metaTitle, metaDescription, heading, lede }`
  );
  if (!doc) return d;

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    heading: textOr(doc.heading, d.heading),
    lede: clean(doc.lede),
  };
}

export async function getReviewsPageContent(): Promise<ReviewsPageContent> {
  const d = REVIEWS_PAGE_DEFAULTS;
  const doc = await fetchOrNull<{
    metaTitle?: string | null;
    metaDescription?: string | null;
    heroTitle?: string | null;
    heroSubtitle?: string | null;
    listTitle?: string | null;
    ctaTitle?: string | null;
    ctaSubtitle?: string | null;
  }>(
    'reviews page',
    `*[_type == "reviewsPage" && _id == "singleton-reviews"][0]{
      metaTitle, metaDescription, heroTitle, heroSubtitle, listTitle, ctaTitle, ctaSubtitle
    }`
  );

  return {
    meta: {
      title: fillTokens(textOr(doc?.metaTitle, d.meta.title)),
      description: fillTokens(textOr(doc?.metaDescription, d.meta.description)),
    },
    heroTitle: fillTokens(textOr(doc?.heroTitle, d.heroTitle)),
    heroSubtitle: fillTokens(doc ? clean(doc.heroSubtitle) : d.heroSubtitle),
    listTitle: fillTokens(doc ? clean(doc.listTitle) : d.listTitle),
    cta: {
      title: fillTokens(textOr(doc?.ctaTitle, d.cta.title)),
      subtitle: fillTokens(doc ? clean(doc.ctaSubtitle) : d.cta.subtitle),
    },
  };
}
