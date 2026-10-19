import type { CateringMainContent, CateringSubpageContent } from './types';

/**
 * Catering copy as originally approved.
 *
 * Two jobs:
 *  1. Seed source — `npm run seed:catering` writes these into Sanity.
 *  2. Safety net — if Sanity is unreachable, the pages still render this copy instead of going blank.
 *
 * Sanity is the source of truth. Edit copy in the Studio (Catering), not here.
 */
export const CATERING_MAIN_DEFAULTS: CateringMainContent = {
  meta: {
    title: 'Catering Menu & Party Trays | Aloha Salads Oahu',
    description:
      'Order fresh catering trays for your next event. View our full catering menu with pricing, including our Sandwich Platter and Ono Island Ahi Tray.',
  },
  hero: {
    tagline: 'Order Now',
    title: 'Catering Menu',
    content:
      'Provide fresh meals for your next gathering with our catering trays. We prepare scaled-up versions of our signature salads and wraps for pickup across our six Oahu locations.',
  },
  pricing: {
    title: 'Catering Menu and Pricing',
    intro: 'Our trays are built using the same high-quality components as our standard menu.',
    orderingTitle: 'Ordering Details',
    orderingText:
      'Please contact your nearest location to confirm serving sizes per tray, minimum order requirements, and necessary lead times for large groups. Delivery availability and radius vary by restaurant.',
  },
  trays: [
    {
      name: 'Sandwich Platter',
      price: '$85',
    },
    {
      name: 'Ono Island Ahi Tray',
      price: '$60',
    },
    {
      name: 'Kamuela Cobb Tray',
      price: '$55',
    },
    {
      name: 'Mandarin Ginger Tray',
      price: '$52',
    },
    {
      name: 'Aloha Caesar with Chicken Tray',
      price: '$45',
    },
    {
      name: 'Aloha Passion Tray',
      price: '$42',
    },
    {
      name: 'Aloha Mediterranean Tray',
      price: '$42',
    },
    {
      name: 'The Paniolo Tray',
      price: '$42',
    },
    {
      name: 'Tray of Pita Bread',
      price: '$24',
    },
  ],
  occasions: {
    eyebrow: 'By occasion',
    title: 'Catering for Every Occasion',
    intro:
      'We accommodate groups of all sizes across different event types. Select your event category below to learn more:',
    linkLabel: 'Learn more',
  },
  cta: {
    subtitle:
      'Order online for pickup at any of our six Oahu stores. For serving sizes, minimums or lead times, call the store you want to collect from.',
  },
  faqs: [
    {
      question: 'Do you offer vegetarian catering options?',
      answer: 'Yes. We prepare meatless options including the Aloha Passion Tray and Aloha Mediterranean Tray.',
    },
    {
      question: 'Does catering include serving utensils?',
      answer: 'Ask the store when you order and they will let you know what is included.',
    },
    {
      question: 'How do I place a catering order?',
      answer:
        'You can place your catering order directly through our online ordering system or by calling your nearest location.',
    },
    {
      question: 'Can I customize the catering trays?',
      answer: 'Trays are built to set recipes. Call the store to talk through anything specific.',
    },
    {
      question: 'Where do I pick up my catering order?',
      answer: 'You can pick up your catering order at any of our six neighborhood restaurants across Oahu.',
    },
  ],
  shared: {
    orderLabel: 'Order Catering Online',
    menuLabel: 'View Full Catering Menu',
    locationLabel: 'Find a Location',
    readyTitle: 'Ready to Order?',
    faqTitle: 'Frequently Asked Questions',
    subNavEyebrow: 'Explore more',
    subNavTitle: 'More Catering Options',
    subNavSubtitle: 'We provide catering services for various event types. Explore our other catering menus below:',
  },
};

