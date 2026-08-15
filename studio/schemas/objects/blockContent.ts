import { defineType, defineField, defineArrayMember } from 'sanity';

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Obsah (Rich Text)',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Blok',
      type: 'block',
      styles: [
        { title: 'Běžný text', value: 'normal' },
        { title: 'Nadpis H1', value: 'h1' },
        { title: 'Nadpis H2', value: 'h2' },
        { title: 'Nadpis H3', value: 'h3' },
        { title: 'Nadpis H4', value: 'h4' },
        { title: 'Citace', value: 'blockquote' },
      ],
      lists: [
        { title: 'Odrážky', value: 'bullet' },
        { title: 'Číslovaný seznam', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Tučné', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
          { title: 'Kód', value: 'code' },
          { title: 'Podtržené', value: 'underline' },
          { title: 'Přeškrtnuté', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Vnitřní odkaz',
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                title: 'Cílový dokument',
                to: [{ type: 'page' }, { type: 'post' }],
              }),
            ],
          },
          {
            name: 'externalLink',
            type: 'object',
            title: 'Externí odkaz (URL)',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Cílová URL adresa',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),
              defineField({
                name: 'blank',
                type: 'boolean',
                title: 'Otevřít v novém okně',
                initialValue: true,
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Obrázek',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativní text (Alt)',
          description: 'Důležité pro přístupnost a SEO.',
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Popisek obrázku',
        }),
      ],
    }),
    defineArrayMember({
      name: 'youtube',
      type: 'object',
      title: 'YouTube Video',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'URL adresa videa na YouTube',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
