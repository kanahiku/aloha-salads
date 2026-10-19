import { createClient } from '@sanity/client';

import { ABOUT_DEFAULTS as about } from '../src/lib/content/aboutDefaults';
import {
  CATERING_MAIN_DEFAULTS as catering,
  CATERING_SUBPAGE_DEFAULTS as subpages,
} from '../src/lib/content/cateringDefaults';
import { storeLocations } from '../src/data/locations';
import { navigationData } from '../src/data/navigation';
import {
  MENU_CARD_DEFAULTS as menuCards,
  MENU_HUB_DEFAULTS as menuHub,
  MENU_SHARED_DEFAULTS as menuShared,
  MENU_SUBPAGE_DEFAULTS as menuPages,
} from '../src/lib/content/menuDefaults';
import {
  LOCATIONS_HUB_DEFAULTS as locationsHub,
  LOCATIONS_SHARED_DEFAULTS as locationsShared,
  LOCATION_PAGE_DEFAULTS as locationPages,
} from '../src/lib/content/locationsDefaults';
import {
  CAREERS_DEFAULTS as careers,
  INGREDIENTS_DEFAULTS as ingredients,
  INTERIOR_PAGE_DEFAULTS as interiorPages,
  PRESS_PAGE_DEFAULTS as pressPage,
  REVIEWS_PAGE_DEFAULTS as reviewsPage,
} from '../src/lib/content/pagesDefaults';
import { LEGAL_PAGE_DEFAULTS as legalPages, type LegalPageSpec } from '../src/lib/content/legalDefaults';
import { specToPortableText } from '../src/lib/content/legalPortableText';

/**
 * Seeds page copy into Sanity: About, Catering (main + the seven sub-pages), Careers, Ingredients,
 * the simple pages (Gift Cards, Nutrition & Allergens), Locations (hub + the six stores), and the Menu pages
 * (landing page + the ten category pages), the site chrome (announcement bar, header navigation, footer),
 * the Press and Reviews page text, and the legal pages (Privacy Policy, Terms, Accessibility).
 *
 *   npm run seed:pages                    # dry run — prints what would change
 *   npm run seed:pages -- --commit        # write
 *   npm run seed:pages -- --commit --fill-missing
 *
 * Safe by default: a document that already has copy is skipped, so editors' changes are never
 * overwritten. `--fill-missing` fills only empty fields on documents that already have copy.
 *
 * Catering migration (one-off, idempotent): the old single Catering document held every sub-page's hero
 * image and the tray photos. They are copied (same uploaded assets, no re-upload) onto the new per-page
 * documents / the new `trays` list, and the old fields are then removed from the Catering document.
 *
 * Locations migration (one-off, idempotent): the old Locations document held each store's hero image. They
 * are copied onto the new per-store documents and the old fields are then removed (the hub keeps its own image).
 *
 * Menu migration (one-off, idempotent): the old "Menu Pages" document (`singleton-menu-pages`) held only images.
 * They are copied onto the new Menu page / category-page documents, then the old document is deleted.
 */
const commit = process.argv.includes('--commit');
const fillMissing = process.argv.includes('--fill-missing');
const projectId = process.env.SANITY_PROJECT_ID ?? 'sys9vj6r';
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-09-15',
  useCdn: false,
  ...(token ? { token } : {}),
});

type Doc = Record<string, unknown>;
type ImageValue = { asset?: { _ref?: string }; alt?: string; hotspot?: unknown; crop?: unknown };

const isEmpty = (value: unknown) =>
  value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);

const keyed = <T extends object>(type: string, prefix: string, items: T[]) =>
  items.map((item, i) => ({ _type: type, _key: `${prefix}-${i + 1}`, ...item }));

const copyImage = (image?: ImageValue | null) =>
  image?.asset?._ref
    ? {
        _type: 'image',
        asset: { _type: 'reference', _ref: image.asset._ref },
        ...(image.alt ? { alt: image.alt } : {}),
        ...(image.hotspot ? { hotspot: image.hotspot } : {}),
        ...(image.crop ? { crop: image.crop } : {}),
      }
    : undefined;

