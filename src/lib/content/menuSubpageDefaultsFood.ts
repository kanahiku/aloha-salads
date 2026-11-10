import type { MenuSubpageContent } from './types';

/** Menu category pages, part 1 (sidebar order). Combined in `menuDefaults.ts`. */
export const MENU_SUBPAGES_FOOD: MenuSubpageContent[] = [
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
];