/** Display order matches "More catering options". */
export const CATERING_SUBPAGE_DEFAULTS: CateringSubpageContent[] = [
  {
    slug: 'corporate',
    order: 1,
    title: 'Corporate Catering',
    meta: {
      title: 'Corporate Catering Oahu | Seminars & Events | Aloha Salads',
      description:
        'Order fresh corporate catering for your Oahu business. We prepare salad trays and wrap platters for seminars, training days, client presentations, and company milestones.',
    },
    heroContent:
      'Provide fresh meals for your next business event. We prepare large-format catering trays and wrap platters designed for corporate groups. All corporate orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Seminars and Conferences',
        description:
          'Keep your attendees focused with light, fresh meals. Our signature salad trays provide a light, fresh alternative to heavy corporate event food.',
      },
      {
        title: 'Client Presentations',
        description:
          'Serve a professional meal during your next client pitch. Our sandwich platters and custom wrap trays offer easy, handheld options that allow your meeting to continue uninterrupted.',
      },
      {
        title: 'Employee Appreciation',
        description:
          'Reward your team with high-quality ingredients. The trays are the same food we serve over the counter, just scaled up. Signature dressings, vine-ripe Hauula tomatoes, never-frozen local ahi.',
      },
      {
        title: 'Company Milestones',
        description:
          'Celebrate your organizational achievements with a fresh menu. We offer scaled-up versions of our signature items to feed your entire department or branch.',
      },
    ],
    faqs: [
      {
        question: 'Do you provide corporate catering for multiple days?',
        answer: 'Yes. We can schedule pickup orders for multi-day seminars and training events.',
      },
      {
        question: 'Can I accommodate vegetarian and vegan employees?',
        answer: 'Yes. We prepare dedicated plant-based options including the meatless Aloha Passion Tray.',
      },
      {
        question: 'Are serving utensils included for office setups?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'How do I request an invoice for corporate billing?',
        answer:
          'Please contact your nearest location directly to discuss payment options and receipt requirements for your accounting department.',
      },
      {
        question: 'Can we add individual drinks to a corporate order?',
        answer:
          'Yes. You can include bottled beverages and our refreshing Big Island mamaki mint tea with your catering trays.',
      },
    ],
    ctaSubtitle:
      'Order online for pickup. For anything about timing or quantities on a big corporate order, call the store direct.',
    cardDescription: 'Fresh trays for client meetings, team events, and office gatherings.',
    showOnCateringPage: true,
  },
  {
    slug: 'office-lunches',
    order: 2,
    title: 'Office Lunch Catering',
    meta: {
      title: 'Office Lunch Catering Oahu | Team Meals | Aloha Salads',
      description:
        'Order fresh office lunch catering for your team. We prepare salad trays, wrap platters, fresh soups, and beverages for pickup across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh meals for your coworkers. We prepare scaled-up versions of our signature salads and wraps for daily team lunches. All office catering orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Team Lunch Platters',
        description:
          'Keep your team energized with our fresh options. Our sandwich platters and signature salad trays offer easy sharing for breakroom lunches and casual Friday meals.',
      },
      {
        title: 'Accommodating Every Diet',
        description:
          'Offices have diverse dietary requirements. We provide dedicated vegetarian options and plant-based trays to ensure everyone on your team has a meal they can enjoy.',
      },
      {
        title: 'Built From Our Daily Menu',
        description:
          'We build every catering tray using the same quality components as our daily menu. This includes our signature dressings and fresh Hauula tomatoes.',
      },
      {
        title: 'Reliable Office Meals',
        description:
          'Skip the heavy takeout. Our fresh salads offer a lighter alternative that keeps your team productive throughout the afternoon.',
      },
    ],
    faqs: [
      {
        question: 'How much food do I need for my office?',
        answer:
          'Please contact your nearest location to confirm specific serving sizes and tray yields for your headcount.',
      },
      {
        question: 'Does office catering include serving utensils?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'Can I accommodate vegetarian coworkers?',
        answer:
          'Yes. We prepare dedicated meatless options including the Aloha Mediterranean Tray and the Aloha Passion Tray.',
      },
      {
        question: 'Can we add drinks to our office lunch order?',
        answer:
          'Yes. You can include bottled beverages and our refreshing Big Island mamaki mint tea to complete your team meal.',
      },
      {
        question: 'Can individuals customize their own bowls?',
        answer:
          'Our large catering trays are built to set recipes. Employees who need highly specific modifications can use our Design Your Own Salad option through individual ordering.',
      },
    ],
    ctaSubtitle: 'Order online for pickup. Not sure how many trays you need for the team? Call your nearest store.',
    cardDescription: 'Healthy lunch options delivered to your workplace.',
    showOnCateringPage: true,
  },
  {
    slug: 'meetings',
    order: 3,
    title: 'Meeting Catering',
    meta: {
      title: 'Meeting Catering Oahu | Boardroom Meals | Aloha Salads',
      description:
        'Order fresh meeting catering for your business. We prepare salad trays, wrap platters, fresh soups, and beverages for pickup across our six Oahu locations.',
    },
    heroContent:
      'Provide fresh food for your next business discussion. We prepare large-format catering trays and wrap platters for board meetings and planning sessions. All meeting orders are available for pickup across our six Oahu locations.',
    occasions: [
      {
        title: 'Working Lunches',
        description:
          'Keep your agenda moving. Our handheld wrap platters and signature salad trays offer easy meals that allow your team to work through the lunch hour uninterrupted.',
      },
      {
        title: 'Boardroom Presentations',
        description:
          'Serve high-quality ingredients to your board members or clients. Nothing changes for a catering order. Same signature dressings, same produce, same ahi.',
      },
      {
        title: 'Morning Huddles',
        description:
          'Start your strategy sessions with something lighter. Our catering options provide a fresh alternative to heavy baked goods or fried foods.',
      },
      {
        title: 'Accommodating Every Diet',
        description:
          'Ensure every attendee has a meal. We provide dedicated vegetarian options and plant-based trays for your meeting guests.',
      },
    ],
    faqs: [
      {
        question: 'How much notice is required for a morning meeting?',
        answer: 'Please contact your nearest location to confirm specific lead times for early pickup orders.',
      },
      {
        question: 'Are serving utensils included for boardrooms?',
        answer: 'Ask the store when you order and they will let you know what is included.',
      },
      {
        question: 'Can I provide meatless options for my attendees?',
        answer:
          'Yes. We prepare dedicated plant-based items including the Aloha Mediterranean Tray and the Aloha Passion Tray.',
      },
      {
        question: 'How much food do I need for a board meeting?',
        answer:
          'Please contact your nearest location to confirm specific serving sizes and tray yields based on your total headcount.',
      },
      {
        question: 'Can I add individual drinks to the meeting order?',
        answer:
          'Yes. You can include bottled beverages and our refreshing Big Island mamaki mint tea to complete your boardroom setup.',
      },
    ],
    ctaSubtitle: 'Order online for pickup. If you need an early collection, call the store first to check timings.',
    cardDescription: 'Nourish your team with wholesome food during any size meeting.',
    showOnCateringPage: true,
  },
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
