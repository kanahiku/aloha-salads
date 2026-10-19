import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'cards', title: 'Cards' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'cta', title: 'Ready to order' },
  { name: 'listing', title: 'Catering page card' },
];

/**
 * One document per catering occasion page (corporate, meetings, …). The document ID is fixed
 * (`singleton-catering-<slug>`) and listed in the Studio sidebar under Catering — do not create
 * more from the "+" menu, a new page also needs a route in the site code.
 */
export const cateringSubpage = defineType({
  name: 'cateringSubpage',
  title: 'Catering sub-page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'slug',
      title: 'URL',
      group: 'seo',
      description: 'Fixed — set by the site code (/catering/<this>).',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      group: 'listing',
      description: 'Position in the "More catering options" list (1 = first).',
      type: 'number',
      validation: (r) => r.required().integer().min(1),
    }),

    // ── SEO ──
    defineField({
      name: 'metaTitle',
      title: 'Page title',
      group: 'seo',
      description: 'Shown in the browser tab and search results. Aim for under 60 characters.',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      group: 'seo',
      description: 'Search result snippet. Aim for 140–160 characters.',
      type: 'text',
      rows: 3,
    }),

    // ── Hero ──
    defineField({
      name: 'title',
      title: 'Headline',
      group: 'hero',
      description: 'Also the name used in "More catering options" and on the Catering page card.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'heroContent', title: 'Intro text', group: 'hero', type: 'text', rows: 4 }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      group: 'hero',
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

    // ── Cards ──
    defineField({
      name: 'occasions',
      title: 'Cards',
      group: 'cards',
      description: 'The numbered cards (01, 02, …). Numbers are added automatically.',
      type: 'array',
      of: [defineArrayMember({ type: 'occasionCard' })],
    }),

    // ── FAQs ──
    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    // ── CTA ──
    defineField({
      name: 'ctaSubtitle',
      title: 'Text',
      group: 'cta',
      description: 'The heading and buttons are shared — edit them under Catering → "Shared with sub-pages".',
      type: 'text',
      rows: 3,
    }),

    // ── Listing ──
    defineField({
      name: 'showOnCateringPage',
      title: 'Show on the Catering page',
      group: 'listing',
      description: 'Adds a card for this page to the "Catering for Every Occasion" grid on the main Catering page.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card text',
      group: 'listing',
      type: 'text',
      rows: 2,
      hidden: ({ document }) => !document?.showOnCateringPage,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `/catering/${subtitle}` : '', media };
    },
  },
});
