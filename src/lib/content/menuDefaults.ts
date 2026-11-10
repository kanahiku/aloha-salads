import { MENU_SUBPAGES_FOOD } from './menuSubpageDefaultsFood';
import { MENU_SUBPAGES_MORE } from './menuSubpageDefaultsMore';
import type { MenuCardCopy, MenuHubContent, MenuSharedContent, MenuSubpageContent } from './types';

/**
 * Approved copy for the Menu pages — the seed source and the safety net used when Sanity is unreachable or a
 * document is missing. Dishes themselves (names, descriptions, photos) are Menu items/categories in Sanity;
 * see `menuFallbackItems.ts` for their offline fallback.
 */

export const MENU_SHARED_DEFAULTS: MenuSharedContent = {
  orderLabel: 'Order Online',
  locationLabel: 'Find a Location',
  cateringLabel: 'Order Catering',
  faqTitle: 'Frequently Asked Questions',
  readyTitle: 'Ready to Order?',
  exploreTitle: 'Explore Other Menu Categories',
};

export const MENU_HUB_DEFAULTS: MenuHubContent = {
  meta: {
    title: 'Menu | Fresh Salads, Wraps & Local Ahi | Aloha Salads',
    description:
      'Explore the Aloha Salads menu featuring fresh salads, wraps, subs, soups, and Big Island mamaki tea across six Oahu locations. Order online for pickup.',
  },
  hero: {
    title: 'Our Menu:\nFreshly Crafted on Oahu',
    content:
      'We serve fresh, locally grown food prepared daily across our six Oahu locations. Explore our selection of salads, wraps, subs, and local favorites below, or order ahead for fast pickup.',
  },
  sourcing: {
    title: 'Quality Ingredients',
    subtitle:
      'Every meal is crafted using produce delivered daily by local Hawaii growers, including vine-ripe tomatoes from Hauula, alongside never-frozen local ahi with vessel-level catch traceability.',
    ctaLabel: 'Our Ingredients',
  },
  cta: {
    subtitle: 'Skip the line and order your favorite meal for quick pickup today.',
  },
  faqs: [
    {
      question: 'Can I order online for pickup?',
      answer: 'Yes. You can order ahead online for fast pickup at any of our six neighborhood restaurants across Oahu.',
    },
    {
      question: 'Do you offer catering trays?',
      answer: 'Yes. We offer a variety of priced catering trays and sandwich platters for group gatherings.',
    },
    {
      question: 'Are your dressings made in-house?',
      answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
    },
    {
      question: 'Do you serve fresh local seafood?',
      answer:
        'Yes. We exclusively feature never-frozen local ahi sourced through a Honolulu seafood supplier with vessel-level catch traceability.',
    },
    {
      question: 'Where are your locations?',
      answer:
        'We operate six neighborhood restaurants across Oahu, located in Kailua, Kahala, Kaneohe, Kapolei, Mililani, and Pearlridge.',
    },
  ],
  fullMenu: {
    title: 'Full Menu',
    subtitle: 'Browse the dishes and drinks available across our menu.',
    categoryLinkLabel: 'View category',
  },
};

/** Menu category cards, in card order. The card layout and links are fixed in the widget; only text is editable. */
export const MENU_CARD_DEFAULTS: MenuCardCopy[] = [
  {
    slug: 'salads',
    label: 'Salads',
    description: 'Signature bowls featuring crisp greens, local ahi, and house-made dressings.',
  },
  {
    slug: 'design-your-own-salad',
    label: 'Design Your Own Salad',
    description: 'Build a custom bowl with your choice of greens, toppings, and dressings.',
  },
  {
    slug: 'wraps-subs',
    label: 'Wraps & Subs',
    description: 'Hearty options wrapped in fresh tortillas or served on artisan bread.',
  },
  { slug: 'soups', label: 'Soups', description: 'Comforting warm seasonal selections.' },
  {
    slug: 'drinks',
    label: 'Drinks',
    description: 'Chilled Big Island mamaki mint tea and local beverages.',
  },
  { slug: 'kids', label: 'Keiki / Kids Menu', description: 'Wholesome options sized for children.' },
  {
    slug: 'vegan',
    label: 'Vegan Options',
    description: 'Dedicated plant-based choices and meatless meal selections.',
  },
  {
    slug: 'vegetarian',
    label: 'Vegetarian Options',
    description: 'Dedicated meatless meal selections for vegetarians.',
  },
  {
    slug: 'healthy-options',
    label: 'Healthy Food',
    description: 'Wholesome menu choices for an active island lifestyle.',
  },
  { slug: 'misc', label: 'Misc', description: 'Additional favorites and cafe-style selections.' },
];

/** In sidebar order — the order of the category cards. */
export const MENU_SUBPAGE_DEFAULTS: MenuSubpageContent[] = [...MENU_SUBPAGES_FOOD, ...MENU_SUBPAGES_MORE];
