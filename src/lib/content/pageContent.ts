import { sanityClient } from '../sanity/client';
import { resolveContentImage, type SanityImageFields } from '../sanity/image';
import { IMAGE_PROJECTION, normalizeWebsiteCopy, textOr } from './sanity';
import { ABOUT_DEFAULTS } from './aboutDefaults';
import { CATERING_MAIN_DEFAULTS, CATERING_SUBPAGE_DEFAULTS } from './cateringDefaults';
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

/**
 * About + Catering page copy from Sanity.
 *
 * Fallback rules (so a page is never blank):
 *  - Document missing / Sanity unreachable → the whole page uses the approved defaults.
 *  - Single-line/paragraph text left empty → that field uses its default.
 *  - Lists (paragraphs, FAQs, cards, trays) and optional notes are used exactly as authored once the
 *    document exists, so an editor can remove an item or clear a note to hide it.
 */

export type FetchedImage = ContentImage & SanityImageFields;

export const clean = (value: string | null | undefined) => normalizeWebsiteCopy((value ?? '').trim());

/** Authored list → cleaned strings, dropping blanks. */
export const cleanList = (values: Array<string | null> | null | undefined) =>
  (values ?? []).map((value) => clean(value)).filter(Boolean);

export const cleanFaqs = (
  faqs: Array<{ question?: string | null; answer?: string | null }> | null | undefined
): FaqEntry[] =>
  (faqs ?? [])
    .filter((faq) => faq.question?.trim() && faq.answer?.trim())
    .map((faq) => ({ question: clean(faq.question), answer: clean(faq.answer) }));

export async function fetchOrNull<T>(label: string, query: string): Promise<T | null> {
  try {
    return (await sanityClient.fetch<T | null>(query)) ?? null;
  } catch (error) {
    console.warn(`[${label}] Sanity text fetch failed, using defaults:`, (error as Error).message);
    return null;
  }
}

// ─── About ────────────────────────────────────────────────────────────────────

type FetchedAbout = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroSecondaryCtaLabel?: string | null;
  missionHeading?: string | null;
  missionQuote?: string | null;
  missionBody?: string | null;
  storyHeading?: string | null;
  storyParagraphs?: Array<string | null> | null;
  storyNote?: string | null;
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
    heroTitle, heroContent, heroPrimaryCtaLabel, heroSecondaryCtaLabel,
    missionHeading, missionQuote, missionBody,
    storyHeading, storyParagraphs, storyNote,
    sustainabilityHeading, sustainabilityParagraphs, sustainabilityNote, sustainabilityCtaLabel,
    vendorsHeading, vendorsParagraphs, vendorsCtaLabel,
    ctaTitle, ctaSubtitle
  }
`;

export async function getSanityAboutContent(): Promise<AboutContent> {
  const d = ABOUT_DEFAULTS;
  const doc = await fetchOrNull<FetchedAbout>('about', ABOUT_QUERY);
  if (!doc) return d;

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      title: textOr(doc.heroTitle, d.hero.title),
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
      paragraphs:
        cleanList(doc.vendorsParagraphs).length > 0 ? cleanList(doc.vendorsParagraphs) : d.vendors.paragraphs,
      ctaLabel: textOr(doc.vendorsCtaLabel, d.vendors.ctaLabel),
    },
    cta: { title: textOr(doc.ctaTitle, d.cta.title), subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
  };
}

// ─── Catering ─────────────────────────────────────────────────────────────────

type FetchedCateringMain = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  menuImage?: FetchedImage | null;
  pricingTitle?: string | null;
  pricingIntro?: string | null;
  orderingTitle?: string | null;
  orderingText?: string | null;
  trays?: Array<{ name?: string | null; price?: string | null; image?: FetchedImage | null }> | null;
  occasionsEyebrow?: string | null;
  occasionsTitle?: string | null;
  occasionsIntro?: string | null;
  occasionsLinkLabel?: string | null;
  ctaSubtitle?: string | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
  sharedOrderLabel?: string | null;
  sharedMenuLabel?: string | null;
  sharedLocationLabel?: string | null;
  sharedReadyTitle?: string | null;
  sharedFaqTitle?: string | null;
  sharedSubNavEyebrow?: string | null;
  sharedSubNavTitle?: string | null;
  sharedSubNavSubtitle?: string | null;
};

const CATERING_MAIN_QUERY = /* groq */ `
  *[_type == "cateringContent" && _id == "singleton-catering"][0] {
    metaTitle, metaDescription,
    heroTagline, heroTitle, heroContent,
    ${IMAGE_PROJECTION('menuImage', 'Aloha Salads catering trays')},
    pricingTitle, pricingIntro, orderingTitle, orderingText,
    "trays": trays[]{ name, price, ${IMAGE_PROJECTION('image', 'Aloha Salads catering tray')} },
    occasionsEyebrow, occasionsTitle, occasionsIntro, occasionsLinkLabel,
    ctaSubtitle,
    "faqs": faqs[]{ question, answer },
    sharedOrderLabel, sharedMenuLabel, sharedLocationLabel, sharedReadyTitle, sharedFaqTitle,
    sharedSubNavEyebrow, sharedSubNavTitle, sharedSubNavSubtitle
  }
