import type { MenuSubpageContent } from './types';

/** Menu category pages, part 2 (sidebar order). Combined in `menuDefaults.ts`. */
export const MENU_SUBPAGES_MORE: MenuSubpageContent[] = [
  {
    slug: 'drinks',
    title: 'Drinks',
    meta: {
      title: 'Drinks, Beverages & Local Mamaki Tea | Aloha Salads Oahu',
      description:
        'Complete your meal with our beverage selection, featuring Guava Lemonade and Big Island mamaki mint tea. Order online across our seven Oahu locations.',
    },
    hero: {
      title: 'Drinks and Beverages',
      content:
        'Pair your meal with our selection of chilled beverages. We offer a variety of refreshing options available for pickup across our seven Oahu locations.',
    },
    sourcing: {
      title: 'Big Island Mamaki',
      subtitle:
        'Our chilled mamaki mint tea is brewed fresh in-store using mamaki sourced from Hilo on the Big Island, alongside the same quality-first sourcing we use across the menu.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
    },
    faqs: [
      {
        question: 'Do you serve local Hawaiian tea?',
        answer: 'Yes. We serve freshly brewed mamaki mint tea sourced directly from the Big Island.',
      },
      {
        question: 'What is mamaki?',
        answer:
          'Mamaki is a plant native to Hawaii. Its leaves are traditionally brewed to create a mild, caffeine-free herbal tea.',
      },
      {
        question: 'Can I order drinks online?',
        answer: 'Yes. You can add any of our beverages to your online order for fast pickup.',
      },
      {
        question: 'Are drinks included with kids meals?',
        answer: 'Yes. Our Keiki Combo includes a designated keiki drink.',
      },
      {
        question: 'Where can I pick up my order?',
        answer: 'Our full beverage menu is available at our seven neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Browse our full menu to find your meal:',
    },
    list: {
      title: 'Our Drink Menu',
    },
  },
  {
    slug: 'kids',
    title: 'Keiki / Kids Menu',
    meta: {
      title: 'Keiki Menu & Kids Meals | Aloha Salads Oahu',
      description:
        'Discover our Keiki Combo, featuring a wholesome pita sandwich, fresh fruit, a drink, and an organic lollipop. Available across our seven Oahu locations.',
    },
    hero: {
      title: 'Keiki Menu',
      content:
        'Wholesome and portioned for children, our keiki options offer balanced meals built with the same quality ingredients found across our entire menu.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle: 'Every item on our menu is built on a foundation of quality ingredients and careful preparation.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your family order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
    },
    faqs: [
      {
        question: 'What is included in the Keiki Combo?',
        answer: 'The combo includes a pita sandwich, fresh fruit, a keiki drink, and an organic lollipop.',
      },
      {
        question: 'Are the lollipops organic?',
        answer: 'Yes. Every Keiki Combo comes with an organic lollipop.',
      },
      {
        question: 'Can I order the Keiki Combo for takeout?',
        answer: 'Yes. You can place your order online for fast pickup at your nearest location.',
      },
      {
        question: 'Is the Keiki Menu available at all restaurants?',
        answer: 'Yes. Our keiki options are available across all seven of our neighborhood restaurants on Oahu.',
      },
      {
        question: 'Where are your Oahu locations?',
        answer:
          'We operate seven neighborhood restaurants located in Kailua, Kahala, Kaneohe, Kapolei, Mililani, Pearlridge, and Keʻeaumoku.',
      },
    ],
    explore: {
      subtitle: 'Looking to complete your family order? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Keiki Menu',
    },
  },
  {
    slug: 'vegan',
    title: 'Vegan Options',
    meta: {
      title: 'Vegan Salads & Bowls | Aloha Salads Oahu',
      description:
        'Explore dedicated plant-based options including the Vegan Aloha Mediterranean. Order online across our seven Oahu locations.',
    },
    hero: {
      title: 'Vegan Menu Options',
      content:
        'Our vegan menu features three dedicated plant-based items. Choose from our signature recipes or build your own salad using our house-made dressings.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle:
        'Our plant-based options are built using the same high-quality components as the rest of our menu, including our house-made vegan dressings and vine-ripe Hauula tomatoes.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
    },
    faqs: [
      {
        question: 'Can I customize my vegan salad?',
        answer:
          'Yes. You can use the Design Your Own Salad option to build a bowl exactly how you want it using our plant-based ingredients.',
      },
      {
        question: 'Are your vegan dressings made in-house?',
        answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
      },
      {
        question: 'Do your vegan options contain local produce?',
        answer: 'Yes. We feature local produce including vine-ripe tomatoes grown in Hauula.',
      },
      {
        question: 'Can I order a vegan meal for takeout?',
        answer: 'Yes. You can order online for fast pickup at any of our seven neighborhood restaurants across Oahu.',
      },
      {
        question: 'Do you offer catering for vegan diets?',
        answer: 'Yes. We offer catering trays that can accommodate plant-based dietary requirements for group events.',
      },
    ],
    explore: {
      subtitle: 'Looking for a different meal option? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Vegan Menu',
    },
  },
  {
    slug: 'vegetarian',
    title: 'Vegetarian Options',
    meta: {
      title: 'Vegetarian Salads & Wraps | Aloha Salads Oahu',
      description:
        'Discover our meatless meal selections including the Aloha Passion salad, Hummus Pita Wrap, and Caprese Sub. Order online for fast pickup across our seven Oahu locations.',
    },
    hero: {
      title: 'Vegetarian Menu Options',
      content:
        'Our vegetarian menu offers a wide variety of meat-free meals. Choose from our established recipes or build your own bowl using our daily selection of fresh cheeses and produce.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle:
        'Every vegetarian item is built using the same high-quality components as the rest of our menu, including our house-made dressings and vine-ripe Hauula tomatoes.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of meatless catering trays.',
    },
    faqs: [
      {
        question: 'What kind of vegetarian wraps do you serve?',
        answer: 'We serve a Hummus Pita Wrap packed with feta, kalamata olives, and fresh vegetables.',
      },
      {
        question: 'Can I adapt a regular menu item to be vegetarian?',
        answer:
          'Yes. Some of our signature dishes can be adapted by leaving out the protein. Ask our team when you order and we will talk you through the options.',
      },
      {
        question: 'Can I customize my vegetarian salad?',
        answer:
          'Yes. You can use the Design Your Own Salad option to build a bowl exactly how you want it using our vegetarian ingredients and cheeses.',
      },
      {
        question: 'Do your vegetarian salads contain local produce?',
        answer: 'Yes. We feature local produce including vine-ripe tomatoes grown in Hauula.',
      },
      {
        question: 'Where can I order vegetarian meals for takeout?',
        answer:
          'Our full vegetarian menu is available to order online for fast pickup at all seven of our neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Looking for a different meal option? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Vegetarian Menu',
    },
  },
  {
    slug: 'healthy-options',
    title: 'Healthy Food & Options',
    meta: {
      title: 'Healthy Food & Menu Options | Aloha Salads Oahu',
      description:
        'Looking for a healthy meal? Discover fresh salads, lean proteins, and custom bowls at Aloha Salads. Order online across our seven Oahu locations.',
    },
    hero: {
      title: 'Healthy Food and Menu Options',
      content:
        'Finding a healthy meal should be simple. We serve fresh, nutrient-dense bowls and wraps made from quality ingredients across our seven Oahu locations.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle:
        'Healthy food requires quality sourcing. Every item is built on a foundation of premium ingredients, including our house-made dressings, vine-ripe Hauula tomatoes, and vessel-tracked local ahi.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a wellness event or office lunch? We also offer a variety of fresh catering options.',
    },
    faqs: [
      {
        question: 'What are your healthiest menu options?',
        answer:
          'Our signature salads and custom-built bowls offer the highest concentration of fresh vegetables and lean proteins.',
      },
      {
        question: 'Can I customize a meal to fit my diet?',
        answer:
          'Yes. Our Design Your Own Salad option allows you to select every ingredient to perfectly match your specific nutritional requirements.',
      },
      {
        question: 'Are your dressings made in-house?',
        answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
      },
      {
        question: 'Do you serve local ingredients?',
        answer:
          'Yes. We feature local produce including vine-ripe tomatoes from Hauula, as well as fresh, vessel-tracked local ahi.',
      },
      {
        question: 'Where can I pick up a healthy meal?',
        answer:
          'Our full menu is available to order online for fast pickup at all seven of our neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Browse our full menu to find exactly what you are looking for:',
    },
    list: {
      title: 'Our Approach to Healthy Eating',
      intro:
        'We focus on clean preparation and fresh components. Whether you are tracking your macros or just looking for a lighter lunch, our menu provides total control over your meal.',
    },
    customItems: [
      {
        title: 'Signature Salads',
        description: 'Choose from our established recipes featuring fresh greens and lean proteins.',
      },
      {
        title: 'Plant-Based Meals',
        description: 'Explore our dedicated vegan and vegetarian menus.',
      },
      {
        title: 'Design Your Own Salad',
        description:
          'Build a custom bowl. You control exactly which ingredients and dressings go into your meal to meet your specific dietary goals.',
      },
    ],
  },
  {
    slug: 'misc',
    title: 'Misc Favorites',
    meta: {
      title: 'Misc Menu Favorites | Aloha Salads Oahu',
      description:
        'Explore additional Aloha Salads favorites including avocado toast, dessert toast, acai bowls, and cookies across our Oahu locations.',
    },
    hero: {
      title: 'Misc Menu Favorites',
      content: 'Explore additional favorites and cafe-style selections from the Aloha Salads menu.',
    },
    sourcing: {
      title: 'Fresh Ingredients',
      subtitle:
        'Our additional menu favorites follow the same ingredient-first approach as our signature salads, wraps, and bowls.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer catering options.',
    },
    faqs: [
      {
        question: 'Where can I find these menu items?',
        answer:
          'Availability may vary by location. Order online or contact your neighborhood Aloha Salads to confirm what is available today.',
      },
      {
        question: 'Can I order these items online?',
        answer: 'Yes. Available items can be added to your online order for fast pickup.',
      },
      {
        question: 'Are these items available for catering?',
        answer: 'Some menu favorites may be available for group orders. Contact us to plan your catering menu.',
      },
    ],
    explore: {
      subtitle: 'Looking for something else? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Misc Menu',
    },
  },
];
