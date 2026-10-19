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
export const MENU_SUBPAGE_DEFAULTS: MenuSubpageContent[] = [
  {
    slug: 'salads',
    title: 'Signature Salads',
    meta: {
      title: 'Signature Salads & Bowls | Aloha Salads Oahu',
      description:
        'Explore our signature salads including the Ono Island Ahi and Kamuela Cobb. Built with fresh ingredients and house-made dressings across our six Oahu locations.',
    },
    hero: {
      title: 'Signature Salads',
      content:
        'Our salads are built with quality produce and seafood delivered directly to our kitchens across Oahu. Many of our signature dressings are made in house.',
    },
    sourcing: {
      title: 'Sourced with Care',
      subtitle:
        'We maintain a standing weekly order for vine-ripe tomatoes from Hauula and exclusively feature never-frozen local ahi with vessel-level catch traceability.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of priced catering trays.',
    },
    faqs: [
      {
        question: 'Can I customize my salad?',
        answer:
          'Yes. You can use the Design Your Own Salad option to choose your preferred lettuce, four regular toppings, one cheese, and one dressing.',
      },
      {
        question: 'Where does your ahi come from?',
        answer:
          'We exclusively feature never-frozen local ahi sourced through a Honolulu seafood supplier with full vessel-level traceability.',
      },
      {
        question: 'Are your salad dressings made in-house?',
        answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
      },
      {
        question: 'Do your salads contain local produce?',
        answer: 'Yes. We feature local produce including vine-ripe tomatoes grown in Hauula.',
      },
      {
        question: 'Where can I order a salad for pickup?',
        answer: 'You can order online for fast pickup at any of our six neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Looking for something else? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Salad Menu',
    },
  },
  {
    slug: 'design-your-own-salad',
    title: 'Design Your Own Salad',
    meta: {
      title: 'Build Your Own Salad | Custom Bowls | Aloha Salads Oahu',
      description:
        'Build your own salad at Aloha Salads with your choice of fresh lettuce, toppings, cheese, and house-made dressing. Order online across our six Oahu locations.',
    },
    hero: {
      title: 'Design Your Own Salad at Aloha Salads',
      content:
        'Build your own salad using our daily selection of fresh ingredients. You get to choose exactly what goes into your bowl, backed by the same quality standards we use across our six Oahu locations.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle:
        'Custom salads are built using the same high-quality components as our signature bowls, including our house-made dressings and vessel-tracked local ahi.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your custom order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
    },
    faqs: [
      {
        question: 'What is included in a custom salad?',
        answer:
          'The Design Your Own Salad option includes your choice of lettuce, four regular toppings, one cheese, and one dressing.',
      },
      {
        question: 'Can I add extra ingredients to my custom salad?',
        answer: 'Yes. You can add extra toppings, premium proteins, or additional cheese for an extra charge.',
      },
      {
        question: 'Are your dressings made in-house?',
        answer: 'Most of them, yes. Our signature dressings are made in house in small batches through the week.',
      },
      {
        question: 'Can I order a custom salad online?',
        answer: 'Yes. You can build your salad exactly how you want it through our online ordering system.',
      },
      {
        question: 'Where can I pick up my custom order?',
        answer: 'You can order ahead for fast pickup at any of our six neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Looking for one of our signature recipes or a plant-based option? Browse the rest of our menu.',
    },
    build: {
      title: 'How to Build Your Own Salad',
      subtitle: 'Includes your choice of lettuce, four regular toppings, one cheese, and one dressing.',
      note: 'Additional charge for extra toppings, premium proteins, or additional cheese.',
      ctaLabel: 'Order Online',
      steps: [
        {
          title: 'Lettuce',
          description: 'Start with your choice of greens.',
        },
        {
          title: 'Four toppings',
          description: 'Pick four regular toppings from the daily selection.',
        },
        {
          title: 'One cheese',
          description: 'Add one cheese to finish the bowl.',
        },
        {
          title: 'One dressing',
          description: 'Finish with your choice of dressing.',
        },
      ],
    },
  },
  {
    slug: 'wraps-subs',
    title: 'Wraps & Subs',
    meta: {
      title: 'Fresh Wraps & Subs | Aloha Salads Oahu',
      description:
        'Explore our hearty wraps and subs, including the Grilled Steak Wrap, Fresh Island Ahi Wrap, and Club Sub. Order online for pickup across our six Oahu locations.',
    },
    hero: {
      title: 'Wraps and Subs',
      content:
        'Our wraps and subs offer hearty, satisfying meal options built with the same high-quality ingredients and house-made dressings as our signature bowls.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle:
        'Every wrap and sub is crafted using fresh produce and premium proteins, including our vessel-tracked local ahi.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of sandwich platters.',
    },
    faqs: [
      {
        question: 'Can I choose the bread for my sub?',
        answer: 'Yes. Items like our Club Sub and Chicken Pesto Sandwich are prepared on your choice of bread.',
      },
      {
        question: 'Does the Fresh Island Ahi Wrap use local seafood?',
        answer:
          'Yes. We exclusively feature never-frozen local ahi sourced through a Honolulu seafood supplier with full vessel-level traceability.',
      },
      {
        question: 'What comes with the Grilled Cheese Soup Combo?',
        answer:
          'The combo includes a grilled cheese sandwich made with havarti, cheddar, and fresh mozzarella on sourdough bread, paired with a 6oz serving of our tomato bisque.',
      },
      {
        question: 'Are there vegetarian wrap options?',
        answer:
          'Yes. Our Hummus Pita Wrap and Caprese Sub are excellent meatless options packed with fresh vegetables and cheeses.',
      },
      {
        question: 'Where can I pick up my order?',
        answer: 'You can order online for fast pickup at any of our six neighborhood restaurants across Oahu.',
      },
    ],
    explore: {
      subtitle: 'Looking for a different option? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Wraps & Subs Menu',
    },
  },
  {
    slug: 'soups',
    title: 'Soups',
    meta: {
      title: 'Fresh Soups & Tomato Bisque | Aloha Salads Oahu',
      description:
        'Warm up with our signature thick and creamy Tomato Bisque, available daily across our six Oahu locations. Order online for fast pickup.',
    },
    hero: {
      title: 'Soups',
      content: 'Our seasonal soups are crafted to perfectly complement our signature salads and wraps.',
    },
    sourcing: {
      title: 'Quality Ingredients',
      subtitle: 'Every item on our menu is built on a foundation of quality ingredients and careful preparation.',
      ctaLabel: 'Learn More About Our Ingredients',
    },
    cta: {
      subtitle:
        'Skip the line and place your order online for fast pickup. Planning a group event? We also offer a variety of catering options.',
    },
    faqs: [
      {
        question: 'What kind of soup do you serve?',
        answer: 'We serve our signature Tomato Bisque, which is a thick and creamy classic.',
      },
      {
        question: 'Can I pair my soup with a sandwich?',
        answer:
          'Yes. You can order our Grilled Cheese Soup Combo from the Wraps and Subs menu, which includes havarti, cheddar, and fresh mozzarella on sourdough bread served alongside a 6oz portion of Tomato Bisque.',
      },
      {
        question: 'Do you offer sides with the soup?',
        answer: 'Yes. You can order an extra side of pita bread to accompany your soup.',
      },
      {
        question: 'Is the soup available at all locations?',
        answer: 'Yes. Our menu is available across all six of our neighborhood restaurants on Oahu.',
      },
      {
        question: 'Can I order soup for takeout?',
        answer: 'Yes. You can place your order online for fast pickup at your nearest location.',
      },
    ],
    explore: {
      subtitle: 'Looking to complete your meal? Browse the rest of our menu:',
    },
    list: {
      title: 'Our Soup Menu',
    },
  },
  {
    slug: 'drinks',
    title: 'Drinks',
    meta: {
      title: 'Drinks, Beverages & Local Mamaki Tea | Aloha Salads Oahu',
      description:
        'Complete your meal with our beverage selection, featuring Guava Lemonade and Big Island mamaki mint tea. Order online across our six Oahu locations.',
    },
    hero: {
      title: 'Drinks and Beverages',
      content:
        'Pair your meal with our selection of chilled beverages. We offer a variety of refreshing options available for pickup across our six Oahu locations.',
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
        answer: 'Our full beverage menu is available at our six neighborhood restaurants across Oahu.',
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
        'Discover our Keiki Combo, featuring a wholesome pita sandwich, fresh fruit, a drink, and an organic lollipop. Available across our six Oahu locations.',
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
        answer: 'Yes. Our keiki options are available across all six of our neighborhood restaurants on Oahu.',
      },
      {
        question: 'Where are your Oahu locations?',
        answer:
          'We operate six neighborhood restaurants located in Kailua, Kahala, Kaneohe, Kapolei, Mililani, and Pearlridge.',
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
        'Explore dedicated plant-based options including the Vegan Aloha Mediterranean. Order online across our six Oahu locations.',
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
        answer: 'Yes. You can order online for fast pickup at any of our six neighborhood restaurants across Oahu.',
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
        'Discover our meatless meal selections including the Aloha Passion salad, Hummus Pita Wrap, and Caprese Sub. Order online for fast pickup across our six Oahu locations.',
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
          'Our full vegetarian menu is available to order online for fast pickup at all six of our neighborhood restaurants across Oahu.',
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
        'Looking for a healthy meal? Discover fresh salads, lean proteins, and custom bowls at Aloha Salads. Order online across our six Oahu locations.',
    },
    hero: {
      title: 'Healthy Food and Menu Options',
      content:
        'Finding a healthy meal should be simple. We serve fresh, nutrient-dense bowls and wraps made from quality ingredients across our six Oahu locations.',
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
          'Our full menu is available to order online for fast pickup at all six of our neighborhood restaurants across Oahu.',
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
