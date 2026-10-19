import type { LocationPageCopy, LocationsHubContent, LocationsSharedContent } from './types';

/**
 * Locations page copy as originally approved (the hub and the six store pages).
 * Store facts — address, phone, hours, order and map links — live in `~/data/locations.ts`.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:locations` writes these into Sanity.
 *  2. Safety net — if Sanity is unreachable, the pages still render this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio (Locations), not here.
 */
export const LOCATIONS_SHARED_DEFAULTS: LocationsSharedContent = {
  heroPrimaryCtaLabel: 'Order Online',
  heroSecondaryCtaLabel: 'Order Catering',
  visitTitle: 'Location Details',
  moreTitle: 'More Oahu Locations',
  moreSubtitle: 'Find us across the island. Explore our other neighborhood restaurants below:',
  pickupLabel: 'Order Pickup',
  deliveryLabel: 'Order Delivery',
  directionsLabel: 'Get Directions',
  viewLabel: 'View Location',
  faqTitle: 'Frequently Asked Questions',
};

export const LOCATIONS_HUB_DEFAULTS: LocationsHubContent = {
  meta: {
    title: 'Aloha Salads Locations | Find Our 6 Oahu Restaurants',
    description:
      'Find an Aloha Salads location near you. We operate six restaurants across Oahu offering fresh meals for dine-in or fast pickup.',
  },
  hero: {
    tagline: 'Visit Now',
    title: 'Aloha Salads Locations\non Oahu',
    content:
      'Find your nearest Aloha Salads. We operate six neighborhood restaurants across Oahu. Every location offers online ordering for fast pickup and convenient dine-in seating.',
  },
  directoryTitle: 'Find a Fresh, Local Meal Near You',
  faqs: [
    {
      question: 'Do all locations offer dine-in seating?',
      answer: 'Yes. All six of our Oahu restaurants feature dedicated dining areas for guests who prefer to eat in.',
    },
    {
      question: 'Is parking available at your restaurants?',
      answer: 'Yes. Each of our mall and shopping center locations provides ample free parking for our guests.',
    },
    {
      question: 'Can I collect a catering order from the stores?',
      answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
    },
    {
      question: 'Do you offer delivery from these locations?',
      answer:
        'We partner with third-party delivery services to bring our meals directly to you. Delivery availability depends on your proximity to a specific restaurant.',
    },
  ],
  cta: {
    title: 'Visit Us Today',
    subtitle: 'Stop by your neighborhood restaurant for a fresh meal or place your order online for convenient pickup.',
  },
};

