import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'sourcing', title: 'What we source' },
  { name: 'cta', title: 'Closing banner' },
  { name: 'faqs', title: 'FAQs' },
  { name: 'images', title: 'Images' },
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

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group: 'images',
    description,
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
  });

export const ingredientsContent = defineType({
  name: 'ingredientsContent',
  title: 'Ingredients',
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
    textField('hero', 'heroContent', 'Intro text', { rows: 4 }),
    textField('hero', 'heroPrimaryCtaLabel', 'Primary button label', { description: 'Links to the menu.' }),
    textField('hero', 'heroSecondaryCtaLabel', 'Secondary button label', { description: 'Links to Locations.' }),

    // ── Sourcing ──
    textField('sourcing', 'sourcingEyebrow', 'Eyebrow', { description: 'Small label above the first (large) card.' }),
    defineField({
      name: 'facts',
      title: 'Sourcing cards',
      group: 'sourcing',
      description:
        'The first card is shown large. Leave a blank line to start a new paragraph; **double asterisks** make bold.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sourcingFact',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'description',
              title: 'Text',
              type: 'text',
              rows: 5,
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'description' } },
        }),
      ],
    }),

    // ── CTA ──
    textField('cta', 'ctaTitle', 'Heading'),
    textField('cta', 'ctaSubtitle', 'Text', { rows: 3 }),

    // ── FAQs ──
    textField('faqs', 'faqTitle', 'Section heading'),
    defineField({
      name: 'faqs',
      title: 'Questions',
      group: 'faqs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqItem' })],
    }),

    // ── Images ──
    imageField('heroImage', 'Hero image', 'Hero image for the ingredients page.'),
    imageField(
      'freshLocalProduceImage',
      'Fresh Local Produce image',
      'Image beside the Fresh Local Produce sourcing section.'
    ),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return { title: 'Ingredients', subtitle: 'Ingredients page', media };
    },
  },
});
