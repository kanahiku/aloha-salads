import { storeLocations } from '~/data/locations';
import {
  CATERING_CTA_HREF,
  CATERING_CTA_LABEL,
  LOCATION_CTA_HREF,
  LOCATION_CTA_LABEL,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
} from '~/config/cta';

export interface InteriorLink {
  text: string;
  href: string;
}

export interface InteriorItem {
  title: string;
  description?: string;
}

export interface InteriorSection {
  heading?: string;
  body?: string;
  links?: InteriorLink[];
  items?: InteriorItem[];
}

export interface InteriorPageContent {
  path: string;
  /** Document title (before the site name). */
  title: string;
  metaDescription: string;
  heading: string;
  lede: string;
  sections?: InteriorSection[];
}

export const MENU_LINKS: InteriorLink[] = [
  { text: 'Salads', href: '/menu/salads' },
  { text: 'Wraps & Subs', href: '/menu/wraps-subs' },
  { text: 'Soups', href: '/menu/soups' },
  { text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' },
  { text: 'Vegetarian Options', href: '/menu/vegetarian' },
  { text: 'Healthy Food & Menu Options', href: '/menu/healthy-options' },
  { text: 'Misc', href: '/menu/misc' },
  { text: 'Drinks', href: '/menu/drinks' },
];

export const CATERING_LINKS: InteriorLink[] = [
  { text: 'Office Lunch Catering', href: '/catering/office-lunches' },
  { text: 'School Catering', href: '/catering/schools' },
  { text: 'Corporate Catering', href: '/catering/corporate' },
  { text: 'Meeting Catering', href: '/catering/meetings' },
  { text: 'Event Catering', href: '/catering/events' },
  { text: 'Party Catering', href: '/catering/parties' },
  { text: 'Large Group Catering', href: '/catering/large-groups' },
];

export const CATERING_TRAYS: InteriorItem[] = [
  { title: 'Sandwich Platter', description: '$85' },
  { title: 'Ono Island Ahi Tray', description: '$60' },
  { title: 'Kamuela Cobb Tray', description: '$55' },
  { title: 'Mandarin Ginger Tray', description: '$52' },
  { title: 'Aloha Caesar with Chicken Tray', description: '$45' },
  { title: 'Aloha Passion Tray', description: '$42' },
  { title: 'Aloha Mediterranean Tray', description: '$42' },
  { title: 'The Paniolo Tray', description: '$42' },
  { title: 'Tray of Pita Bread', description: '$24' },
];

export const CATERING_SLOTS: InteriorItem[] = [
  { title: 'Servings per tray', description: 'To be confirmed.' },
  { title: 'Minimum order', description: 'To be confirmed.' },
  { title: 'Lead time', description: 'To be confirmed.' },
  { title: 'Delivery radius', description: 'To be confirmed.' },
];

export function locationPage(store: (typeof storeLocations)[number]): InteriorPageContent {
  return {
    path: store.href,
    title: store.heading,
    metaDescription: `${store.heading} Aloha Salads at ${store.shopName}. ${store.addressLine1}, ${store.addressLine2}.`,
    heading: store.heading,
    lede: store.intro,
    sections: [
      {
        heading: 'Visit this store',
        items: [
          { title: store.shopName, description: `${store.addressLine1}, ${store.addressLine2}` },
          { title: 'Phone', description: store.phoneDisplay },
          { title: 'Hours', description: store.hours },
        ],
        links: [
          { text: PRIMARY_CTA_LABEL, href: PRIMARY_CTA_HREF },
          { text: 'View menu', href: '/menu' },
          { text: CATERING_CTA_LABEL, href: CATERING_CTA_HREF },
          { text: 'All locations', href: LOCATION_CTA_HREF },
        ],
      },
    ],
  };
}
