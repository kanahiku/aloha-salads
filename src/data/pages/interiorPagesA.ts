import { LOCATION_CTA_HREF, LOCATION_CTA_LABEL } from '~/config/cta';
import type { InteriorPageContent } from './interiorShared';
import { MENU_LINKS } from './interiorShared';

export const interiorPagesA: Record<string, InteriorPageContent> = {
  '/about': {
    path: '/about',
    title: 'Our Story',
    metaDescription: 'Aloha Salads opened in Kailua in 2006. Fresh, healthy, local food, now at seven spots across Oahu.',
    heading: 'Our story',
    lede: 'We opened in Kailua in 2006 with one idea: fresh, healthy food should taste worth coming back for, and feel like home. Seven locations later, thats still the whole plan.',
    sections: [
      {
        heading: 'From Kailua to Oahu',
        body: 'Healthy, fresh, and local is how we started, and how we still buy. The full sourcing story lives on Our Ingredients. This page is the short version of how we got here.',
        links: [
          { text: 'Our Ingredients', href: '/ingredients' },
          { text: LOCATION_CTA_LABEL, href: LOCATION_CTA_HREF },
        ],
      },
    ],
  },
  '/ingredients': {
    path: '/ingredients',
    title: 'Our Ingredients & Local Sourcing',
    metaDescription:
      'Fresh local ahi never frozen, island produce, mamaki mint tea from the Big Island, and compostable packaging.',
    heading: 'Our ingredients & local sourcing',
    lede: 'Weve bought from local farmers and fishermen since day one in Kailua. Heres what that actually means on your plate.',
    sections: [
      {
        heading: 'Never-frozen local ahi',
        body: 'Fresh local ahi, never frozen, delivered, not shipped in from far away.',
      },
      {
        heading: 'Local produce',
        body: 'Greens and vegetables from local Hawaii farms, in season whenever we can.',
      },
      {
        heading: 'Mamaki mint tea',
        body: 'Brewed from mamaki (mamaki) grown on Hawaii Island, a true taste of the islands. Search either spelling and youll land here.',
      },
      {
        heading: 'Packaging',
        body: 'All packaging is eco-friendly and compostable. Every piece of it.',
      },
    ],
  },
  '/menu': {
    path: '/menu',
    title: 'Menu',
    metaDescription: 'Salads, wraps, soups, keiki plates, drinks, and design-your-own bowls at Aloha Salads.',
    heading: 'The menu',
    lede: 'Individual dishes live inside these categories. They never get their own URL. Start with a favorite, or skip the list and build your own.',
    sections: [
      {
        heading: 'Browse by category',
        links: MENU_LINKS,
      },
    ],
  },
  '/menu/salads': {
    path: '/menu/salads',
    title: 'Salads',
    metaDescription: 'Island salads from Aloha Salads, including never-frozen local ahi and design-your-own bowls.',
    heading: 'Salads',
    lede: 'The bowls people come back for, plus plenty of room to build your own.',
    sections: [{ links: [{ text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' }] }],
  },
  '/menu/wraps-subs': {
    path: '/menu/wraps-subs',
    title: 'Wraps & Subs',
    metaDescription: 'Wraps and subs from Aloha Salads, including hummus pita and caprese.',
    heading: 'Wraps & subs',
    lede: 'The same fresh fillings, folded or stacked.',
  },
  '/menu/soups': {
    path: '/menu/soups',
    title: 'Soups',
    metaDescription: 'Soups from Aloha Salads.',
    heading: 'Soups',
    lede: 'Hot bowls to go with a salad, a wrap, or on their own.',
  },
  '/menu/kids': {
    path: '/menu/kids',
    title: 'Keiki / Kids Menu',
    metaDescription: 'Keiki menu at Aloha Salads: smaller portions for kids.',
    heading: 'Keiki / kids menu',
    lede: 'Smaller plates for smaller appetites, made with the same ingredients we serve everyone else.',
  },
  '/menu/design-your-own-salad': {
    path: '/menu/design-your-own-salad',
    title: 'Build Your Own Salad',
    metaDescription:
      'Build your own salad at Aloha Salads with your choice of fresh lettuce, toppings, cheese, and house-made dressing. Order online across our seven Oahu locations.',
    heading: 'Design Your Own Salad',
    lede: 'Skip the menu and build your own salad: greens, toppings, extras, and a dressing, the way you like it.',
    sections: [
      {
        heading: 'Build your own salad',
        body: 'This is the page vegan, vegetarian, and anyone with a specific combination should start from. Dishes never get their own URL. The builder lives here.',
        links: [{ text: 'Vegetarian options', href: '/menu/vegetarian' }],
      },
    ],
  },
  '/menu/vegan': {
    path: '/menu/vegan',
    title: 'Vegan Options',
    metaDescription:
      'Vegan dishes at Aloha Salads: Vegan Aloha Mediterranean, Vegan Mandarin Ginger, and Vegan Hummus Pita Wrap.',
    heading: 'Vegan options',
    lede: 'Three dishes on the menu are vegan. For everything else, design your own salad without animal products.',
    sections: [
      {
        heading: 'On the menu',
        items: [
          { title: 'Vegan Aloha Mediterranean' },
          { title: 'Vegan Mandarin Ginger' },
          { title: 'Vegan Hummus Pita Wrap' },
        ],
        links: [{ text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' }],
      },
    ],
  },
  '/menu/vegetarian': {
    path: '/menu/vegetarian',
    title: 'Vegetarian Options',
    metaDescription: 'Vegetarian menu options at Aloha Salads, plus dishes that can be made vegetarian.',
    heading: 'Vegetarian options',
    lede: 'Nothing on the menu is tagged vegetarian, so this list is derived from the ingredients. Start here, or design your own salad.',
    sections: [
      {
        heading: 'Vegetarian as served',
        items: [
          { title: 'Aloha Passion' },
          { title: 'Aloha Mediterranean' },
          { title: 'The Paniolo' },
          { title: 'Maui Mozzarella' },
          { title: 'Design Your Own Salad' },
          { title: 'Hummus Pita Wrap' },
          { title: 'Caprese Sub' },
          { title: 'Vegan Aloha Mediterranean' },
          { title: 'Vegan Mandarin Ginger' },
          { title: 'Vegan Hummus Pita Wrap' },
          { title: 'Sides' },
        ],
      },
      {
        heading: 'Can be made vegetarian',
        body: 'Some dishes only fail on a protein add-on. Aloha Caesar is not vegetarian (anchovy in the Caesar dressing). Tomato Bisque / Grilled Cheese Soup Combo is excluded until the stock is confirmed.',
        links: [{ text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' }],
      },
    ],
  },
  '/menu/healthy-options': {
    path: '/menu/healthy-options',
    title: 'Healthy Food & Menu Options',
    metaDescription:
      'Healthy food and menu options at Aloha Salads: island-grown produce, never-frozen local ahi, and bowls you control.',
    heading: 'Healthy food & menu options',
    lede: 'Fresh, healthy food that still tastes like something you want to eat. Island-grown produce, never-frozen local ahi, and a builder if you want to keep it exactly how you like it.',
    sections: [
      {
        links: [
          { text: LOCATION_CTA_LABEL, href: LOCATION_CTA_HREF },
          { text: 'Design Your Own Salad', href: '/menu/design-your-own-salad' },
        ],
      },
    ],
  },
  '/menu/drinks': {
    path: '/menu/drinks',
    title: 'Drinks',
    metaDescription: 'Drinks at Aloha Salads, including mamaki mint tea from Hawaii Island.',
    heading: 'Drinks',
    lede: 'From mamaki mint tea to the rest of the cooler. Details land here when the menu is designed.',
    sections: [{ links: [{ text: 'Our Ingredients', href: '/ingredients' }] }],
  },
  '/menu/misc': {
    path: '/menu/misc',
    title: 'Misc Menu Favorites',
    metaDescription: 'Additional Aloha Salads favorites including avocado toast, dessert toast, and acai bowls.',
    heading: 'Misc menu favorites',
    lede: 'Additional favorites and cafe-style selections from the Aloha Salads menu.',
    sections: [{ links: [{ text: 'Full Menu', href: '/menu' }] }],
  },
};
