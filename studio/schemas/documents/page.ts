import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název stránky',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Identifikátor (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Obsah stránky',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO a Metadata',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'Chybí slug',
      };
    },
  },
});
