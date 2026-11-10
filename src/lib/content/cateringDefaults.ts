import { CATERING_SUBPAGES_A } from './cateringSubpageDefaultsA';
import { CATERING_SUBPAGES_B } from './cateringSubpageDefaultsB';
import type { CateringMainContent, CateringSubpageContent } from './types';

/**
 * Catering copy as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:catering` writes these into Sanity.
 *  2. Safety net — if Sanity is unreachable, the pages still render this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio (Catering), not here.
 */
export const CATERING_MAIN_DEFAULTS: CateringMainContent = {
  meta: {
    title: 'Catering Menu & Party Trays | Aloha Salads Oahu',
    description:
      'Order fresh catering trays for your next event. View our full catering menu with pricing, including our Sandwich Platter and Ono Island Ahi Tray.',
  },
  hero: {
    tagline: 'Order Now',
    title: 'Catering Menu',
    content:
      'Provide fresh meals for your next gathering with our catering trays. We prepare scaled-up versions of our signature salads and wraps for pickup across our six Oahu locations.',
  },
  pricing: {
    title: 'Catering Menu and Pricing',
    intro: 'Our trays are built using the same high-quality components as our standard menu.',
    orderingTitle: 'Ordering Details',
    orderingText:
      'Please contact your nearest location to confirm serving sizes per tray, minimum order requirements, and necessary lead times for large groups. Delivery availability and radius vary by restaurant.',
  },
  trays: [
    {
      name: 'Sandwich Platter',
      price: '$85',
    },
    {
      name: 'Ono Island Ahi Tray',
      price: '$60',
    },
    {
      name: 'Kamuela Cobb Tray',
      price: '$55',
    },
    {
      name: 'Mandarin Ginger Tray',
      price: '$52',
    },
    {
      name: 'Aloha Passion Tray',
      price: '$42',
    },
    {
      name: 'Aloha Mediterranean Tray',
      price: '$42',
    },
    {
      name: 'The Paniolo Tray',
      price: '$42',
    },
  ],
  occasions: {
    eyebrow: 'By occasion',
    title: 'Catering for Every Occasion',
    intro:
      'We accommodate groups of all sizes across different event types. Select your event category below to learn more:',
    linkLabel: 'Learn more',
  },
  cta: {
    subtitle:
      'Order online for pickup at any of our six Oahu stores. For serving sizes, minimums or lead times, call the store you want to collect from.',
  },
  faqs: [
    {
      question: 'Do you offer vegetarian catering options?',
      answer: 'Yes. We prepare meatless options including the Aloha Passion Tray and Aloha Mediterranean Tray.',
    },
    {
      question: 'Does catering include serving utensils?',
      answer: 'Ask the store when you order and they will let you know what is included.',
    },
    {
      question: 'How do I place a catering order?',
      answer:
        'You can place your catering order directly through our online ordering system or by calling your nearest location.',
    },
    {
      question: 'Can I customize the catering trays?',
      answer: 'Trays are built to set recipes. Call the store to talk through anything specific.',
    },
    {
      question: 'Where do I pick up my catering order?',
      answer: 'You can pick up your catering order at any of our six neighborhood restaurants across Oahu.',
    },
  ],
  shared: {
    orderLabel: 'Order Catering Online',
    menuLabel: 'View Full Catering Menu',
    locationLabel: 'Find a Location',
    readyTitle: 'Ready to Order?',
    faqTitle: 'Frequently Asked Questions',
    subNavEyebrow: 'Explore more',
    subNavTitle: 'More Catering Options',
    subNavSubtitle: 'We provide catering services for various event types. Explore our other catering menus below:',
  },
};

/** Display order matches "More catering options". */
export const CATERING_SUBPAGE_DEFAULTS: CateringSubpageContent[] = [...CATERING_SUBPAGES_A, ...CATERING_SUBPAGES_B];
