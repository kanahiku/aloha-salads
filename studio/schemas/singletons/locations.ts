import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'directory', title: 'Store list' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'cta', title: 'Closing banner' },
  { name: 'shared', title: 'Shared with store pages' },
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

/** Locations hub page (/locations). Each store is its own document — see Locations → <store> in the sidebar. */
export const locationsContent = defineType({
  name: 'locationsContent',
  title: 'Locations',
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
    textField('hero', 'heroTitle', 'Headline', { description: 'Press Enter for a line break.', rows: 2 }),
    textField('hero', 'heroContent', 'Intro text', { rows: 4 }),
    defineField({
      name: 'directoryImage',
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

    // ── Store list ──
    textField('directory', 'directoryTitle', 'Heading', {
      description: 'The store cards come from the store pages (Locations → each store).',
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
    textField('cta', 'ctaTitle', 'Heading'),
    textField('cta', 'ctaSubtitle', 'Text', { rows: 3 }),

    // ── Shared ──
    textField('shared', 'sharedHeroPrimaryCtaLabel', 'Hero primary button', {
      description: 'Used in the hero of this page and every store page. Links to online ordering.',
    }),
    textField('shared', 'sharedHeroSecondaryCtaLabel', 'Hero secondary button', { description: 'Links to catering.' }),
    textField('shared', 'sharedVisitTitle', 'Store page — details heading', {
      description: 'The heading above the address, hours and map.',
    }),
    textField('shared', 'sharedPickupLabel', 'Store page — pickup button'),
    textField('shared', 'sharedDeliveryLabel', 'Store page — delivery button'),
    textField('shared', 'sharedDirectionsLabel', 'Store page — directions button'),
    textField('shared', 'sharedMoreTitle', 'Store page — "other locations" heading'),
    textField('shared', 'sharedMoreSubtitle', 'Store page — "other locations" text', { rows: 2 }),
    textField('shared', 'sharedViewLabel', 'Store card link label', {
      description: 'The "View Location" link on each store card.',
    }),
    textField('shared', 'sharedFaqTitle', 'FAQ section heading'),
  ],
  preview: {
    select: { media: 'directoryImage' },
    prepare({ media }) {
      return { title: 'Locations', subtitle: 'Locations page (the six stores are listed inside)', media };
    },
  },
});
