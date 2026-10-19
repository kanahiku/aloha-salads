import type { AboutContent } from './types';

/**
 * About page copy as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:about` writes these into Sanity.
 *  2. Safety net — if Sanity is unreachable, the page still renders this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio (About), not here.
 */
export const ABOUT_DEFAULTS: AboutContent = {
  meta: {
    title: 'About Aloha Salads | Our Story & Local Sourcing on Oahu',
    description:
      'Learn about Aloha Salads. Founded in Kailua in 2006, we serve fresh, locally sourced food across six Oahu locations. Read our story.',
  },
  hero: {
    title: 'About Aloha Salads',
    content:
      'Kailua-born since 2006. Six locations across Oahu. Twenty years of fresh, locally sourced food made with ingredients you can trust.',
    primaryCtaLabel: 'View Menu',
    secondaryCtaLabel: 'Find a Location',
  },
  mission: {
    heading: 'Our Mission',
    quote:
      'Aloha Salads was established to serve fresh, locally grown food of the highest quality at affordable prices. We remain dedicated to supporting local farmers and fishermen while providing our customers with fresh and delicious ingredients.',
    body: 'That commitment has guided every decision we have made since May 2006 — from the produce we source to the dressings we make in house',
  },
  story: {
    heading: 'Our Story',
    paragraphs: [
      'Aloha Salads opened its first location at Kailua Shopping Center in May 2006. From day one, the goal was straightforward: give the community a place to eat food that is genuinely good for you, made with ingredients you can trust, at prices that make that easy to do every day.',
      'Twenty years later, that original promise still runs the kitchen. What started as a single neighborhood spot has grown into six locations across Oahu — each one serving the same house-made dressings, the same never-frozen local ahi, and the same produce sourced as close to home as possible.',
      'In 2024, the Star Advertisers Peoples Choice Awards named us **First Place, Hawaiis Best**. We are proud of it — and more proud that it came from the community we have been serving since the beginning.',
    ],
    note: 'Founder story coming soon.',
  },
  sustainability: {
    heading: 'Sustainability',
    paragraphs: [
      'The most straightforward thing we do for sustainability is buy local — on a standing weekly order, not as a trend. Hauula tomatoes come in every week from a single Oahu farm. Our produce comes from island growers wherever the season and supply hold up. The ahi on your plate was never frozen and came from Hawaii waters.',
      'Keeping the supply chain short means less transport, less cold-chain energy, and money that stays in the state. It also means the food is fresher when it reaches your bowl.',
    ],
    note: 'Packaging details coming soon.',
    ctaLabel: 'See Our Ingredients',
  },
  vendors: {
    heading: 'Our Vendors',
    paragraphs: [
      'Every delivery of local ahi arrives with a lot number and the name of the catch vessel on the paperwork. We know where the fish came from. That traceability is non-negotiable.',
      'Our other key suppliers — produce, proteins, and pantry — are all confirmed and operating on standing orders. We are not publishing names yet, but the sourcing page covers what is on your plate and where it comes from.',
    ],
    ctaLabel: 'See Our Ingredients',
  },
  cta: {
    title: 'Find a Location',
    subtitle: 'Six neighborhood restaurants across Oahu. Come see us.',
  },
};
