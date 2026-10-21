// ─── Shared primitives ────────────────────────────────────────────────────────

export interface ContentImage {
  src: string;
  alt: string;
  /** Image title attribute. Renderers fall back to `alt` when this is omitted. */
  title?: string;
}

/** Looping hero video served from the Sanity CDN. Only set when every required piece exists. */
export interface HomepageHeroVideo {
  /** First frame of the loop (Sanity image CDN URL). Paints first and is the LCP element. */
  poster: string;
  /** Desktop / tablet cut. */
  mp4: string;
  /** Optional small phone cut. */
  mp4Mobile?: string;
  width: number;
  height: number;
}

export interface HomepageImages {
  hero?: ContentImage;
  localSourcing?: ContentImage;
  locations?: ContentImage;
  /** Which hero background the editor picked in the Studio. Missing/unknown → 'image'. */
  heroMedia?: 'image' | 'video';
  /** Present only when heroMedia is 'video' AND the video + poster are uploaded. */
  heroVideo?: HomepageHeroVideo;
}

/** Every piece of homepage text. Authored in Sanity (Homepage singleton). */
export interface HomepageContent {
  meta: { title: string; description: string };
  hero: {
    tagline: string;
    /** Newlines are line breaks. */
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  brandBar: Array<{ text: string; tilt?: boolean }>;
  menu: { eyebrow: string; title: string; subtitle: string; ctaLabel: string };
  localSourcing: { eyebrow: string; title: string; body: string; ctaLabel: string };
  reviews: { eyebrow: string; title: string };
  locations: { eyebrow: string; title: string; subtitle: string; ctaLabel: string; viewLabel: string };
}

export interface AboutImages {
  hero?: ContentImage;
  story?: ContentImage;
  sustainability?: ContentImage;
  vendors?: ContentImage;
}

export interface CareersImages {
  hero?: ContentImage;
}

export interface IngredientsImages {
  hero?: ContentImage;
  freshLocalProduce?: ContentImage;
}

export interface MenuPagesImages {
  // Menu Hub
  menuHubHero?: ContentImage;
  menuHubIngredients?: ContentImage;
  // Salads
  saladsHero?: ContentImage;
  saladsIngredients?: ContentImage;
  // Wraps & Subs
  wrapsHero?: ContentImage;
  wrapsIngredients?: ContentImage;
  // Soups
  soupsHero?: ContentImage;
  soupsIngredients?: ContentImage;
  // Drinks
  drinksHero?: ContentImage;
  drinksIngredients?: ContentImage;
  // Vegan
  veganIngredients?: ContentImage;
  // Vegetarian
  vegetarianHero?: ContentImage;
  vegetarianIngredients?: ContentImage;
  // Healthy Options
  healthyOptionsHero?: ContentImage;
  healthyOptionsIngredients?: ContentImage;
  // Kids
  kidsIngredients?: ContentImage;
  kidsHero?: ContentImage;
  // Design Your Own
  designYourOwnHero?: ContentImage;
  designYourOwnBuild?: ContentImage;
  designYourOwnQuality?: ContentImage;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavSubLink {
  text: string;
  href: string;
  description?: string;
  image?: ContentImage;
}

export interface NavColumn {
  title: string;
  links: NavSubLink[];
}

export interface NavLink {
  text: string;
  href?: string;
  description?: string;
  image?: ContentImage;
  links?: NavSubLink[];
  columns?: NavColumn[];
}

export interface NavPhone {
  text: string;
  href: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  ariaLabel: string;
  icon: string;
  href: string;
}

/** The thin banner above the header. */
export interface AnnouncementContent {
  enabled: boolean;
  text: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface NavigationContent {
  announcement?: AnnouncementContent;
  header: {
    links: NavLink[];
    actions: { variant?: string; text?: string; href?: string }[];
    phone?: NavPhone;
  };
  footer: {
    links: FooterColumn[];
    secondaryLinks: FooterLink[];
    socialLinks: SocialLink[];
    footNote: string;
  };
}

// ─── Menu ────────────────────────────────────────────────────────────────────

export interface MenuItem {
  title: string;
  slug?: string;
  description?: string;
  badge?: string;
  note?: string;
  image?: ContentImage;
}

export interface MenuCategory {
  title: string;
  slug?: string;
  href?: string;
  description?: string;
  items: MenuItem[];
}

// ─── Shared CMS sections (blog articles) ───────────────────────────────────────

export interface InfoCardItem {
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  icon: string;
}

// ─── Shared CMS sections ───────────────────────────────────────────────────────

export interface LinkedCardItem {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export interface CtaBannerContent {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  showAfterHoursNote?: boolean;
  extraLines?: string[];
  license?: string;
}

export interface IconPointsSection {
  _type: 'iconPointsSection';
  heading: string;
  intro?: string;
  layout?: 'auto' | 'grid' | 'band';
  items: InfoCardItem[];
}

export interface TimelineSection {
  _type: 'timelineSection';
  heading: string;
  intro?: string;
  steps: TimelineStep[];
}

export interface LinkedCardsSection {
  _type: 'linkedCardsSection';
  heading: string;
  intro?: string;
  display?: 'cards' | 'directory';
  items: LinkedCardItem[];
}

export interface InfoCardsSection {
  _type: 'infoCardsSection';
  heading: string;
  intro?: string;
  items: InfoCardItem[];
}

export interface EditorialSection {
  _type: 'editorialSection';
  heading: string;
  paragraphs: string[];
}

export interface ComparisonRow {
  feature: string;
  cell1: string;
  cell2: string;
  cell3?: string;
}

export interface ComparisonTableSection {
  _type: 'comparisonTableSection';
  heading: string;
  intro?: string;
  featureLabel: string;
  column1: string;
  column2: string;
  column3?: string;
  rows: ComparisonRow[];
}

export interface BulletCardItem {
  title: string;
  items: string[];
}

export interface BulletCardsSection {
  _type: 'bulletCardsSection';
  heading: string;
  intro?: string;
  items: BulletCardItem[];
}

export interface ChecklistSection {
  _type: 'checklistSection';
  heading: string;
  intro?: string;
  items: Array<{ text: string }>;
}

export interface YelpReviewItem {
  name: string;
  reviewId: string;
  userId: string;
}

export interface YelpReviewsSection {
  _type: 'yelpReviewsSection';
  heading: string;
  intro?: string;
  items?: YelpReviewItem[];
}

export interface LiveReviewsSection {
  _type: 'liveReviewsSection';
  heading: string;
  intro?: string;
  sources?: 'both' | 'google' | 'yelp';
}

export interface SplitContentSection {
  _type: 'splitContentSection';
  heading: string;
  paragraphs: string[];
  ctaText?: string;
  ctaHref?: string;
  linkText?: string;
  linkHref?: string;
  image?: ContentImage;
  imagePlaceholder?: string;
  isReversed?: boolean;
}

export interface QuoteCardItem {
  name: string;
  quote: string;
}

export interface QuoteCardsSection {
  _type: 'quoteCardsSection';
  heading: string;
  intro?: string;
  items: QuoteCardItem[];
}

export type ServiceSection = (
  | IconPointsSection
  | TimelineSection
  | LinkedCardsSection
  | InfoCardsSection
  | EditorialSection
  | ComparisonTableSection
  | BulletCardsSection
  | ChecklistSection
  | YelpReviewsSection
  | LiveReviewsSection
  | SplitContentSection
  | QuoteCardsSection
) & { surface?: 'white' | 'grey' | 'dark' };

// ─── Blog ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  publishDate: string;
  author?: string;
  image?: ContentImage;
  imagePlaceholder?: string;
  meta: {
    title: string;
    description: string;
  };
  /** Page paths (no leading slash) where this post should appear in Related blogs. */
  relatedPages: string[];
  heroParagraphs: string[];
  sections: ServiceSection[];
  ctaBanner: CtaBannerContent;
  /** Fallback plain paragraphs when a CMS post has no structured sections. */
  body: string[];
  /** Article body in document order, including inline images from Sanity. */
  contentBlocks?: BlogContentBlock[];
}

export type BlogContentBlock =
  | BlogContentParagraph
  | BlogContentHeading
  | BlogContentImage
  | BlogContentList
  | BlogContentTable
  | BlogContentCallout
  | BlogContentEmbed
  | BlogContentHtmlEmbed
  | BlogContentCarousel
  | BlogContentImageRow
  | BlogContentFaq;

export interface BlogContentParagraph {
  _type: 'paragraph';
  _key: string;
  /** Plain text — used for excerpts, lead paragraphs, and TOC. */
  text: string;
  /** HTML string with inline formatting (bold, italic, links). Use set:html to render. */
  html: string;
  quote?: boolean;
}

export interface BlogContentHeading {
  _type: 'heading';
  _key: string;
  level: 2 | 3 | 4;
  text: string;
  /** Question inside a "Frequently Asked Questions" section. */
  faq?: boolean;
}

export interface BlogContentImage {
  _type: 'image';
  _key: string;
  image: ContentImage;
  caption?: string;
}

export interface BlogContentList {
  _type: 'list';
  _key: string;
  listType: 'bullet' | 'number';
  items: BlogContentListItem[];
}

export interface BlogContentListItem {
  _key: string;
  /** HTML string with inline formatting. Use set:html to render. */
  html: string;
  level: number;
}

export interface BlogContentTable {
  _type: 'table';
  _key: string;
  caption?: string;
  headerRow: string[];
  rows: { _key: string; cells: string[] }[];
}

export interface BlogContentCallout {
  _type: 'callout';
  _key: string;
  calloutType: 'tip' | 'info' | 'warning' | 'note';
  text: string;
}

export interface BlogContentEmbed {
  _type: 'embed';
  _key: string;
  /** Only allow-listed hosts (Google Maps, YouTube, Vimeo) reach the renderer. */
  url: string;
  title: string;
  height: number;
}

/** Author-pasted HTML (Instagram embed, interactive widget). Rendered in a sandboxed iframe, never inline. */
export interface BlogContentHtmlEmbed {
  _type: 'htmlEmbed';
  _key: string;
  title: string;
  code: string;
}

export interface BlogContentCarousel {
  _type: 'imageCarousel';
  _key: string;
  images: { _key: string; image: ContentImage; caption?: string }[];
}

/** Images placed side by side in one Word paragraph, each with an optional title below. */
export interface BlogContentImageRow {
  _type: 'imageRow';
  _key: string;
  images: { _key: string; image: ContentImage; caption?: string }[];
}

export interface BlogContentFaqItem {
  _key?: string;
  question: string;
  /** Answer HTML. Several paragraphs are separate `<p>` elements. */
  answer: string;
}

/** Questions under a "Frequently Asked Questions" heading, rendered as an accordion. */
export interface BlogContentFaq {
  _type: 'faq';
  _key: string;
  items: BlogContentFaqItem[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

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
  hero: { title: string; content: string; primaryCtaLabel: string; secondaryCtaLabel: string };
  mission: { heading: string; quote: string; body: string };
  /** First paragraph renders as the lead. `**bold**` is supported. Empty note hides it. */
  story: { heading: string; paragraphs: string[]; note: string };
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

/** One dish row on a menu page. */
export interface MenuListItem {
  title: string;
  description?: string;
  badge?: string;
  note?: string;
  image?: ContentImage;
}

/** Labels shared by the Menu page and every menu sub-page. */
export interface MenuSharedContent {
  orderLabel: string;
  locationLabel: string;
  cateringLabel: string;
  faqTitle: string;
  readyTitle: string;
  exploreTitle: string;
}

/** Name + one-line description on a menu category card (homepage and menu pages). */
export interface MenuCardCopy {
  slug: string;
  label: string;
  description: string;
}

export interface MenuSourcingContent {
  title: string;
  subtitle: string;
  ctaLabel: string;
  image?: ContentImage;
}

/** Menu landing page (/menu). The dishes come from Menu categories and items. */
export interface MenuHubContent {
  meta: { title: string; description: string };
  hero: { title: string; content: string; image?: ContentImage };
  fullMenu: { title: string; subtitle: string };
  sourcing: MenuSourcingContent;
  cta: { subtitle: string };
  faqs: FaqEntry[];
}

/** One menu sub-page (/menu/<slug>). */
export interface MenuSubpageContent {
  slug: string;
  /** Name used in the Studio sidebar and as the page's internal label. */
  title: string;
  meta: { title: string; description: string };
  hero: { title: string; content: string; image?: ContentImage };
  /** Heading above the dish list. Absent on pages that show a build guide instead. */
  list?: { title: string; intro?: string };
  /** When set, replaces the category's dishes (used by Healthy Food). */
  customItems?: MenuListItem[];
  sourcing: MenuSourcingContent;
  explore: { subtitle: string };
  cta: { subtitle: string };
  faqs: FaqEntry[];
  /** "How to build" guide (Design Your Own Salad). */
  build?: {
    title: string;
    subtitle: string;
    note: string;
    ctaLabel: string;
    steps: Array<{ title: string; description: string }>;
    image?: ContentImage;
  };
}
