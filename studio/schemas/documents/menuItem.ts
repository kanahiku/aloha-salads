import { defineArrayMember, defineField, defineType } from 'sanity';
import { ComposeIcon } from '@sanity/icons';
import { altField, imageWeightWarning } from '../lib/imageChecks';

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu item',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'menu', title: 'Menu placement' },
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
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'note',
      title: 'Small note',
      type: 'string',
      group: 'content',
      description: 'Optional line shown on the dish card, e.g. "Not available at Kaneohe". Leave empty for none.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      validation: imageWeightWarning,
      group: 'content',
      options: { hotspot: true },
      fields: [altField()],
    }),
    defineField({
      name: 'categoryPlacements',
      title: 'Categories',
      type: 'array',
      group: 'menu',
      description: 'Add every category page where this item should appear. Use order to sort within each category.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'categoryPlacement',
          title: 'Category placement',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'menuCategory' }],
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'order',
              title: 'Order in this category',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { title: 'category.title', order: 'order' },
            prepare({ title, order }) {
              return {
                title: title || 'Choose category',
                subtitle: typeof order === 'number' ? `Order ${order}` : undefined,
              };
            },
          },
        }),
      ],
      validation: (r) => r.min(1).unique(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'menu',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Vegetarian', value: 'vegetarian' },
              { title: 'Vegan', value: 'vegan' },
              { title: 'Healthy option', value: 'healthy' },
              { title: 'Keiki / kids', value: 'kids' },
              { title: 'Drink', value: 'drink' },
              { title: 'Catering', value: 'catering' },
            ],
          },
        },
      ],
      validation: (r) => r.unique(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Currently available',
      type: 'boolean',
      group: 'menu',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'photo', category0: 'categoryPlacements.0.category.title' },
    prepare({ title, media, category0 }) {
      return {
        title: title || 'Untitled menu item',
        subtitle: category0 || 'No category',
        media,
      };
    },
  },
});