/** Which old Catering-document image field each sub-page's hero used (parties/schools reused another page's photo). */
const OLD_HERO_FIELD: Record<string, string> = {
  corporate: 'corporateImage',
  'office-lunches': 'officeLunchImage',
  meetings: 'meetingsImage',
  events: 'eventsImage',
  'large-groups': 'largeGroupsImage',
  parties: 'largeGroupsImage',
  schools: 'eventsImage',
};
const OLD_FIELDS = ['trayImages', ...new Set(Object.values(OLD_HERO_FIELD))];

/** Old Locations-document image field for each store's hero. */
const OLD_STORE_IMAGE_FIELD: Record<string, string> = Object.fromEntries(
  storeLocations.map((store) => [store.slug, `${store.slug}Image`])
);
const OLD_LOCATION_FIELDS = Object.values(OLD_STORE_IMAGE_FIELD);

/** Old "Menu Pages" image fields → new fields, per page (`hub` = the Menu landing page). */
const OLD_MENU_IMAGES: Record<string, Record<string, string>> = {
  hub: { heroImage: 'menuHubHeroImage', sourcingImage: 'menuHubIngredientsImage' },
  salads: { heroImage: 'saladsHeroImage', sourcingImage: 'saladsIngredientsImage' },
  'design-your-own-salad': {
    heroImage: 'designYourOwnHeroImage',
    sourcingImage: 'designYourOwnQualityImage',
    buildImage: 'designYourOwnBuildImage',
  },
  'wraps-subs': { heroImage: 'wrapsHeroImage', sourcingImage: 'wrapsIngredientsImage' },
  soups: { heroImage: 'soupsHeroImage', sourcingImage: 'soupsIngredientsImage' },
  drinks: { heroImage: 'drinksHeroImage', sourcingImage: 'drinksIngredientsImage' },
  kids: { heroImage: 'kidsHeroImage', sourcingImage: 'kidsIngredientsImage' },
  vegan: { sourcingImage: 'veganIngredientsImage' },
  vegetarian: { heroImage: 'vegetarianHeroImage', sourcingImage: 'vegetarianIngredientsImage' },
  'healthy-options': { heroImage: 'healthyOptionsHeroImage', sourcingImage: 'healthyOptionsIngredientsImage' },
  misc: {},
};

/** Alt text for migrated photos that never had any. */
const MENU_IMAGE_ALT: Record<string, string> = {
  heroImage: 'Aloha Salads menu',
  sourcingImage: 'Fresh local ingredients at Aloha Salads',
  buildImage: 'How to build your own salad at Aloha Salads',
};

function migratedMenuImages(pageKey: string, old: Doc | null): Doc {
  const images: Doc = {};
  for (const [field, oldField] of Object.entries(OLD_MENU_IMAGES[pageKey] ?? {})) {
    const source = old?.[oldField] as ImageValue | undefined;
    const image = copyImage(source);
    if (image) images[field] = { ...image, alt: source?.alt || MENU_IMAGE_ALT[field] };
  }
  return images;
}

/** Card text as it renders today: the category's own description wins over the built-in one. */
const menuCardFields = (categoryDescriptions: Map<string, string>) =>
  keyed(
    'menuCardCopy',
    'card',
    menuCards.map((card) => ({
      slug: card.slug,
      label: card.label,
      description: categoryDescriptions.get(card.slug)?.trim() || card.description,
    }))
  );

const menuHubFields = (old: Doc | null, categoryDescriptions: Map<string, string>): Doc => ({
  metaTitle: menuHub.meta.title,
  metaDescription: menuHub.meta.description,
  heroTitle: menuHub.hero.title,
  heroContent: menuHub.hero.content,
  fullMenuTitle: menuHub.fullMenu.title,
  fullMenuSubtitle: menuHub.fullMenu.subtitle,
  sourcingTitle: menuHub.sourcing.title,
  sourcingSubtitle: menuHub.sourcing.subtitle,
  sourcingCtaLabel: menuHub.sourcing.ctaLabel,
  ctaSubtitle: menuHub.cta.subtitle,
  faqs: keyed('faqItem', 'faq', menuHub.faqs),
  categoryCards: menuCardFields(categoryDescriptions),
  sharedOrderLabel: menuShared.orderLabel,
  sharedLocationLabel: menuShared.locationLabel,
  sharedCateringLabel: menuShared.cateringLabel,
  sharedReadyTitle: menuShared.readyTitle,
  sharedExploreTitle: menuShared.exploreTitle,
  sharedFaqTitle: menuShared.faqTitle,
  ...migratedMenuImages('hub', old),
});

