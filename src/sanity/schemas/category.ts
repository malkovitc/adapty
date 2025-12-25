import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(50),
      description: 'Display name of the category',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly version of the name',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description of what this category covers',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color for category badge (e.g., #4F46E5)',
      validation: (Rule) => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        name: 'hex color',
        invert: false,
      }).error('Please enter a valid hex color (e.g., #4F46E5)'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      color: 'color',
    },
    prepare(selection) {
      const { title, subtitle, color } = selection
      return {
        title,
        subtitle: subtitle || 'No description',
        media: color ? undefined : undefined,
      }
    },
  },
})