export const LOCATION_PAGE_DEFAULTS: LocationPageCopy[] = [
  {
    slug: 'kailua',
    meta: {
      title: 'Kailua Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at the Kailua Shopping Center. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Kailua',
    heroContent:
      'Visit our neighborhood restaurant for a fresh meal on the Windward coast. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    aboutHeading: 'Our Original Home in Kailua',
    aboutParagraphs: [
      'Kailua is where the Aloha Salads story began in May 2006. We opened our doors on the Windward coast with a mission to serve healthy meals using ingredients from Hawaii farmers and fishermen. Whether you are grabbing lunch after a morning at Kailua Beach or picking up dinner, our menu features crisp greens and never-frozen local ahi. We proudly serve the community that helped us grow into a local staple. Enjoy easy parking and a welcoming space for your next meal.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Kailua location?',
        answer: 'Yes. The Kailua Shopping Center provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Kailua?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Kailua?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Kailua?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Kailua area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Kailua',
      subtitle: 'Stop by the Kailua Shopping Center for a fresh meal or place your order online to skip the line.',
    },
  },
  {
    slug: 'kahala',
    meta: {
      title: 'Kahala Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at Kahala Mall in Honolulu. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Kahala',
    heroContent:
      'Visit our Honolulu restaurant for a fresh meal at Kahala Mall. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    aboutHeading: 'Your Kahala Neighborhood Stop',
    aboutParagraphs: [
      'Kahala Mall is your local destination for crisp greens and fresh local fish. Whether you are taking a break from shopping or grabbing a healthy meal after work, our menu features house-made dressings and never-frozen local ahi. We proudly serve the Honolulu community with convenient grab-and-go options and a welcoming space to enjoy your food.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Kahala location?',
        answer: 'Yes. Kahala Mall provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Kahala?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Kahala?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Kahala?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Kahala area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Kahala',
      subtitle: 'Stop by Kahala Mall for a fresh meal or place your order online to skip the line.',
    },
  },
  {
    slug: 'kaneohe',
    meta: {
      title: 'Kaneohe Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at Windward Mall in Kaneohe. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Kaneohe\nat Windward Mall',
    heroContent:
      'Visit our Windward Mall restaurant for a fresh meal in Kaneohe. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    aboutHeading: 'Your Kaneohe Neighborhood Stop',
    aboutParagraphs: [
      'Windward Mall is conveniently located for a fresh post-shopping meal or a quick family lunch. Whether you are running errands or spending the day around the Koolau mountains, our menu features crisp greens, house-made dressings, and never-frozen local ahi. We proudly serve the Kaneohe community with a welcoming space to enjoy wholesome food.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Kaneohe location?',
        answer: 'Yes. Windward Mall provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Kaneohe?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Kaneohe?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Kaneohe?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Kaneohe area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Kaneohe',
      subtitle: 'Stop by Windward Mall for a fresh meal or place your order online to skip the line.',
    },
  },
  {
    slug: 'kapolei',
    meta: {
      title: 'Kapolei Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at Kapolei Commons. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Kapolei',
    heroContent:
      'Visit our West Oahu restaurant for a fresh meal at Kapolei Commons. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    aboutHeading: 'Your Kapolei Neighborhood Stop',
    aboutParagraphs: [
      'Kapolei Commons serves West Oahu with hearty salads alongside refreshing Big Island mamaki mint tea. Whether you are catching a movie or running errands near Target, our menu features crisp greens, house-made dressings, and never-frozen local ahi. We proudly serve the growing Kapolei community with a welcoming space to enjoy wholesome food.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Kapolei location?',
        answer: 'Yes. Kapolei Commons provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Kapolei?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Kapolei?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Kapolei?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Kapolei area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Kapolei',
      subtitle: 'Stop by Kapolei Commons for a fresh meal or place your order online to skip the line.',
    },
  },
  {
    slug: 'mililani',
    meta: {
      title: 'Mililani Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at Mililani Town Center. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Mililani',
    heroContent:
      'Visit our central Oahu restaurant for a fresh meal at Mililani Town Center. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    aboutHeading: 'Your Mililani Neighborhood Stop',
    aboutParagraphs: [
      'Mililani Town Center is your local destination for wholesome, fresh food featuring ingredients sourced from Hawaii farmers. Whether you are running errands around the central community or picking up a healthy dinner, our menu features crisp greens, house-made dressings, and vibrant local flavors. We proudly serve the Mililani area with a welcoming space to enjoy your food.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Mililani location?',
        answer: 'Yes. Mililani Town Center provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Mililani?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Mililani?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Mililani?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Mililani area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Mililani',
      subtitle: 'Stop by Mililani Town Center for a fresh meal or place your order online to skip the line.',
    },
  },
  {
    slug: 'pearlridge',
    meta: {
      title: 'Pearlridge Location | Aloha Salads Oahu',
      description:
        'Visit Aloha Salads at Pearlridge Center Downtown. We serve fresh salads, signature wraps, healthy soups, and local beverages for dine-in or pickup.',
    },
    heroTitle: 'Aloha Salads Pearlridge',
    heroContent:
      'Visit our Aiea restaurant for a fresh meal at Pearlridge Center Downtown. We serve custom bowls and signature wraps for fast pickup or casual dine-in.',
    heroPrimaryCtaLabel: 'Order Online for Pickup',
    aboutHeading: 'Your Pearlridge Neighborhood Stop',
    aboutParagraphs: [
      'Pearlridge and Aiea feature custom salad bowls packed with fresh ingredients and local flavors right in the heart of the community. Whether you are shopping at the center or taking a lunch break during a busy workday, our menu features crisp greens, house-made dressings, and vibrant ingredients. We proudly serve the central community with a welcoming space to enjoy wholesome food.',
    ],
    faqs: [
      {
        question: 'Is parking available at the Pearlridge location?',
        answer: 'Yes. Pearlridge Center provides ample free parking for our restaurant guests.',
      },
      {
        question: 'Can I dine in at Aloha Salads Pearlridge?',
        answer: 'Yes. We offer a dedicated dining area for guests who prefer to eat their meals on site.',
      },
      {
        question: 'Can I pick up catering orders in Pearlridge?',
        answer: 'Yes. You can schedule large party trays and corporate catering orders for pickup at this location.',
      },
      {
        question: 'Can I collect a catering order from Pearlridge?',
        answer: 'Yes. Catering trays can be collected from this store. Call ahead to arrange it.',
      },
      {
        question: 'Do you deliver to the Pearlridge area?',
        answer:
          'We partner with third-party delivery services to bring our meals to local residents. Delivery availability depends on your exact address.',
      },
    ],
    cta: {
      title: 'Visit Us in Pearlridge',
      subtitle: 'Stop by Pearlridge Center for a fresh meal or place your order online to skip the line.',
    },
  },
];