function menuPageFields(page: (typeof menuPages)[number], old: Doc | null, dishImage?: ImageValue): Doc {
  const customItems = page.customItems
    ? keyed(
        'menuListItem',
        'card',
        page.customItems.map((item) => {
          // The Healthy Food "Design Your Own Salad" card reuses that dish's photo.
          const image = item.title === 'Design Your Own Salad' ? copyImage(dishImage) : undefined;
          return { ...item, ...(image ? { image } : {}) };
        })
      )
    : undefined;

  return {
    slug: page.slug,
    title: page.title,
    metaTitle: page.meta.title,
    metaDescription: page.meta.description,
    heroTitle: page.hero.title,
    heroContent: page.hero.content,
    ...(page.list ? { listTitle: page.list.title, ...(page.list.intro ? { listIntro: page.list.intro } : {}) } : {}),
    ...(customItems ? { customItems } : {}),
    ...(page.build
      ? {
          buildTitle: page.build.title,
          buildSubtitle: page.build.subtitle,
          buildNote: page.build.note,
          buildCtaLabel: page.build.ctaLabel,
          buildSteps: keyed('buildStep', 'step', page.build.steps),
        }
      : {}),
    sourcingTitle: page.sourcing.title,
    sourcingSubtitle: page.sourcing.subtitle,
    sourcingCtaLabel: page.sourcing.ctaLabel,
    exploreSubtitle: page.explore.subtitle,
    ctaSubtitle: page.cta.subtitle,
    faqs: keyed('faqItem', 'faq', page.faqs),
    ...migratedMenuImages(page.slug, old),
  };
}

const announcementFields: Doc = {
  enabled: navigationData.announcement?.enabled ?? true,
  text: navigationData.announcement?.text,
  linkLabel: navigationData.announcement?.linkLabel,
  linkHref: navigationData.announcement?.linkHref,
};

const navigationFields: Doc = {
  links: navigationData.header.links.map((link, i) => ({
    _type: 'navLink',
    _key: `link-${i + 1}`,
    text: link.text,
    ...(link.href ? { href: link.href } : {}),
    subLinks: keyed(
      'navSubLink',
      `link-${i + 1}-sub`,
      (link.links ?? []).map(({ text, href }) => ({ text, href }))
    ),
  })),
  actions: navigationData.header.actions.map((action, i) => ({
    _key: `action-${i + 1}`,
    text: action.text,
    href: action.href,
    variant: action.variant ?? 'primary',
  })),
};

const footerFields: Doc = {
  columns: navigationData.footer.links.map((column, i) => ({
    _type: 'footerColumn',
    _key: `column-${i + 1}`,
    title: column.title,
    links: keyed(
      'footerLink',
      `column-${i + 1}-link`,
      column.links.map(({ text, href }) => ({ text, href }))
    ),
  })),
  secondaryLinks: keyed(
    'footerLink',
    'legal',
    navigationData.footer.secondaryLinks.map(({ text, href }) => ({ text, href }))
  ),
  socialLinks: keyed(
    'socialLink',
    'social',
    navigationData.footer.socialLinks.map(({ ariaLabel, icon, href }) => ({ ariaLabel, icon, href }))
  ),
  footNote: navigationData.footer.footNote,
};

