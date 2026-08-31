import { defineType, defineField, defineArrayMember } from 'sanity';

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
      name: 'faq',
      title: 'Často kladené otázky (FAQ)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Otázka',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              title: 'Odpověď',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'sources',
      title: 'Zdroje a doporučení',
      description: 'U zdravotních a ergonomických tvrzení uveďte podklady, ze kterých stránka vychází.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Název zdroje',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Odkaz',
              type: 'url',
              validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'note',
              title: 'Použito pro',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'note' },
          },
        }),
      ],
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
