import type { HomepageContent } from './types';

/**
 * Homepage copy as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:homepage` writes these into Sanity (only fields that are still empty).
 *  2. Safety net — if Sanity is unreachable or an editor clears a field, the page still renders sensible copy
 *     instead of an empty section.
 *
 * Sanity is the source of truth. Edit copy in the Studio (Homepage), not here.
 */
export const HOMEPAGE_DEFAULTS: HomepageContent = {
  meta: {
    title: 'Aloha Salads | Fresh Salads & Local Ahi on Oahu',
    description:
      'Founded in Kailua in 2006, Aloha Salads serves fresh island-grown produce and never-frozen local ahi across six Oahu locations. Order online for pickup.',
  },
  hero: {
    tagline: 'Kailua-born since 2006 · Six spots on Oahu',
    title: 'Aloha Salads: Fresh Food\nCrafted Daily on Oahu.',
    subtitle:
      'Founded in Kailua in May 2006, Aloha Salads provides fresh, locally grown food tailored to active island lifestyles. Voted First Place Hawaiis Best 2024 in the Peoples Choice Awards by the Star Advertiser, we operate six neighborhood restaurants across Oahu.',
    primaryCtaLabel: 'Order Online',
    secondaryCtaLabel: 'Order Catering',
  },
  brandBar: [{ text: 'Healthy', tilt: true }, { text: 'Fresh' }, { text: 'Local', tilt: true }],
  menu: {
    eyebrow: 'Order Now',
    title: 'Explore Our Full Menu',
    subtitle:
      'We prepare fresh meals daily across our six Oahu locations. Browse our core categories below to find your meal or order ahead for fast pickup.',
    ctaLabel: 'View Full Menu',
  },
  localSourcing: {
    eyebrow: 'Local sourcing',
    title: 'Our Local Sourcing',
    body: 'We partner with Hawaii growers and suppliers to bring quality ingredients into our kitchens. We feature vine-ripe tomatoes from Hauula and exclusively use never-frozen local ahi sourced through a Honolulu seafood supplier with vessel-level catch traceability.',
    ctaLabel: 'Our Ingredients',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'What Our Customers Say',
  },
  locations: {
    eyebrow: 'Visit Now',
    title: 'Visit a Store Near You',
    subtitle: 'Stop by any of our six Oahu locations in Kailua, Kahala, Kaneohe, Kapolei, Mililani, or Pearlridge.',
    ctaLabel: 'View All Locations',
    viewLabel: 'View {name}',
  },
};
