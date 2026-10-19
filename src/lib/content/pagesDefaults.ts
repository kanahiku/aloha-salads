import { pressContent } from '~/data/pages/press';
import type { CareersContent, IngredientsContent, InteriorPageCopy, PressPageContent, ReviewsPageContent } from './types';

/**
 * Copy for Careers, Ingredients and the simple interior pages (Gift Cards, Nutrition & Allergens)
 * as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:pages` writes these into Sanity.
 *  2. Safety net — if Sanity is unreachable, the pages still render this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio, not here.
 */

export const CAREERS_DEFAULTS: CareersContent = {
  meta: {
    title: 'Work With Us | Aloha Salads',
    description:
      'Apply to work at Aloha Salads. Tell us which of our six Oahu locations you would like to join and send your resume.',
  },
  hero: {
    title: 'Work With Us',
    content:
      'Aloha Salads has been hiring from the neighborhoods we serve since our first store opened in Kailua in 2006. We have six locations across Oahu and we are always glad to hear from people who want to join a team that cares about fresh food and looking after customers. Fill in the form below and tell us which store you would like to work at. There are no individual job postings, we review every application that comes in.',
  },
  benefits: {
    heading: 'Benefits',
    items: [
      'Healthcare',
      'Medical / dental',
      '401k for eligible employees',
      'Discounted and free meals for staff',
      'Parties and giveaways',
    ],
  },
  applyTitle: 'Apply Now',
  cta: {
    title: 'Ready to Order?',
    subtitle:
      'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
  },
};

export const INGREDIENTS_DEFAULTS: IngredientsContent = {
  meta: {
    title: 'Local Ingredients & Sourcing | Aloha Salads Oahu',
    description:
      'Discover how Aloha Salads sources fresh ingredients, including vine-ripe Hauula tomatoes, vessel-tracked wild ahi, and Big Island mamaki tea.',
  },
  hero: {
    tagline: 'We Support Local',
    title: 'Our Ingredients: Freshly Sourced on Oahu',
    content:
      'We are dedicated to supporting local farmers and fishermen while providing our customers with the freshest and healthiest ingredients available. Every dish is built with quality produce and seafood delivered directly to our kitchens across Oahu.',
    primaryCtaLabel: 'View Menu',
    secondaryCtaLabel: 'Find a Location',
  },
  sourcingEyebrow: 'What we source',
  facts: [
    {
      title: 'Fresh Local Produce',
      description:
        '**Hauula Tomatoes:** We maintain a standing weekly order for vine-ripe tomatoes grown in Hauula.\n\n**Oahu Farms:** We receive Japanese cucumbers and a second tomato variety from another Oahu farm, alongside regular produce deliveries featuring items like green onions, sweet basil, bean sprouts, and green bell peppers.',
    },
    {
      title: 'Vessel-Tracked Wild Ahi',
      description:
        'We exclusively feature never-frozen local ahi for our seafood salads. Delivered about four times a week to our busier stores by a Honolulu seafood supplier, every delivery carries a lot number, origin as USA wild, and the name of the specific catch vessel that landed it.',
    },
    {
      title: 'Big Island Mamaki Mint Tea',
      description:
        'We brew our mamaki mint tea fresh in-store daily. The tea is sourced from a company in Hilo on the Big Island, made with Hawaiian mamaki and locally grown ingredients.',
    },
    {
      title: 'Quality Dressings and Foundations',
      description: 'Most of our signature salad dressings are made in house, in small batches through the week.',
    },
  ],
  cta: {
    title: 'Ready to Taste the Difference?',
    subtitle: 'Order your favorite salad or bowl online for fast pickup at any of our six Oahu locations.',
  },
  faqTitle: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'Can I view the full menu before ordering?',
      answer: 'Yes. You can explore our complete selection of salads, wraps, subs, and soups on our main menu page.',
    },
    {
      question: 'Where can I pick up an online order?',
      answer:
        'You can order ahead for fast pickup at any of our six neighborhood restaurants across Oahu, located in Kailua, Kahala, Kaneohe, Kapolei, Mililani, and Pearlridge.',
    },
    {
      question: 'Do you offer catering services?',
      answer: 'Yes. We offer a variety of priced catering trays and sandwich platters for group gatherings.',
    },
    {
      question: 'Are your dressings made in-house?',
      answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
    },
  ],
};

export const INTERIOR_PAGE_DEFAULTS: InteriorPageCopy[] = [
  {
    slug: 'gift-cards',
    meta: {
      title: 'Gift Cards | Aloha Salads',
      description: 'Buy Aloha Salads gift cards and check your balance through Heartland.',
    },
    heading: 'Gift cards',
    lede: 'Purchase a card or check a balance through Heartland. This page will link out once the live Heartland URL is confirmed.',
    sections: [
      {
        items: [
          { title: 'Buy a gift card', description: 'Heartland checkout — URL pending.' },
          { title: 'Check balance', description: 'Heartland balance check — URL pending.' },
        ],
      },
    ],
  },
  {
    slug: 'nutrition-allergens',
    meta: {
      title: 'Nutrition & Allergen Information | Aloha Salads',
      description:
        'Nutrition and allergen information for Aloha Salads. Data will be published after business sign-off.',
    },
    heading: 'Nutrition & allergen information',
    lede: 'This page is a shell until the business signs off the data. We will not invent nutritional values, allergen status, or cross-contamination claims.',
    sections: [
      {
        links: [
          { text: 'View menu', href: '/menu' },
          { text: 'Contact us', href: '/contact' },
        ],
      },
    ],
  },
];

/** Press & Media page text (the cards are separate `pressItem` documents). */
export const PRESS_PAGE_DEFAULTS: PressPageContent = {
  meta: { title: pressContent.metadata.title, description: pressContent.metadata.description },
  heading: pressContent.heading,
  lede: pressContent.lede,
};

/** Reviews page text. `{business}` is replaced with the business name from src/config. */
export const REVIEWS_PAGE_DEFAULTS: ReviewsPageContent = {
  meta: {
    title: 'Reviews | {business}',
    description: 'Read recent Google and Yelp reviews for {business}.',
  },
  heroTitle: 'Reviews',
  heroSubtitle: 'What people are saying about {business}.',
  listTitle: 'Recent reviews',
  cta: {
    title: 'Find a Location',
    subtitle: 'Six neighborhood restaurants across Oahu. Come see us.',
  },
};
