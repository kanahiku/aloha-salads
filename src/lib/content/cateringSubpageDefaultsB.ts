import type { CateringSubpageContent } from './types';

/** Catering occasion pages, part 2. Combined in `cateringDefaults.ts`. */
export const CATERING_SUBPAGES_B: CateringSubpageContent[] = [
  {
    slug: 'events',
    order: 4,
    title: 'Event Catering',
    meta: {
      title: 'Event Catering Oahu | Large Gatherings & Banquets | Aloha Salads',
      description:
        'Order fresh event catering for your gathering. We prepare salad trays, wrap platters, fresh soups, and beverages for pickup across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh food for your next gathering. We prepare large-format catering trays and wrap platters for events of all sizes. All event orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Community Gatherings',
        description:
          'Feed your crowd with fresh and healthy meals. Our signature salad trays and wrap platters provide a fresh alternative to heavy event food for local gatherings.',
      },
      {
        title: 'Private Functions',
        description:
          'Serve a quality menu at your family reunion or banquet. We offer scaled-up versions of our signature items designed to accommodate large groups easily.',
      },
      {
        title: 'Accommodating Every Diet',
        description:
          'Ensure every guest has a meal they can enjoy. We provide dedicated vegetarian options and plant-based trays to meet the dietary requirements of your attendees.',
      },
      {
        title: 'Quality Event Food',
        description:
          'A catering tray is our standard menu in a bigger format. Signature dressings and vine-ripe Hauula tomatoes throughout.',
      },
    ],
    faqs: [
      {
        question: 'How far in advance should I order for a large event?',
        answer: 'Please contact your nearest location to confirm the required lead time for your specific event size.',
      },
      {
        question: 'Do you provide serving utensils for events?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'Can I customize event catering trays?',
        answer:
          'Yes. We can modify our catering trays to accommodate specific dietary requirements for your event guests.',
      },
      {
        question: 'Do you offer meatless event catering options?',
        answer:
          'Yes. We prepare dedicated plant-based items including the Aloha Mediterranean Tray and the Aloha Passion Tray.',
      },
      {
        question: 'Where do I pick up my event catering order?',
        answer: 'You can pick up your catering order at any of our six neighborhood restaurants across Oahu.',
      },
    ],
    ctaSubtitle: 'Order online for pickup. For a large event, call the store to talk through quantities and timing.',
    cardDescription: 'Custom salad and wrap trays built for special events.',
    showOnCateringPage: true,
  },
  {
    slug: 'parties',
    order: 5,
    title: 'Party Catering',
    meta: {
      title: 'Party Catering Oahu | Birthdays, Graduations & Showers | Aloha Salads',
      description:
        'Order fresh party catering for your next event. We provide salad trays and wrap platters for birthdays, graduations, baby showers, and sports banquets across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh food for your next celebration. We prepare large-format catering trays and wrap platters for parties of all sizes. All party orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Birthday Party Catering',
        description:
          'Serve fresh options at your next birthday gathering. Our sandwich platters and signature salad trays provide easy meals for guests with varying dietary preferences.',
      },
      {
        title: 'Graduation Party Catering',
        description:
          'Celebrate your graduate with a fresh menu. We offer scaled-up versions of our signature items designed to feed large crowds during graduation season.',
      },
      {
        title: 'Shower Catering',
        description:
          'Our fresh salads provide a light menu option for baby showers and bridal showers. We can customize your order to include dedicated vegetarian or vegan platters, such as our Aloha Passion Tray.',
      },
      {
        title: 'Sports Team Catering',
        description:
          'Provide fresh food for your athletes. Our catering trays offer lean protein and fresh vegetables for post-game meals or end-of-season banquets.',
      },
    ],
    faqs: [
      {
        question: 'Can I order vegetarian trays for a party?',
        answer: 'Yes. The Aloha Passion Tray and Aloha Mediterranean Tray are both meatless.',
      },
      {
        question: 'Do you provide plates and napkins for parties?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'How far in advance should I order for a large party?',
        answer: 'Please contact your nearest location to confirm the required lead time for your specific party size.',
      },
      {
        question: 'Can I pick up a party order at the weekend?',
        answer: 'Weekend collection is available. Check your stores hours and call ahead to arrange the time.',
      },
      {
        question: 'Do you offer beverages for party catering?',
        answer:
          'Yes. You can add bottled drinks and our refreshing Big Island māmaki mint tea to complete your party menu.',
      },
    ],
    ctaSubtitle:
      'Order online for pickup. Call your nearest store if you want to talk through numbers for a bigger party.',
    cardDescription: '',
    showOnCateringPage: false,
  },
  {
    slug: 'schools',
    order: 6,
    title: 'School Catering',
    meta: {
      title: 'School Catering Oahu | Teachers & Athletics | Aloha Salads',
      description:
        'Order fresh school catering for your campus. We prepare salad trays, wrap platters, fresh soups, and beverages for pickup across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh food for your campus. We prepare large-format catering trays and wrap platters for school events and faculty lunches. All school orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Faculty and Staff Lunches',
        description:
          'Keep your teachers going with healthy meals. Our signature salad trays provide a fresh alternative to heavy breakroom food during teacher appreciation days or planning sessions.',
      },
      {
        title: 'Athletic Team Meals',
        description:
          'Provide quality fuel for your student-athletes. Our catering trays offer lean protein and fresh vegetables for pre-game meals or end-of-season banquets.',
      },
      {
        title: 'Accommodating Every Diet',
        description:
          'Ensure every student and faculty member has a meal. We provide dedicated vegetarian options and plant-based trays to meet diverse dietary requirements across your campus.',
      },
      {
        title: 'Quality Ingredients',
        description:
          'Campus orders come off the same line as everything else, with our signature dressings and vine-ripe Hauʻula tomatoes.',
      },
    ],
    faqs: [
      {
        question: 'How far in advance should I order for a school event?',
        answer:
          'Please contact your nearest location to confirm the required lead time for your specific campus headcount.',
      },
      {
        question: 'Are serving utensils included for school orders?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'Do you offer meatless options for students and staff?',
        answer:
          'Yes. We prepare dedicated plant-based items including the Aloha Mediterranean Tray and the Aloha Passion Tray.',
      },
      {
        question: 'Can we accommodate specific food allergies?',
        answer:
          'Yes. We can modify our catering trays to accommodate specific dietary requirements for your school group.',
      },
      {
        question: 'Do you provide drinks for school catering?',
        answer:
          'Yes. You can include bottled beverages and our refreshing Big Island māmaki mint tea with your catering order.',
      },
    ],
    ctaSubtitle: 'Order online for pickup. For campus-sized orders, call the store to sort timing and quantities.',
    cardDescription: '',
    showOnCateringPage: false,
  },
  {
    slug: 'large-groups',
    order: 7,
    title: 'Large Group Catering',
    meta: {
      title: 'Large Group Catering Oahu | Salads & Wraps | Aloha Salads',
      description:
        'Order fresh catering for your large group. We prepare salad trays, wrap platters, fresh soups, and beverages for pickup across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh food for your large gathering. We prepare large-format catering trays and wrap platters for groups of all sizes. All large group orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Flexible Menu Options',
        description:
          'Feed your crowd with fresh, healthy meals. Our signature salad trays and sandwich platters offer easy sharing for big groups with varying tastes.',
      },
      {
        title: 'Dietary Accommodations',
        description:
          'Ensure every guest has a meal they can enjoy. We provide dedicated vegetarian options and plant-based trays to meet diverse dietary requirements within your large group.',
      },
      {
        title: 'Same Ingredients, Bigger Trays',
        description:
          'Scaling up does not change what goes in. Signature dressings, vine-ripe Hauula tomatoes, never-frozen local ahi.',
      },
      {
        title: 'Seamless Pickup',
        description:
          'We package large orders efficiently so you can transport your food safely. You can retrieve your catering trays from any of our six neighborhood restaurants.',
      },
    ],
    faqs: [
      {
        question: 'How much notice is required for a large group order?',
        answer: 'Please contact your nearest location to confirm the required lead time for your specific headcount.',
      },
      {
        question: 'How do I calculate serving sizes for a large crowd?',
        answer:
          'Please contact your nearest location to confirm specific serving sizes and tray yields based on your total guest count.',
      },
      {
        question: 'Are serving utensils included for large orders?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'Can I order meatless options for a large group?',
        answer:
          'Yes. We prepare dedicated plant-based items including the Aloha Mediterranean Tray and the Aloha Passion Tray.',
      },
      {
        question: 'Do you provide drinks for large group catering?',
        answer:
          'Yes. You can include bottled beverages and our refreshing Big Island mamaki mint tea with your catering order.',
      },
    ],
    ctaSubtitle:
      'Order online for pickup. Call the store first on anything over a few trays so we can plan it properly.',
    cardDescription: 'Scaled-up trays and platters for big gatherings across Oahu.',
    showOnCateringPage: true,
  },
];
