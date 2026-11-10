import { sanityClient } from '../../sanity/client';
import { resolveContentImage, urlFor } from '../../sanity/image';
import type { HomepageImages, HomepageContent, HomepageHeroVideo } from '../types';
import { HOMEPAGE_DEFAULTS } from '../homepageDefaults';
import { type FetchedImage, IMAGE_PROJECTION, normalizeWebsiteCopy, textOr } from './shared';

type FetchedHomepageImages = {
  heroImage?: FetchedImage | null;
  localSourcingImage?: FetchedImage | null;
  locationsImage?: FetchedImage | null;
  heroMedia?: string | null;
  heroVideoUrl?: string | null;
  heroVideoMobileUrl?: string | null;
  heroVideoPosterRef?: string | null;
  heroVideoPosterSize?: { width?: number; height?: number } | null;
};

const HOMEPAGE_IMAGES_QUERY = /* groq */ `
  *[_type == "homepageContent" && _id == "singleton-homepage"][0] {
    ${IMAGE_PROJECTION('heroImage', 'Fresh salad from Aloha Salads')},
    ${IMAGE_PROJECTION('localSourcingImage', 'Local ingredients used by Aloha Salads')},
    ${IMAGE_PROJECTION('locationsImage', 'Aloha Salads store location')},
    heroMedia,
    "heroVideoUrl": heroVideo.asset->url,
    "heroVideoMobileUrl": heroVideoMobile.asset->url,
    "heroVideoPosterRef": heroVideoPoster.asset._ref,
    "heroVideoPosterSize": heroVideoPoster.asset->metadata.dimensions{ width, height }
  }
`;

/**
 * Video is used only when the editor picked it AND the desktop file + poster exist; any missing
 * piece falls back to the hero image so the homepage never renders an empty hero.
 */
function resolveHomepageHeroVideo(doc: FetchedHomepageImages | null): HomepageHeroVideo | undefined {
  if (doc?.heroMedia !== 'video' || !doc.heroVideoUrl || !doc.heroVideoPosterRef) return undefined;

  const poster = urlFor({ _type: 'image', asset: { _type: 'reference', _ref: doc.heroVideoPosterRef } })
    .width(1440)
    .format('webp')
    .quality(85)
    .url();

  return {
    poster,
    mp4: doc.heroVideoUrl,
    mp4Mobile: doc.heroVideoMobileUrl || undefined,
    width: doc.heroVideoPosterSize?.width ?? 1440,
    height: doc.heroVideoPosterSize?.height ?? 760,
  };
}

export async function getSanityHomepageImages(): Promise<HomepageImages> {
  const doc = await sanityClient.fetch<FetchedHomepageImages | null>(HOMEPAGE_IMAGES_QUERY);

  return {
    hero: resolveContentImage(doc?.heroImage),
    localSourcing: resolveContentImage(doc?.localSourcingImage),
    locations: resolveContentImage(doc?.locationsImage),
    heroMedia: doc?.heroMedia === 'video' ? 'video' : 'image',
    heroVideo: resolveHomepageHeroVideo(doc ?? null),
  };
}

// ─── Homepage text ────────────────────────────────────────────────────────────

type FetchedHomepageText = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroSecondaryCtaLabel?: string | null;
  brandBarItems?: Array<{ text?: string | null; tilt?: boolean | null }> | null;
  menuEyebrow?: string | null;
  menuTitle?: string | null;
  menuSubtitle?: string | null;
  menuCtaLabel?: string | null;
  localSourcingEyebrow?: string | null;
  localSourcingTitle?: string | null;
  localSourcingBody?: string | null;
  localSourcingCtaLabel?: string | null;
  reviewsEyebrow?: string | null;
  reviewsTitle?: string | null;
  locationsEyebrow?: string | null;
  locationsTitle?: string | null;
  locationsSubtitle?: string | null;
  locationsCtaLabel?: string | null;
  locationsViewLabel?: string | null;
};

