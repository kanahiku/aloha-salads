import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'benefits', title: 'Benefits' },
  { name: 'application', title: 'Application form' },
  { name: 'cta', title: 'Ready to order' },
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

export const careersContent = defineType({
  name: 'careersContent',
  title: 'Careers',
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
    textField('hero', 'heroTitle', 'Headline'),
    textField('hero', 'heroContent', 'Intro text', { rows: 6 }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      group: 'hero',
      description: 'Shown beside the headline.',
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

    // ── Benefits ──
    textField('benefits', 'benefitsHeading', 'Heading'),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      group: 'benefits',
      description: 'One entry per benefit.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),

    // ── Application form ──
    textField('application', 'applyTitle', 'Form heading', {
      description: 'The form fields, buttons and confirmation messages are fixed.',
    }),

    // ── CTA ──
    textField('cta', 'ctaTitle', 'Heading'),
    textField('cta', 'ctaSubtitle', 'Text', { rows: 3 }),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return { title: 'Careers', subtitle: 'Work with Us page', media };
    },
  },
});
