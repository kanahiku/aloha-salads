import { DocumentTextIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * A simple page: heading, intro, then optional sections of text, lists and links
 * (Gift Cards, Nutrition & Allergens). One document per page, listed in the Studio sidebar.
 * The document ID is fixed (`singleton-interior-<slug>`) — a new page also needs a route in the site code.
 */
export const interiorPage = defineType({
  name: 'interiorPage',
  title: 'Simple page',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'content', title: 'Content' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'URL',
      group: 'seo',
      description: 'Fixed — set by the site code.',
      type: 'string',
      readOnly: true,
    }),
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
    defineField({
      name: 'heading',
      title: 'Headline',
      group: 'content',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'lede', title: 'Intro text', group: 'content', type: 'text', rows: 4 }),
    defineField({
      name: 'sections',
      title: 'Sections',
      group: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'interiorSection',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'body', title: 'Text', type: 'text', rows: 4 }),
            defineField({
              name: 'items',
              title: 'List',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'interiorItem',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
                    defineField({ name: 'description', title: 'Text', type: 'text', rows: 2 }),
                  ],
                  preview: { select: { title: 'title', subtitle: 'description' } },
                }),
              ],
            }),
            defineField({
              name: 'links',
              title: 'Buttons',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'interiorLink',
                  fields: [
                    defineField({ name: 'text', title: 'Label', type: 'string', validation: (r) => r.required() }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                      description: 'A page on this site (/menu) or a full web address.',
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: { select: { title: 'text', subtitle: 'href' } },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'body' },
            prepare: ({ title, subtitle }) => ({ title: title || 'Section', subtitle }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'slug' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? `/${subtitle}` : '' }),
  },
});
