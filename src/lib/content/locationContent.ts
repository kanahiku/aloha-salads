import { resolveContentImage } from '../sanity/image';
import { storeLocations, type StoreLocation } from '../../data/locations';
import { IMAGE_PROJECTION, textOr } from './sanity';
import { clean, cleanFaqs, cleanList, fetchOrNull, type FetchedImage } from './pageContent';
import { LOCATIONS_HUB_DEFAULTS, LOCATIONS_SHARED_DEFAULTS, LOCATION_PAGE_DEFAULTS } from './locationsDefaults';
import type { FaqEntry, LocationPageCopy, LocationsHubContent, LocationsSharedContent } from './types';

/**
 * Locations from Sanity: the hub page, shared labels, and one document per store.
 * Each store document holds both the store facts (address, hours, order links, map) and its page copy.
 *
 * Fallbacks: a missing document or an unreachable Sanity uses the static data in `~/data/locations.ts` and
 * `locationsDefaults.ts`. Required text left empty uses its default; lists and optional fields (landmark, map)
 * are used as authored once the document exists.
 */

type FetchedHub = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTagline?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  directoryImage?: FetchedImage | null;
  directoryTitle?: string | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
  sharedHeroPrimaryCtaLabel?: string | null;
  sharedHeroSecondaryCtaLabel?: string | null;
  sharedVisitTitle?: string | null;
  sharedPickupLabel?: string | null;
  sharedDeliveryLabel?: string | null;
  sharedDirectionsLabel?: string | null;
  sharedMoreTitle?: string | null;
  sharedMoreSubtitle?: string | null;
  sharedViewLabel?: string | null;
  sharedFaqTitle?: string | null;
};

type FetchedStore = {
  slug?: string | null;
  order?: number | null;
  name?: string | null;
  shopName?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  landmark?: string | null;
  phoneDisplay?: string | null;
  hours?: Array<string | null> | null;
  intro?: string | null;
  orderPickupHref?: string | null;
  orderDeliveryHref?: string | null;
  mapsEmbedSrc?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  heroTitle?: string | null;
  heroContent?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroImage?: FetchedImage | null;
  aboutHeading?: string | null;
  aboutParagraphs?: Array<string | null> | null;
  faqs?: Array<{ question?: string | null; answer?: string | null }> | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
};

const HUB_QUERY = /* groq */ `
  *[_type == "locationsContent" && _id == "singleton-locations"][0] {
    metaTitle, metaDescription, heroTagline, heroTitle, heroContent,
    ${IMAGE_PROJECTION('directoryImage', 'Aloha Salads locations on Oahu')},
    directoryTitle,
    "faqs": faqs[]{ question, answer },
    ctaTitle, ctaSubtitle,
    sharedHeroPrimaryCtaLabel, sharedHeroSecondaryCtaLabel, sharedVisitTitle, sharedPickupLabel,
    sharedDeliveryLabel, sharedDirectionsLabel, sharedMoreTitle, sharedMoreSubtitle, sharedViewLabel, sharedFaqTitle
  }
`;

const STORES_QUERY = /* groq */ `
  *[_type == "locationPage" && defined(slug)] | order(order asc) {
    slug, order, name, shopName, addressLine1, addressLine2, landmark, phoneDisplay, hours, intro,
    orderPickupHref, orderDeliveryHref, mapsEmbedSrc,
    metaTitle, metaDescription, heroTitle, heroContent, heroPrimaryCtaLabel,
    ${IMAGE_PROJECTION('heroImage', 'Aloha Salads store')},
    aboutHeading, aboutParagraphs,
    "faqs": faqs[]{ question, answer },
    ctaTitle, ctaSubtitle
  }
`;

/** "(808) 262-2016" → "tel:+18082622016". Falls back to the original link if the number is unusable. */
function phoneToHref(display: string, fallback: string): string {
  const digits = display.replace(/\D/g, '');
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  return fallback;
}

const linkOr = (value: string | null | undefined, fallback: string) => value?.trim() || fallback;

function resolveStore(base: StoreLocation, doc: FetchedStore | undefined): StoreLocation {
  if (!doc) return base;

  const phoneDisplay = textOr(doc.phoneDisplay, base.phoneDisplay);
  const hours = cleanList(doc.hours);
  const mapsEmbedSrc = doc.mapsEmbedSrc?.trim();
  const landmark = clean(doc.landmark);

  return {
    ...base,
    name: textOr(doc.name, base.name),
    shopName: textOr(doc.shopName, base.shopName),
    addressLine1: textOr(doc.addressLine1, base.addressLine1),
    addressLine2: textOr(doc.addressLine2, base.addressLine2),
    landmark: landmark || undefined,
    phoneDisplay,
    phoneHref: phoneToHref(phoneDisplay, base.phoneHref),
    hours: hours.length > 0 ? hours.join(' · ') : base.hours,
    intro: textOr(doc.intro, base.intro),
    mapsEmbedSrc: mapsEmbedSrc || undefined,
    orderPickupHref: linkOr(doc.orderPickupHref, base.orderPickupHref),
    orderDeliveryHref: linkOr(doc.orderDeliveryHref, base.orderDeliveryHref),
  };
}

