import type { CateringSubpageContent } from './types';

/** Catering occasion pages, part 1. Combined in `cateringDefaults.ts`. */
export const CATERING_SUBPAGES_A: CateringSubpageContent[] = [
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
];
