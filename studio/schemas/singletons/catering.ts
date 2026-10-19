import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'pricing', title: 'Menu & pricing' },
  { name: 'occasions', title: 'By occasion' },
  { name: 'cta', title: 'Ready to order' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'shared', title: 'Shared with sub-pages' },
];

const textField = (group: string, name: string, title: string, options: { description?: string; rows?: number } = {}) =>
  defineField({
    name,
    title,
    group,
    description: options.description,
    type: options.rows ? 'text' : 'string',
    ...(options.rows ? { rows: options.rows } : {}),
  });

/** Catering main page. The seven occasion sub-pages are separate documents (Catering → …). */
export const cateringContent = defineType({
  name: 'cateringContent',
  title: 'Catering',
  type: 'document',
  icon: DocumentTextIcon,
  groups: GROUPS,
  fields: [
    // ── SEO ──
    textField('seo', 'metaTitle', 'Page title', {
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
    }),
    textField('seo', 'metaDescription', 'Meta description', {
      description: 'Search result snippet. Aim for 140–160 characters.',
      rows: 3,
    }),

    // ── Hero ──
    textField('hero', 'heroTagline', 'Tagline', { description: 'Small line above the headline.' }),
    textField('hero', 'heroTitle', 'Headline'),
    textField('hero', 'heroContent', 'Intro text', { rows: 3 }),
    defineField({
      name: 'menuImage',
      title: 'Hero image',
      group: 'hero',
      description: 'Hero image for the main catering page.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (r) => r.required().warning('Describe the image for accessibility and SEO.'),
        }),
      ],
    }),

    // ── Menu & pricing ──
    textField('pricing', 'pricingTitle', 'Heading'),
    textField('pricing', 'pricingIntro', 'Intro text', { rows: 2 }),
    textField('pricing', 'orderingTitle', 'Ordering details — heading'),
    textField('pricing', 'orderingText', 'Ordering details — text', { rows: 4 }),
    defineField({
      name: 'trays',
      title: 'Trays',
      group: 'pricing',
      description: 'The tray cards, in the order shown on the page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cateringTray',
          title: 'Tray',
          fields: [
            defineField({ name: 'name', title: 'Tray name', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Include the currency symbol, for example $42.',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'name', subtitle: 'price', media: 'image' } },
        }),
      ],
    }),

    // ── By occasion ──
    textField('occasions', 'occasionsEyebrow', 'Eyebrow'),
    textField('occasions', 'occasionsTitle', 'Heading'),
    textField('occasions', 'occasionsIntro', 'Intro text', {
      description:
        'The cards below this text come from the sub-pages (Catering → each page → "Card on the Catering page").',
      rows: 3,
    }),
    textField('occasions', 'occasionsLinkLabel', 'Card link label', { description: 'The small "Learn more" link.' }),

    // ── CTA ──
    textField('cta', 'ctaSubtitle', 'Text', {
      description: 'The heading ("Ready to Order?") is shared — see "Shared with sub-pages".',
      rows: 3,
    }),

    // ── FAQs ──
    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    // ── Shared ──
    textField('shared', 'sharedOrderLabel', 'Order button label', {
      description: 'Used on this page and on every catering sub-page.',
    }),
    textField('shared', 'sharedMenuLabel', '"View full menu" button label', {
      description: 'Used in the hero of every sub-page.',
    }),
    textField('shared', 'sharedLocationLabel', '"Find a location" button label'),
    textField('shared', 'sharedReadyTitle', '"Ready to order" heading'),
    textField('shared', 'sharedFaqTitle', 'FAQ section heading'),
    textField('shared', 'sharedSubNavEyebrow', '"More options" eyebrow'),
    textField('shared', 'sharedSubNavTitle', '"More options" heading'),
    textField('shared', 'sharedSubNavSubtitle', '"More options" text', { rows: 2 }),
  ],
  preview: {
    select: { media: 'menuImage' },
    prepare({ media }) {
      return { title: 'Catering', subtitle: 'Main page', media };
    },
  },
});