const HOMEPAGE_TEXT_QUERY = /* groq */ `
  *[_type == "homepageContent" && _id == "singleton-homepage"][0] {
    metaTitle, metaDescription,
    heroTagline, heroTitle, heroSubtitle, heroPrimaryCtaLabel, heroSecondaryCtaLabel,
    brandBarItems[]{ text, tilt },
    menuEyebrow, menuTitle, menuSubtitle, menuCtaLabel,
    localSourcingEyebrow, localSourcingTitle, localSourcingBody, localSourcingCtaLabel,
    reviewsEyebrow, reviewsTitle,
    locationsEyebrow, locationsTitle, locationsSubtitle, locationsCtaLabel, locationsViewLabel
  }
`;

/**
 * All homepage copy from Sanity (Homepage singleton). Any field the editor leaves empty — or the whole
 * document if Sanity is unreachable — falls back to HOMEPAGE_DEFAULTS so the page never renders blank.
 */
export async function getSanityHomepageContent(): Promise<HomepageContent> {
  const d = HOMEPAGE_DEFAULTS;
  let doc: FetchedHomepageText | null = null;
  try {
    doc = await sanityClient.fetch<FetchedHomepageText | null>(HOMEPAGE_TEXT_QUERY);
  } catch (error) {
    console.warn('[homepage] Sanity text fetch failed, using defaults:', (error as Error).message);
  }

  const brandBar = (doc?.brandBarItems ?? [])
    .filter((item) => item.text?.trim())
    .map((item) => ({ text: normalizeWebsiteCopy(item.text!.trim()), ...(item.tilt ? { tilt: true } : {}) }));

  return {
    meta: {
      title: textOr(doc?.metaTitle, d.meta.title),
      description: textOr(doc?.metaDescription, d.meta.description),
    },
    hero: {
      tagline: textOr(doc?.heroTagline, d.hero.tagline),
      title: textOr(doc?.heroTitle, d.hero.title),
      subtitle: textOr(doc?.heroSubtitle, d.hero.subtitle),
      primaryCtaLabel: textOr(doc?.heroPrimaryCtaLabel, d.hero.primaryCtaLabel),
      secondaryCtaLabel: textOr(doc?.heroSecondaryCtaLabel, d.hero.secondaryCtaLabel),
    },
    brandBar: brandBar.length > 0 ? brandBar : d.brandBar,
    menu: {
      eyebrow: textOr(doc?.menuEyebrow, d.menu.eyebrow),
      title: textOr(doc?.menuTitle, d.menu.title),
      subtitle: textOr(doc?.menuSubtitle, d.menu.subtitle),
      ctaLabel: textOr(doc?.menuCtaLabel, d.menu.ctaLabel),
    },
    localSourcing: {
      eyebrow: textOr(doc?.localSourcingEyebrow, d.localSourcing.eyebrow),
      title: textOr(doc?.localSourcingTitle, d.localSourcing.title),
      body: textOr(doc?.localSourcingBody, d.localSourcing.body),
      ctaLabel: textOr(doc?.localSourcingCtaLabel, d.localSourcing.ctaLabel),
    },
    reviews: {
      eyebrow: textOr(doc?.reviewsEyebrow, d.reviews.eyebrow),
      title: textOr(doc?.reviewsTitle, d.reviews.title),
    },
    locations: {
      eyebrow: textOr(doc?.locationsEyebrow, d.locations.eyebrow),
      title: textOr(doc?.locationsTitle, d.locations.title),
      subtitle: textOr(doc?.locationsSubtitle, d.locations.subtitle),
      ctaLabel: textOr(doc?.locationsCtaLabel, d.locations.ctaLabel),
      viewLabel: textOr(doc?.locationsViewLabel, d.locations.viewLabel),
    },
  };
}

// ─── About ────────────────────────────────────────────────────────────────────
