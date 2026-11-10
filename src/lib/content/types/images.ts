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
