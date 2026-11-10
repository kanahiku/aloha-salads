import type { ContentImage } from './images';

export interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  age?: number;
  location?: string;
  tenure: string;
  order: number;
}

// ─── Press ────────────────────────────────────────────────────────────────────

export interface PressItem {
  _id: string;
  /** Publication / broadcaster, e.g. "KHON2". */
  outlet: string;
  /** Publication or event date, shown as written. */
  date?: string;
  headline: string;
  quote?: string;
  ctaText: string;
  href: string;
  /** Card photo. Omitted when none is set in Sanity — the card shows the grey placeholder. */
  image?: ContentImage;
}

// ─── About + Catering page copy ───────────────────────────────────────────────

export interface FaqEntry {
  question: string;
  answer: string;
}

/** Every piece of About page text. Authored in Sanity (About singleton). */
export interface AboutContent {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string; content: string; primaryCtaLabel: string; secondaryCtaLabel: string };
  mission: { heading: string; quote: string; body: string };
  /** First paragraph renders as the lead. `**bold**` is supported. Empty note hides it. */
  story: { heading: string; paragraphs: string[]; note: string };
  /** Founder Story band (grey section after Our Story). Quotes are shown with quotation marks added. */
  founder: {
    heading: string;
    tagline: string;
    paragraphs: string[];
    quotes: { quote: string; attribution: string }[];
    closing: string;
  };
  sustainability: { heading: string; paragraphs: string[]; note: string; ctaLabel: string };
  vendors: { heading: string; paragraphs: string[]; ctaLabel: string };
  cta: { title: string; subtitle: string };
}

/** Labels reused on the catering main page and every catering sub-page. */
export interface CateringSharedContent {
  orderLabel: string;
  menuLabel: string;
  locationLabel: string;
  readyTitle: string;
  faqTitle: string;
  subNavEyebrow: string;
  subNavTitle: string;
  subNavSubtitle: string;
}

export interface CateringTray {
  name: string;
  price: string;
  image?: ContentImage;
}

/** Catering main page (Catering singleton). */
export interface CateringMainContent {
  meta: { title: string; description: string };
  hero: { tagline: string; title: string; content: string; image?: ContentImage };
  pricing: { title: string; intro: string; orderingTitle: string; orderingText: string };
  trays: CateringTray[];
  occasions: { eyebrow: string; title: string; intro: string; linkLabel: string };
  cta: { subtitle: string };
  faqs: FaqEntry[];
  shared: CateringSharedContent;
}

/** One catering sub-page (one Sanity document per page). */
export interface CateringSubpageContent {
  slug: string;
  order: number;
  /** Hero headline and the label used in "More catering options". */
  title: string;
  meta: { title: string; description: string };
  heroContent: string;
  heroImage?: ContentImage;
  occasions: Array<{ title: string; description: string }>;
  faqs: FaqEntry[];
  ctaSubtitle: string;
  /** Blurb on the catering page's occasion grid. */
  cardDescription: string;
  showOnCateringPage: boolean;
}

// ─── Careers, Ingredients, simple interior pages ──────────────────────────────

export interface CareersContent {
  meta: { title: string; description: string };
  hero: { title: string; content: string };
  benefits: { heading: string; items: string[] };
  applyTitle: string;
  cta: { title: string; subtitle: string };
}

export interface IngredientsContent {
  meta: { title: string; description: string };
  hero: { tagline: string; title: string; content: string; primaryCtaLabel: string; secondaryCtaLabel: string };
  /** Eyebrow above the first (large) card. */
  sourcingEyebrow: string;
  /** Blank line = new paragraph; `**bold**` supported. */
  facts: Array<{ title: string; description: string }>;
  cta: { title: string; subtitle: string };
  faqTitle: string;
  faqs: FaqEntry[];
}

/** A simple page: heading, lede, then optional sections of text, item lists and links. */
export interface InteriorPageCopy {
  slug: string;
  meta: { title: string; description: string };
  heading: string;
  lede: string;
  sections: Array<{
    heading?: string;
    body?: string;
    items?: Array<{ title: string; description?: string }>;
    links?: Array<{ text: string; href: string }>;
  }>;
}

// ─── Press, Reviews and legal pages ──────────────────────────────────────────

/** Press & Media page text. The cards themselves are separate documents (`pressItem`). */
export interface PressPageContent {
  meta: { title: string; description: string };
  heading: string;
  lede: string;
}

/** Reviews page text. The reviews themselves come live from Google and Yelp. */
export interface ReviewsPageContent {
  meta: { title: string; description: string };
  heroTitle: string;
  heroSubtitle: string;
  listTitle: string;
  cta: { title: string; subtitle: string };
}

/** One rendered block of a legal page. `html` is already escaped and safe for `set:html`. */
export type LegalBlock = { kind: 'paragraph'; html: string } | { kind: 'list'; items: string[] };

export interface LegalPageContent {
  slug: string;
  meta: { title: string; description: string };
  heading: string;
  /** Plain text under the headline. */
  subtitle: string;
  sections: Array<{ heading: string; blocks: LegalBlock[] }>;
  cta: { title: string; subtitle: string };
}

// ─── Locations ────────────────────────────────────────────────────────────────

/** Labels reused on the locations hub and every store page. */
export interface LocationsSharedContent {
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  visitTitle: string;
  moreTitle: string;
  moreSubtitle: string;
  pickupLabel: string;
  deliveryLabel: string;
  directionsLabel: string;
  viewLabel: string;
  /** Closing banner buttons on the hub and every store page. */
  menuCtaLabel: string;
  orderCtaLabel: string;
  faqTitle: string;
}

/** Locations hub page (/locations). */
export interface LocationsHubContent {
  meta: { title: string; description: string };
  hero: { tagline: string; title: string; content: string; image?: ContentImage };
  directoryTitle: string;
  faqs: FaqEntry[];
  cta: { title: string; subtitle: string };
}

/** Page copy for one store page. Store facts (address, hours, links) live in `StoreLocation`. */
export interface LocationPageCopy {
  slug: string;
  meta: { title: string; description: string };
  heroTitle: string;
  heroContent: string;
  /** Optional store-specific main button label; falls back to the shared label. */
  heroPrimaryCtaLabel?: string;
  heroImage?: ContentImage;
  aboutHeading: string;
  /** One entry per paragraph. */
  aboutParagraphs: string[];
  faqs: FaqEntry[];
  cta: { title: string; subtitle: string };
}

// ─── Menu pages ───────────────────────────────────────────────────────────────