`;

type FetchedCateringSubpage = {
  slug?: string | null;
  order?: number | null;
  title?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroContent?: string | null;
  heroImage?: FetchedImage | null;
  occasions?: Array<{ title?: string | null; description?: string | null }> | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
  ctaSubtitle?: string | null;
  cardDescription?: string | null;
  showOnCateringPage?: boolean | null;
};

const CATERING_SUBPAGES_QUERY = /* groq */ `
  *[_type == "cateringSubpage" && defined(slug)] | order(order asc) {
    slug, order, title, metaTitle, metaDescription, heroContent,
    ${IMAGE_PROJECTION('heroImage', 'Aloha Salads catering')},
    "occasions": occasions[]{ title, description },
    "faqs": faqs[]{ question, answer },
    ctaSubtitle, cardDescription, showOnCateringPage
  }
`;

function resolveMain(doc: FetchedCateringMain | null): CateringMainContent {
  const d = CATERING_MAIN_DEFAULTS;
  if (!doc) return d;

  const HIDDEN_TRAYS = new Set(['Aloha Caesar with Chicken Tray', 'Tray of Pita Bread']);
  const trays: CateringTray[] = (doc.trays ?? [])
    .filter((tray) => tray.name?.trim() && !HIDDEN_TRAYS.has(tray.name.trim()))
    .map((tray) => {
      const image = resolveContentImage(tray.image);
      return { name: clean(tray.name), price: clean(tray.price), ...(image ? { image } : {}) };
    });

  return {
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    hero: {
      tagline: textOr(doc.heroTagline, d.hero.tagline),
      title: textOr(doc.heroTitle, d.hero.title),
      content: textOr(doc.heroContent, d.hero.content),
      image: resolveContentImage(doc.menuImage),
    },
    pricing: {
      title: textOr(doc.pricingTitle, d.pricing.title),
      intro: textOr(doc.pricingIntro, d.pricing.intro),
      orderingTitle: textOr(doc.orderingTitle, d.pricing.orderingTitle),
      orderingText: textOr(doc.orderingText, d.pricing.orderingText),
    },
    trays,
    occasions: {
      eyebrow: textOr(doc.occasionsEyebrow, d.occasions.eyebrow),
      title: textOr(doc.occasionsTitle, d.occasions.title),
      intro: textOr(doc.occasionsIntro, d.occasions.intro),
      linkLabel: textOr(doc.occasionsLinkLabel, d.occasions.linkLabel),
    },
    cta: { subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
    faqs: cleanFaqs(doc.faqs),
    shared: {
      orderLabel: textOr(doc.sharedOrderLabel, d.shared.orderLabel),
      menuLabel: textOr(doc.sharedMenuLabel, d.shared.menuLabel),
      locationLabel: textOr(doc.sharedLocationLabel, d.shared.locationLabel),
      readyTitle: textOr(doc.sharedReadyTitle, d.shared.readyTitle),
      faqTitle: textOr(doc.sharedFaqTitle, d.shared.faqTitle),
      subNavEyebrow: textOr(doc.sharedSubNavEyebrow, d.shared.subNavEyebrow),
      subNavTitle: textOr(doc.sharedSubNavTitle, d.shared.subNavTitle),
      subNavSubtitle: textOr(doc.sharedSubNavSubtitle, d.shared.subNavSubtitle),
    },
  };
}

function resolveSubpages(docs: FetchedCateringSubpage[] | null): CateringSubpageContent[] {
  const bySlug = new Map((docs ?? []).map((doc) => [doc.slug, doc]));

  return CATERING_SUBPAGE_DEFAULTS.map((d) => {
    const doc = bySlug.get(d.slug);
    if (!doc) return d;

    return {
      slug: d.slug,
      order: doc.order ?? d.order,
      title: textOr(doc.title, d.title),
      meta: {
        title: textOr(doc.metaTitle, d.meta.title),
        description: textOr(doc.metaDescription, d.meta.description),
      },
      heroContent: textOr(doc.heroContent, d.heroContent),
      heroImage: resolveContentImage(doc.heroImage),
      occasions: (doc.occasions ?? [])
        .filter((card) => card.title?.trim())
        .map((card) => ({ title: clean(card.title), description: clean(card.description) })),
      faqs: cleanFaqs(doc.faqs),
      ctaSubtitle: textOr(doc.ctaSubtitle, d.ctaSubtitle),
      cardDescription: clean(doc.cardDescription),
      showOnCateringPage: doc.showOnCateringPage ?? false,
    };
  }).sort((a, b) => a.order - b.order);
}

export async function getCateringContent(): Promise<{
  main: CateringMainContent;
  subpages: CateringSubpageContent[];
}> {
  const [mainDoc, subpageDocs] = await Promise.all([
    fetchOrNull<FetchedCateringMain>('catering', CATERING_MAIN_QUERY),
    fetchOrNull<FetchedCateringSubpage[]>('catering sub-pages', CATERING_SUBPAGES_QUERY),
  ]);

  return { main: resolveMain(mainDoc), subpages: resolveSubpages(subpageDocs) };
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
  }>('press page', `*[_type == "pressPage" && _id == "singleton-press"][0]{ metaTitle, metaDescription, heading, lede }`);
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