const aboutFields: Doc = {
  metaTitle: about.meta.title,
  metaDescription: about.meta.description,
  heroTitle: about.hero.title,
  heroContent: about.hero.content,
  heroPrimaryCtaLabel: about.hero.primaryCtaLabel,
  heroSecondaryCtaLabel: about.hero.secondaryCtaLabel,
  missionHeading: about.mission.heading,
  missionQuote: about.mission.quote,
  missionBody: about.mission.body,
  storyHeading: about.story.heading,
  storyParagraphs: about.story.paragraphs,
  storyNote: about.story.note,
  sustainabilityHeading: about.sustainability.heading,
  sustainabilityParagraphs: about.sustainability.paragraphs,
  sustainabilityNote: about.sustainability.note,
  sustainabilityCtaLabel: about.sustainability.ctaLabel,
  vendorsHeading: about.vendors.heading,
  vendorsParagraphs: about.vendors.paragraphs,
  vendorsCtaLabel: about.vendors.ctaLabel,
  ctaTitle: about.cta.title,
  ctaSubtitle: about.cta.subtitle,
};

const careersFields: Doc = {
  metaTitle: careers.meta.title,
  metaDescription: careers.meta.description,
  heroTitle: careers.hero.title,
  heroContent: careers.hero.content,
  benefitsHeading: careers.benefits.heading,
  benefits: careers.benefits.items,
  applyTitle: careers.applyTitle,
  ctaTitle: careers.cta.title,
  ctaSubtitle: careers.cta.subtitle,
};

const ingredientsFields: Doc = {
  metaTitle: ingredients.meta.title,
  metaDescription: ingredients.meta.description,
  heroTagline: ingredients.hero.tagline,
  heroTitle: ingredients.hero.title,
  heroContent: ingredients.hero.content,
  heroPrimaryCtaLabel: ingredients.hero.primaryCtaLabel,
  heroSecondaryCtaLabel: ingredients.hero.secondaryCtaLabel,
  sourcingEyebrow: ingredients.sourcingEyebrow,
  facts: keyed('sourcingFact', 'fact', ingredients.facts),
  ctaTitle: ingredients.cta.title,
  ctaSubtitle: ingredients.cta.subtitle,
  faqTitle: ingredients.faqTitle,
  faqs: keyed('faqItem', 'faq', ingredients.faqs),
};

function interiorFields(page: (typeof interiorPages)[number]): Doc {
  return {
    slug: page.slug,
    metaTitle: page.meta.title,
    metaDescription: page.meta.description,
    heading: page.heading,
    lede: page.lede,
    sections: keyed(
      'interiorSection',
      'section',
      page.sections.map((section) => ({
        ...(section.heading ? { heading: section.heading } : {}),
        ...(section.body ? { body: section.body } : {}),
        ...(section.items ? { items: keyed('interiorItem', 'item', section.items) } : {}),
        ...(section.links ? { links: keyed('interiorLink', 'link', section.links) } : {}),
      }))
    ),
  };
}

function cateringFields(existing: Doc | null): Doc {
  const oldTrays = (existing?.trayImages as Array<{ label?: string; image?: ImageValue }> | undefined) ?? [];
  const imageByTray = new Map(oldTrays.map((tray) => [tray.label, copyImage(tray.image)]));

  return {
    metaTitle: catering.meta.title,
    metaDescription: catering.meta.description,
    heroTagline: catering.hero.tagline,
    heroTitle: catering.hero.title,
    heroContent: catering.hero.content,
    pricingTitle: catering.pricing.title,
    pricingIntro: catering.pricing.intro,
    orderingTitle: catering.pricing.orderingTitle,
    orderingText: catering.pricing.orderingText,
    trays: keyed(
      'cateringTray',
      'tray',
      catering.trays.map((tray) => {
        const image = imageByTray.get(tray.name);
        return { name: tray.name, price: tray.price, ...(image ? { image } : {}) };
      })
    ),
    occasionsEyebrow: catering.occasions.eyebrow,
    occasionsTitle: catering.occasions.title,
    occasionsIntro: catering.occasions.intro,
    occasionsLinkLabel: catering.occasions.linkLabel,
    ctaSubtitle: catering.cta.subtitle,
    faqs: keyed('faqItem', 'faq', catering.faqs),
    sharedOrderLabel: catering.shared.orderLabel,
    sharedMenuLabel: catering.shared.menuLabel,
    sharedLocationLabel: catering.shared.locationLabel,
    sharedReadyTitle: catering.shared.readyTitle,
    sharedFaqTitle: catering.shared.faqTitle,
    sharedSubNavEyebrow: catering.shared.subNavEyebrow,
    sharedSubNavTitle: catering.shared.subNavTitle,
    sharedSubNavSubtitle: catering.shared.subNavSubtitle,
  };
}

