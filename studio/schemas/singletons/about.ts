import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { altField, imageWeightWarning } from '../lib/imageChecks';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'mission', title: 'Our Mission' },
  { name: 'story', title: 'Our Story' },
  { name: 'founder', title: 'Founder Story' },
  { name: 'sustainability', title: 'Sustainability' },
  { name: 'vendors', title: 'Our Vendors' },
  { name: 'cta', title: 'Find a Location' },
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

const paragraphs = (group: string, name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group,
    description:
      description ??
      'One entry per paragraph. The first paragraph is shown larger as the lead. Wrap words in **double asterisks** to make them bold.',
    type: 'array',
    of: [defineArrayMember({ type: 'text', rows: 4 })],
    validation: (r) => r.min(1),
  });

const imageField = (group: string, name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    group,
    description,
    type: 'image',
    validation: imageWeightWarning,
    options: { hotspot: true },
    fields: [altField()],
  });

export const aboutContent = defineType({
  name: 'aboutContent',
  title: 'About',
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
    textField('hero', 'heroSubtitle', 'Subtitle', { description: 'Line shown under the headline.' }),
    textField('hero', 'heroContent', 'Intro text', { rows: 3 }),
    textField('hero', 'heroPrimaryCtaLabel', 'Primary button label', { description: 'Links to the menu.' }),
    textField('hero', 'heroSecondaryCtaLabel', 'Secondary button label', { description: 'Links to Locations.' }),

    // ── Mission ──
    textField('mission', 'missionHeading', 'Heading'),
    textField('mission', 'missionQuote', 'Mission statement', {
      description: 'Shown as a quote — do not type the quotation marks.',
      rows: 4,
    }),
    textField('mission', 'missionBody', 'Supporting line', { rows: 2 }),

    // ── Story ──
    textField('story', 'storyHeading', 'Heading'),
    paragraphs('story', 'storyParagraphs', 'Story'),
    textField('story', 'storyNote', 'Small italic note', {
      description: 'Optional line shown under the story. Leave empty to hide it.',
    }),

    // ── Founder Story ──
    textField('founder', 'founderHeading', 'Heading'),
    textField('founder', 'founderTagline', 'Tagline', { description: 'Italic line under the heading.' }),
    paragraphs('founder', 'founderParagraphs', 'Story', 'One entry per paragraph.'),
    defineField({
      name: 'founderQuotes',
      title: 'Quotes',
      group: 'founder',
      description: 'Family quotes shown under the story. Do not type the quotation marks.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'founderQuote',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (r) => r.required() }),
            defineField({ name: 'attribution', title: 'Name', type: 'string' }),
          ],
          preview: { select: { title: 'attribution', subtitle: 'quote' } },
        }),
      ],
    }),
    textField('founder', 'founderClosing', 'Closing line', { rows: 2 }),

    // ── Sustainability ──
    textField('sustainability', 'sustainabilityHeading', 'Heading'),
    paragraphs('sustainability', 'sustainabilityParagraphs', 'Text'),
    textField('sustainability', 'sustainabilityNote', 'Small italic note', {
      description: 'Optional line shown under the text. Leave empty to hide it.',
    }),
    textField('sustainability', 'sustainabilityCtaLabel', 'Button label', { description: 'Links to Ingredients.' }),

    // ── Vendors ──
    textField('vendors', 'vendorsHeading', 'Heading'),
    paragraphs('vendors', 'vendorsParagraphs', 'Text'),
    textField('vendors', 'vendorsCtaLabel', 'Button label', { description: 'Links to Ingredients.' }),

    // ── CTA ──
    textField('cta', 'ctaTitle', 'Heading'),
    textField('cta', 'ctaSubtitle', 'Text', { rows: 2 }),

    // ── Images (each sits in the tab of the section it appears in) ──
    imageField('hero', 'heroImage', 'Hero image', 'About page hero image.'),
    imageField('story', 'storyImage', 'Our Story image', 'Image beside the Our Story section.'),
    imageField(
      'sustainability',
      'sustainabilityImage',
      'Sustainability image',
      'Image beside the Sustainability section.'
    ),
    imageField('vendors', 'vendorsImage', 'Our Vendors image', 'Image beside the Our Vendors section.'),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return { title: 'About', subtitle: 'About page', media };
    },
  },
});
