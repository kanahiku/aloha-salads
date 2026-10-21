import { defineArrayMember, defineField, defineType } from 'sanity';
import { ComposeIcon } from '@sanity/icons';
import { relatedPageOptions } from '../objects/relatedPageOptions';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'related', title: 'Related pages' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Used in the URL: /blog/your-slug. Publish to make the article live — no code deploy needed.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on listing cards and related-blog sections.',
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'seo',
      description: 'Browser tab and search result title. Leave empty to use the article title.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Search result snippet. Leave empty to use the excerpt.',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Aloha Salads',
    }),
    defineField({
      name: 'image',
      title: 'Cover image (upload)',
      type: 'image',
      group: 'content',
      description: 'Listing card and the photo at the top of the article. Extra photos go in the article body below.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'imageUrl',
      title: 'Cover image URL',
      type: 'url',
      group: 'content',
      description: 'Used if no image is uploaded. Leave empty to show the placeholder.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image alt text (when using a URL)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      group: 'content',
      description:
        'Write the article in order. Use the image button in the toolbar to insert photos anywhere — as many as the story needs. Each image can have alt text and an optional caption.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet list', value: 'bullet' },
            { title: 'Numbered list', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'string',
                    validation: (r) =>
                      r.uri({ scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true }),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (r) => r.required().warning('Describe the photo for accessibility and SEO.'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            }),
            defineField({
              name: 'headerRow',
              title: 'Column headers',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Add 2–6 column headers. The first column is typically the row label.',
              validation: (r) => r.min(2).max(6),
            }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'tableRow',
                  title: 'Row',
                  fields: [
                    defineField({
                      name: 'cells',
                      title: 'Cells (one per column)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    }),
                  ],
                  preview: {
                    select: { cells: 'cells' },
                    prepare({ cells }: { cells?: string[] }) {
                      return { title: (cells ?? []).join(' · ') || 'Empty row' };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { caption: 'caption', headerRow: 'headerRow' },
            prepare({ caption, headerRow }: { caption?: string; headerRow?: string[] }) {
              const cols = Array.isArray(headerRow) ? headerRow.join(', ') : '';
              return { title: caption || 'Table', subtitle: cols || 'Add column headers above' };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageCarousel',
          title: 'Image carousel',
          fields: [
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
                    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
                  ],
                }),
              ],
              validation: (r) => r.min(2),
            }),
          ],
          preview: {
            select: { images: 'images', media: 'images.0' },
            prepare({ images, media }: { images?: unknown[]; media?: unknown }) {
              return { title: `Image carousel (${images?.length ?? 0} images)`, media: media as never };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageRow',
          title: 'Images side by side',
          fields: [
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
                    defineField({ name: 'caption', title: 'Title below image', type: 'string' }),
                  ],
                }),
              ],
              validation: (r) => r.min(2).max(4),
            }),
          ],
          preview: {
            select: { images: 'images', media: 'images.0' },
            prepare({ images, media }: { images?: unknown[]; media?: unknown }) {
              return { title: `Images side by side (${images?.length ?? 0})`, media: media as never };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'embed',
          title: 'Map / video embed',
          fields: [
            defineField({
              name: 'url',
              title: 'Embed URL',
              type: 'url',
              description: 'The iframe src. Google Maps embed, YouTube, Vimeo, or Instagram post embed only.',
              validation: (r) => r.required().uri({ scheme: ['https'] }),
            }),
            defineField({ name: 'title', title: 'Title (accessibility)', type: 'string' }),
            defineField({ name: 'height', title: 'Height (px)', type: 'number', initialValue: 450 }),
          ],
          preview: {
            select: { title: 'title', url: 'url' },
            prepare({ title, url }: { title?: string; url?: string }) {
              return { title: title || 'Embed', subtitle: url };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'htmlEmbed',
          title: 'HTML embed',
          description: 'Pasted embed code (Instagram post, interactive widget). Shown in an isolated frame.',
          fields: [
            defineField({ name: 'title', title: 'Title (accessibility)', type: 'string' }),
            defineField({
              name: 'code',
              title: 'HTML code',
              type: 'text',
              rows: 12,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'HTML embed', subtitle: 'HTML embed' };
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'callout',
          title: 'Callout box',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: '💡 Tip', value: 'tip' },
                  { title: 'ℹ️ Info', value: 'info' },
                  { title: '⚠️ Warning', value: 'warning' },
                  { title: '📝 Note', value: 'note' },
                ],
                layout: 'radio',
              },
              initialValue: 'tip',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'text',
              title: 'Content',
              type: 'text',
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { type: 'type', text: 'text' },
            prepare({ type, text }: { type?: string; text?: string }) {
              const emoji: Record<string, string> = { tip: '💡', info: 'ℹ️', warning: '⚠️', note: '📝' };
              return { title: `${emoji[type ?? ''] ?? '📝'} ${text?.substring(0, 60) ?? 'Empty callout'}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related pages',
      type: 'array',
      group: 'related',
      description: 'Pages and services where this article should appear in Related blogs. Pick as many as you need.',
      of: [
        {
          type: 'string',
          options: {
            list: relatedPageOptions,
            layout: 'dropdown',
          },
        },
      ],
      validation: (r) => r.unique(),
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'image', date: 'publishDate' },
    prepare({ title, subtitle, media, date }) {
      const when = date ? new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'No date';
      return {
        title: title || 'Untitled post',
        subtitle: [subtitle ? `/blog/${subtitle}` : 'No slug', when].join(' · '),
        media,
      };
    },
  },
});
