import { ImageIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

const imageField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
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

export const cateringContent = defineType({
  name: 'cateringContent',
  title: 'Catering',
  type: 'document',
  icon: ImageIcon,
  fields: [
    imageField('menuImage', 'Catering menu hero image', 'Hero image for the main catering page.'),
    imageField('corporateImage', 'Corporate catering hero image', 'Hero image for the corporate catering page.'),
    imageField(
      'officeLunchImage',
      'Office lunch catering hero image',
      'Hero image for the office lunch catering page.'
    ),
    imageField('meetingsImage', 'Meeting catering hero image', 'Hero image for the meeting catering page.'),
    imageField('eventsImage', 'Event catering hero image', 'Hero image for the event catering page.'),
    imageField('largeGroupsImage', 'Large group catering hero image', 'Hero image for the large group catering page.'),
    defineField({
      name: 'trayImages',
      title: 'Catering tray photos',
      description:
        'Photos for the cards in "Catering Menu and Pricing". The label must match the tray name on the catering page exactly (for example "Aloha Passion Tray").',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cateringTray',
          title: 'Tray photo',
          fields: [
            defineField({ name: 'label', title: 'Tray name', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
            }),
          ],
          preview: { select: { title: 'label', media: 'image' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { media: 'menuImage' },
    prepare({ media }) {
      return {
        title: 'Catering',
        subtitle: 'Catering page images',
        media,
      };
    },
  },
});
