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
    subtitle: 'Fresh From Hawaii. Rooted in Aloha.',
    content: '',
    primaryCtaLabel: 'View Menu',
    secondaryCtaLabel: 'Find a Location',
  },
  mission: {
    heading: 'Our Mission',
    quote:
      'Aloha Salads was established to serve fresh, locally grown food of the highest quality at affordable prices. We remain dedicated to supporting local farmers and fishermen while providing our customers with fresh and delicious ingredients.',
    body: '',
  },
  story: {
    heading: 'Our Story',
    paragraphs: [
      'It started with a simple idea: Hawaii deserved a place where eating healthy could be fresh, delicious and convenient.',
      'In May 2006 we opened the doors to our first Aloha Salads in Kailua, bringing locally grown ingredients to our community. What started as a small family business quickly became a neighborhood favorite.',
      'Since then we have opened at Kahala Mall, Kapolei Commons, Pearlridge Center, Windward Mall in Kaneohe and Mililani Town Center. The menu has grown over those twenty years, but the dishes people come back for have not changed. The Aloha Passion and the Ono Island Ahi have been on it since the start.',
      'Twenty years later, our mission remains the same. We are proud to serve food made with quality ingredients, support local farmers and fishermen, and bring a little more aloha to every meal.',
      'Today, with six locations across Oahu, Aloha Salads is still a family affair. Our roots are in Kailua, our heart is in Hawaii, and we are committed to keeping fresh, healthy and affordable food accessible to everyone.',
      "We are honored to be recognized as First Place, Hawaii's Best 2024, People's Choice Awards, Star-Advertiser.",
    ],
    note: '',
  },
  founder: {
    heading: 'Founder Story',
    tagline: 'From a Simple Idea to a Family Legacy',
    paragraphs: [
      "Twenty years ago, Sara Lufrano moved back home to Hawaii after living in Chicago. She missed being able to grab a fresh, healthy salad on the go, and at the time there wasn't much like it here. So she and her husband asked themselves, why don't we create it ourselves?",
      "With a credit card, a lot of hope and plenty of hard work, they opened the very first Aloha Salads in Kailua. Living at Sara's parents' house, they stayed up late creating the menu and spent their days chopping, prepping and getting everything ready. On opening day it was just the two of them behind the counter. Then came a moment they will never forget: a line out the door.",
      'What started as a small idea soon became a family business. Their children grew up in the restaurants, with their youngest just a newborn when they opened. Over the years both boys worked alongside their friends, becoming part of the family business their parents built from the ground up.',
    ],
    quotes: [
      { quote: "It's wonderful to have the whole family be a part of this business.", attribution: 'Sara Lufrano' },
      {
        quote:
          "Growing up, the restaurant's always been such a big part of our family. I can't remember a time when it wasn't.",
        attribution: 'Kekoa Lufrano',
      },
    ],
    closing: "Mahalo for being part of our story. Here's to many more years of sharing fresh food and aloha.",
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