function resolvePage(slug: string, doc: FetchedStore | undefined): LocationPageCopy {
  const d = LOCATION_PAGE_DEFAULTS.find((page) => page.slug === slug);
  if (!d) throw new Error(`No location page defaults for "${slug}"`);
  if (!doc) return d;

  return {
    slug,
    meta: { title: textOr(doc.metaTitle, d.meta.title), description: textOr(doc.metaDescription, d.meta.description) },
    heroTitle: textOr(doc.heroTitle, d.heroTitle),
    heroContent: textOr(doc.heroContent, d.heroContent),
    heroPrimaryCtaLabel: textOr(doc.heroPrimaryCtaLabel, d.heroPrimaryCtaLabel ?? '') || undefined,
    heroImage: resolveContentImage(doc.heroImage),
    aboutHeading: textOr(doc.aboutHeading, d.aboutHeading),
    aboutParagraphs: cleanList(doc.aboutParagraphs),
    faqs: cleanFaqs(doc.faqs) as FaqEntry[],
    cta: { title: textOr(doc.ctaTitle, d.cta.title), subtitle: textOr(doc.ctaSubtitle, d.cta.subtitle) },
  };
}

function resolveHub(doc: FetchedHub | null): { hub: LocationsHubContent; shared: LocationsSharedContent } {
  const h = LOCATIONS_HUB_DEFAULTS;
  const s = LOCATIONS_SHARED_DEFAULTS;
  if (!doc) return { hub: h, shared: s };

  return {
    hub: {
      meta: {
        title: textOr(doc.metaTitle, h.meta.title),
        description: textOr(doc.metaDescription, h.meta.description),
      },
      hero: {
        tagline: textOr(doc.heroTagline, h.hero.tagline),
        title: textOr(doc.heroTitle, h.hero.title),
        content: textOr(doc.heroContent, h.hero.content),
        image: resolveContentImage(doc.directoryImage),
      },
      directoryTitle: textOr(doc.directoryTitle, h.directoryTitle),
      faqs: cleanFaqs(doc.faqs),
      cta: { title: textOr(doc.ctaTitle, h.cta.title), subtitle: textOr(doc.ctaSubtitle, h.cta.subtitle) },
    },
    shared: {
      heroPrimaryCtaLabel: textOr(doc.sharedHeroPrimaryCtaLabel, s.heroPrimaryCtaLabel),
      heroSecondaryCtaLabel: textOr(doc.sharedHeroSecondaryCtaLabel, s.heroSecondaryCtaLabel),
      visitTitle: textOr(doc.sharedVisitTitle, s.visitTitle),
      moreTitle: textOr(doc.sharedMoreTitle, s.moreTitle),
      moreSubtitle: textOr(doc.sharedMoreSubtitle, s.moreSubtitle),
      pickupLabel: textOr(doc.sharedPickupLabel, s.pickupLabel),
      deliveryLabel: textOr(doc.sharedDeliveryLabel, s.deliveryLabel),
      directionsLabel: textOr(doc.sharedDirectionsLabel, s.directionsLabel),
      viewLabel: textOr(doc.sharedViewLabel, s.viewLabel),
      faqTitle: textOr(doc.sharedFaqTitle, s.faqTitle),
    },
  };
}

export interface LocationsContent {
  hub: LocationsHubContent;
  shared: LocationsSharedContent;
  /** Store facts, in list order. */
  stores: StoreLocation[];
  /** Page copy per store, keyed by slug. */
  pages: Record<string, LocationPageCopy>;
}

export async function getLocationsContent(): Promise<LocationsContent> {
  const [hubDoc, storeDocs] = await Promise.all([
    fetchOrNull<FetchedHub>('locations', HUB_QUERY),
    fetchOrNull<FetchedStore[]>('location pages', STORES_QUERY),
  ]);
  const bySlug = new Map((storeDocs ?? []).map((doc) => [doc.slug, doc]));

  const stores = storeLocations
    .map((base, index) => {
      const doc = bySlug.get(base.slug);
      return { store: resolveStore(base, doc), order: doc?.order ?? index + 1 };
    })
    .sort((a, b) => a.order - b.order)
    .map(({ store }) => store);

  const pages = Object.fromEntries(
    storeLocations.map((base) => [base.slug, resolvePage(base.slug, bySlug.get(base.slug))])
  );

  return { ...resolveHub(hubDoc), stores, pages };
}

/** Store facts only — for widgets that list stores (homepage cards, directory, Order Online). */
export async function getStoreLocations(): Promise<StoreLocation[]> {
  return (await getLocationsContent()).stores;
}

/** Everything one store page needs. Throws if the slug has no store (a route without store data is a build error). */
export async function getLocationPageData(slug: string) {
  const { stores, shared, pages } = await getLocationsContent();
  const store = stores.find((candidate) => candidate.slug === slug);
  const page = pages[slug];
  if (!store || !page) throw new Error(`Missing store "${slug}"`);
  return { store, page, shared, stores };
}
