import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const GROUPS = [
  { name: 'seo', title: 'SEO' },
  { name: 'hero', title: 'Hero' },
  { name: 'mission', title: 'Our Mission' },
  { name: 'story', title: 'Our Story' },
  { name: 'sustainability', title: 'Sustainability' },
  { name: 'vendors', title: 'Our Vendors' },
  { name: 'cta', title: 'Find a Location' },
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

    // ── Images ──
    imageField('heroImage', 'Hero image', 'About page hero image.'),
    imageField('storyImage', 'Our Story image', 'Image beside the Our Story section.'),
    imageField('sustainabilityImage', 'Sustainability image', 'Image beside the Sustainability section.'),
    imageField('vendorsImage', 'Our Vendors image', 'Image beside the Our Vendors section.'),
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return { title: 'About', subtitle: 'About page', media };
    },
  },
});