function subpageFields(page: (typeof subpages)[number], oldCatering: Doc | null): Doc {
  const heroImage = copyImage(oldCatering?.[OLD_HERO_FIELD[page.slug]] as ImageValue | undefined);
  return {
    slug: page.slug,
    order: page.order,
    title: page.title,
    metaTitle: page.meta.title,
    metaDescription: page.meta.description,
    heroContent: page.heroContent,
    ...(page.heroPrimaryCtaLabel ? { heroPrimaryCtaLabel: page.heroPrimaryCtaLabel } : {}),
    ...(heroImage ? { heroImage } : {}),
    occasions: keyed('occasionCard', 'card', page.occasions),
    faqs: keyed('faqItem', 'faq', page.faqs),
    ctaSubtitle: page.ctaSubtitle,
    showOnCateringPage: page.showOnCateringPage,
    ...(page.cardDescription ? { cardDescription: page.cardDescription } : {}),
  };
}

const locationsHubFields: Doc = {
  metaTitle: locationsHub.meta.title,
  metaDescription: locationsHub.meta.description,
  heroTagline: locationsHub.hero.tagline,
  heroTitle: locationsHub.hero.title,
  heroContent: locationsHub.hero.content,
  directoryTitle: locationsHub.directoryTitle,
  faqs: keyed('faqItem', 'faq', locationsHub.faqs),
  ctaTitle: locationsHub.cta.title,
  ctaSubtitle: locationsHub.cta.subtitle,
  sharedHeroPrimaryCtaLabel: locationsShared.heroPrimaryCtaLabel,
  sharedHeroSecondaryCtaLabel: locationsShared.heroSecondaryCtaLabel,
  sharedVisitTitle: locationsShared.visitTitle,
  sharedPickupLabel: locationsShared.pickupLabel,
  sharedDeliveryLabel: locationsShared.deliveryLabel,
  sharedDirectionsLabel: locationsShared.directionsLabel,
  sharedMoreTitle: locationsShared.moreTitle,
  sharedMoreSubtitle: locationsShared.moreSubtitle,
  sharedViewLabel: locationsShared.viewLabel,
  sharedFaqTitle: locationsShared.faqTitle,
};

function storeFields(slug: string, order: number, oldLocations: Doc | null): Doc {
  const store = storeLocations.find((candidate) => candidate.slug === slug);
  const page = locationPages.find((candidate) => candidate.slug === slug);
  if (!store || !page) throw new Error(`No store data for ${slug}`);
  const heroImage = copyImage(oldLocations?.[OLD_STORE_IMAGE_FIELD[slug]] as ImageValue | undefined);

  return {
    slug,
    order,
    name: store.name,
    shopName: store.shopName,
    addressLine1: store.addressLine1,
    addressLine2: store.addressLine2,
    ...(store.landmark ? { landmark: store.landmark } : {}),
    phoneDisplay: store.phoneDisplay,
    hours: store.hours.split(' · ').map((line) => line.trim()),
    intro: store.intro,
    orderPickupHref: store.orderPickupHref,
    orderDeliveryHref: store.orderDeliveryHref,
    ...(store.mapsEmbedSrc ? { mapsEmbedSrc: store.mapsEmbedSrc } : {}),
    metaTitle: page.meta.title,
    metaDescription: page.meta.description,
    heroTitle: page.heroTitle,
    heroContent: page.heroContent,
    ...(heroImage ? { heroImage } : {}),
    aboutHeading: page.aboutHeading,
    aboutParagraphs: page.aboutParagraphs,
    faqs: keyed('faqItem', 'faq', page.faqs),
    ctaTitle: page.cta.title,
    ctaSubtitle: page.cta.subtitle,
  };
}

