import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const careersContent = defineType({
  name: 'careersContent',
  title: 'Careers',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: 'Work with Us (/careers) hero image, shown beside the headline.',
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
  ],
  preview: {
    select: { media: 'heroImage' },
    prepare({ media }) {
      return {
        title: 'Careers',
        subtitle: 'Work with Us page images',
        media,
      };
    },
  },
});
