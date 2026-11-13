import { storeLocations } from '~/data/locations';
import { CATERING_CTA_HREF } from '~/config/cta';
import type { InteriorPageContent } from './interiorShared';
import { CATERING_LINKS, CATERING_TRAYS, CATERING_SLOTS, locationPage } from './interiorShared';

export const interiorPagesB: Record<string, InteriorPageContent> = {
  '/catering': {
    path: '/catering',
    title: 'Catering',
    metaDescription: 'Aloha Salads catering trays for offices, meetings, events, and large groups across Oahu.',
    heading: 'Catering',
    lede: 'Trays for the table, priced as they are on the current menu. Servings, minimums, lead time, and delivery radius will fill in once the shops confirm them.',
    sections: [
      {
        heading: 'Catering trays',
        items: CATERING_TRAYS,
      },
      {
        heading: 'Ordering details',
        items: CATERING_SLOTS,
      },
      {
        heading: 'Catering for',
        links: CATERING_LINKS,
      },
    ],
  },
  '/catering/corporate': {
    path: '/catering/corporate',
    title: 'Corporate Catering',
    metaDescription: 'Corporate catering from Aloha Salads: trays for teams across Oahu.',
    heading: 'Corporate catering',
    lede: 'Fresh trays for the office, the boardroom, and the all-hands. See the catering hub for the full priced list.',
    sections: [{ links: [{ text: 'View all catering', href: CATERING_CTA_HREF }] }],
  },
  '/catering/office-lunches': {
    path: '/catering/office-lunches',
    title: 'Office Lunch Catering',
    metaDescription: 'Office lunch catering from Aloha Salads.',
    heading: 'Office lunch catering',
    lede: 'Lunch that shows up ready: salads, wraps, and trays for the workday.',
    sections: [{ links: [{ text: 'View all catering', href: CATERING_CTA_HREF }] }],
  },
  '/catering/meetings': {
    path: '/catering/meetings',
    title: 'Meeting Catering',
    metaDescription: 'Meeting catering from Aloha Salads.',
    heading: 'Meeting catering',
    lede: 'Keep the meeting on the food, not the logistics. Trays for working lunches and longer sessions.',
    sections: [{ links: [{ text: 'View all catering', href: CATERING_CTA_HREF }] }],
  },
  '/catering/events': {
    path: '/catering/events',
    title: 'Event Catering',
    metaDescription: 'Event catering from Aloha Salads.',
    heading: 'Event catering',
    lede: 'Event trays, listed separately from party catering. Same kitchen, different use.',
    sections: [{ links: [{ text: 'View all catering', href: CATERING_CTA_HREF }] }],
  },
  '/catering/large-groups': {
    path: '/catering/large-groups',
    title: 'Large Group Catering',
    metaDescription: 'Large group catering from Aloha Salads.',
    heading: 'Large group catering',
    lede: 'When the guest count goes up, start with the tray list on the catering hub and tell us the head count.',
    sections: [{ links: [{ text: 'View all catering', href: CATERING_CTA_HREF }] }],
  },
  '/locations': {
    path: '/locations',
    title: 'Locations',
    metaDescription:
      'Find an Aloha Salads location near you. We operate seven restaurants across Oahu offering fresh meals for dine-in or fast pickup.',
    heading: 'Aloha Salads Locations on Oahu',
    lede: 'Find your nearest Aloha Salads. We operate seven neighborhood restaurants across Oahu. Every location offers online ordering for fast pickup and convenient dine-in seating.',
    sections: [
      {
        heading: 'Find a shop',
        links: storeLocations.map((store) => ({ text: store.heading, href: store.href })),
      },
    ],
  },
  '/order-online': {
    path: '/order-online',
    title: 'Order Online',
    metaDescription: 'Order Aloha Salads online for pickup or delivery from any of our seven Oahu locations.',
    heading: 'Order online',
    lede: 'Pickup or delivery from any of our seven stores. Choose a location to start an order.',
    sections: [
      {
        heading: 'Order from a store',
        links: storeLocations.map((store) => ({ text: store.heading, href: store.href })),
      },
    ],
  },
  '/gift-cards': {
    path: '/gift-cards',
    title: 'Gift Cards',
    metaDescription: 'Buy Aloha Salads gift cards and check your balance through Heartland.',
    heading: 'Gift cards',
    lede: 'Give the gift of a fresh, local meal. Purchase a card or check a balance through Heartland.',
    sections: [
      {
        links: [{ text: 'Buy or check a gift card', href: 'https://alohasaladskailua.hrpos.heartland.us/gift' }],
      },
    ],
  },
  '/nutrition-allergens': {
    path: '/nutrition-allergens',
    title: 'Nutrition & Allergen Information',
    metaDescription:
      'Nutrition and allergen information for Aloha Salads. Data will be published after business sign-off.',
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
  '/press': {
    path: '/press',
    title: 'Press & Media',
    metaDescription:
      "Explore recent television features, awards, and news coverage celebrating twenty years of Aloha Salads on O'ahu.",
    heading: 'Press & Media',
    lede: 'Explore recent news coverage and television features celebrating our twenty years in Hawaii.',
  },
  '/careers': {
    path: '/careers',
    title: 'Work With Us',
    metaDescription:
      'Apply to work at Aloha Salads. Tell us which of our seven Oahu locations you would like to join and send your resume.',
    heading: 'Work With Us',
    lede: 'Aloha Salads has been hiring from the neighborhoods we serve since our first store opened in Kailua in 2006. We have seven locations across Oahu and we are always glad to hear from people who want to join a team that cares about fresh food and looking after customers. Fill in the form below and tell us which store you would like to work at. There are no individual job postings, we review every application that comes in.',
    sections: [
      {
        heading: 'Benefits',
        items: [
          { title: 'Healthcare' },
          { title: 'Medical / dental' },
          { title: '401k for eligible employees' },
          { title: 'Discounted and free meals for staff' },
          { title: 'Parties and giveaways' },
        ],
      },
    ],
  },
  ...Object.fromEntries(storeLocations.map((store) => [store.href, locationPage(store)])),
};