const pressFields: Doc = {
  metaTitle: pressPage.meta.title,
  metaDescription: pressPage.meta.description,
  heading: pressPage.heading,
  lede: pressPage.lede,
};

const reviewsFields: Doc = {
  metaTitle: reviewsPage.meta.title,
  metaDescription: reviewsPage.meta.description,
  heroTitle: reviewsPage.heroTitle,
  heroSubtitle: reviewsPage.heroSubtitle,
  listTitle: reviewsPage.listTitle,
  ctaTitle: reviewsPage.cta.title,
  ctaSubtitle: reviewsPage.cta.subtitle,
};

const legalFields = (page: LegalPageSpec): Doc => ({
  slug: page.slug,
  metaTitle: page.meta.title,
  metaDescription: page.meta.description,
  heading: page.heading,
  subtitle: page.subtitle,
  sections: page.sections.map((section, index) => ({
    _type: 'legalSection',
    _key: `section-${index + 1}`,
    heading: section.heading,
    body: specToPortableText(section.blocks, `s${index + 1}`),
  })),
  ctaTitle: page.cta.title,
  ctaSubtitle: page.cta.subtitle,
});

type Plan = { id: string; type: string; set: Doc; unset: string[]; skipped?: string };

/** Decide what to write to one document without overwriting an editor's copy. */
function plan(
  id: string,
  type: string,
  existing: Doc | null,
  fields: Doc,
  copyMarker: string,
  unset: string[] = []
): Plan {
  const hasCopy = !isEmpty(existing?.[copyMarker]);
  if (hasCopy && !fillMissing) {
    return { id, type, set: {}, unset: [], skipped: 'already has copy (use --fill-missing to fill empty fields)' };
  }
  const set = Object.fromEntries(Object.entries(fields).filter(([key]) => isEmpty(existing?.[key])));
  return { id, type, set, unset: unset.filter((field) => !isEmpty(existing?.[field])) };
}

