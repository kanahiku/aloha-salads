import { resolveContentImage } from '../sanity/image';
import { IMAGE_PROJECTION, textOr } from './sanity';
import { CATERING_MAIN_DEFAULTS, CATERING_SUBPAGE_DEFAULTS } from './cateringDefaults';
import { fillTokens } from './tokens';
import { type FetchedImage, clean, cleanFaqs, fetchOrNull } from './pageShared';
import type { CateringMainContent, CateringSubpageContent, CateringTray, ContentImage } from './types';

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