async function main() {
  const ids = [
    'singleton-about',
    'singleton-careers',
    'singleton-ingredients',
    'singleton-catering',
    ...subpages.map((p) => `singleton-catering-${p.slug}`),
    ...interiorPages.map((p) => `singleton-interior-${p.slug}`),
    'singleton-locations',
    ...storeLocations.map((s) => `singleton-location-${s.slug}`),
    'singleton-announcement',
    'singleton-navigation',
    'singleton-footer',
    'singleton-menu-pages',
    'singleton-menu',
    ...menuPages.map((p) => `singleton-menu-${p.slug}`),
    'singleton-press',
    'singleton-reviews',
    ...legalPages.map((p) => `singleton-legal-${p.slug}`),
  ];
  const docs = await client.fetch<Doc[]>(`*[_id in $ids]`, { ids });
  const byId = new Map(docs.map((doc) => [doc._id as string, doc]));
  const oldCatering = byId.get('singleton-catering') ?? null;
  const oldLocations = byId.get('singleton-locations') ?? null;
  const oldMenuPages = byId.get('singleton-menu-pages') ?? null;
  const categoryDocs = await client.fetch<Array<{ slug?: string; description?: string }>>(
    `*[_type == "menuCategory" && defined(slug.current)]{ "slug": slug.current, description }`
  );
  const categoryDescriptions = new Map(
    categoryDocs.filter((doc) => doc.slug && doc.description).map((doc) => [doc.slug!, doc.description!])
  );
  const dishImage = await client.fetch<ImageValue | null>(
    `*[_type == "menuItem" && title == "Design Your Own Salad" && defined(photo.asset)][0].photo`
  );

  const plans: Plan[] = [
    plan('singleton-about', 'aboutContent', byId.get('singleton-about') ?? null, aboutFields, 'metaTitle'),
    plan('singleton-careers', 'careersContent', byId.get('singleton-careers') ?? null, careersFields, 'metaTitle'),
    plan(
      'singleton-ingredients',
      'ingredientsContent',
      byId.get('singleton-ingredients') ?? null,
      ingredientsFields,
      'metaTitle'
    ),
    plan('singleton-catering', 'cateringContent', oldCatering, cateringFields(oldCatering), 'metaTitle', OLD_FIELDS),
    ...subpages.map((page) => {
      const id = `singleton-catering-${page.slug}`;
      return plan(id, 'cateringSubpage', byId.get(id) ?? null, subpageFields(page, oldCatering), 'title');
    }),
    ...interiorPages.map((page) => {
      const id = `singleton-interior-${page.slug}`;
      return plan(id, 'interiorPage', byId.get(id) ?? null, interiorFields(page), 'heading');
    }),
    plan('singleton-locations', 'locationsContent', oldLocations, locationsHubFields, 'metaTitle', OLD_LOCATION_FIELDS),
    ...storeLocations.map((store, index) => {
      const id = `singleton-location-${store.slug}`;
      return plan(id, 'locationPage', byId.get(id) ?? null, storeFields(store.slug, index + 1, oldLocations), 'name');
    }),
    plan(
      'singleton-announcement',
      'announcementBar',
      byId.get('singleton-announcement') ?? null,
      announcementFields,
      'text'
    ),
    plan('singleton-navigation', 'siteNavigation', byId.get('singleton-navigation') ?? null, navigationFields, 'links'),
    plan('singleton-footer', 'siteFooter', byId.get('singleton-footer') ?? null, footerFields, 'columns'),
    plan(
      'singleton-menu',
      'menuHub',
      byId.get('singleton-menu') ?? null,
      menuHubFields(oldMenuPages, categoryDescriptions),
      'metaTitle'
    ),
    ...menuPages.map((page) => {
      const id = `singleton-menu-${page.slug}`;
      return plan(
        id,
        'menuSubpage',
        byId.get(id) ?? null,
        menuPageFields(page, oldMenuPages, dishImage ?? undefined),
        'title'
      );
    }),
    plan('singleton-press', 'pressPage', byId.get('singleton-press') ?? null, pressFields, 'heading'),
    plan('singleton-reviews', 'reviewsPage', byId.get('singleton-reviews') ?? null, reviewsFields, 'heroTitle'),
    ...legalPages.map((page) => {
      const id = `singleton-legal-${page.slug}`;
      return plan(id, 'legalPage', byId.get(id) ?? null, legalFields(page), 'heading');
    }),
  ];
  const menuPlans = plans.filter((p) => p.type === 'menuHub' || p.type === 'menuSubpage');
  const removeOldMenuDoc = Boolean(oldMenuPages) && menuPlans.every((p) => !p.skipped);

  for (const p of plans) {
    const exists = byId.has(p.id);
    console.log(`\n${p.id} ${exists ? '' : '(new)'}`);
    if (p.skipped) console.log(`  – skipped: ${p.skipped}`);
    for (const key of Object.keys(p.set)) console.log(`  + ${key}`);
    for (const key of p.unset) console.log(`  × remove old field ${key}`);
  }
  if (oldMenuPages) {
    console.log(
      `\nsingleton-menu-pages ${removeOldMenuDoc ? '× will be deleted after its images are copied' : '(kept — some Menu documents already exist)'}`
    );
  }

  if (!commit) {
    console.log('\nDry run. Re-run with --commit to write.');
    return;
  }
  if (!token) throw new Error('Set SANITY_WRITE_TOKEN (Editor) in .env to write.');

  // One transaction: sub-pages receive their images before the old fields are removed.
  const tx = client.transaction();
  for (const p of plans) {
    if (!Object.keys(p.set).length && !p.unset.length) continue;
    tx.createIfNotExists({ _id: p.id, _type: p.type });
    let patch = client.patch(p.id);
    if (Object.keys(p.set).length) patch = patch.set(p.set);
    if (p.unset.length) patch = patch.unset(p.unset);
    tx.patch(patch);
  }
  if (removeOldMenuDoc) {
    tx.delete('singleton-menu-pages');
    tx.delete('drafts.singleton-menu-pages');
  }
  const result = await tx.commit();
  console.log(`\nDone. ${result.results.length} operations committed.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
