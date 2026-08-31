import { defineQuery } from 'groq';

// Fragment pro dereferencování PortableText internalLinks
const portableTextFragment = `
  ...,
  _type == "block" => {
    ...,
    markDefs[] {
      ...,
      _type == "internalLink" => {
        "reference": reference->{
          _type,
          title,
          "slug": slug.current
        }
      }
    }
  }
`;

// Dotaz na globální nastavení webu
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    "title": coalesce(seo.metaTitle, defaultSeoTitle, title, siteTitle, "Bolest zad, cviky a ergonomie při sedavé práci | ZádaBezBolesti.cz"),
    "description": coalesce(seo.metaDescription, defaultSeoDescription, description, "Praktické návody, cviky a ergonomické tipy pro lepší orientaci při potížích se zády během práce u počítače. Pomohou vám upravit pracovní prostředí, pohybové návyky a každodenní režim."),
    seo
  }
`);

// Dotaz na seznam všech stránek (pro sitemap a routing)
export const allPagesQuery = defineQuery(`
  *[_type == "page" && !(_id in path("drafts.**")) && defined(slug.current)] | order(slug.current asc) {
    title,
    "slug": slug.current,
    _updatedAt
  }
`);

// Dotaz na detail jedné stránky podle slug
export const pageQuery = defineQuery(`
  *[_type == "page" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    content[] {
      ${portableTextFragment}
    },
    sections[] {
      _key,
      _type,
      heading,
      title,
      variant,
      text[] {
        ${portableTextFragment}
      },
      content[] {
        ${portableTextFragment}
      },
      items[] {
        title,
        description
      }
    },
    faq[] {
      question,
      answer
    },
    sources[] {
      _key,
      title,
      url,
      note
    },
    seo
  }
`);

// Dotaz na seznam článků (podporuje typ 'post' i 'article')
export const allPostsQuery = defineQuery(`
  *[_type in ["post", "article"] && !(_id in path("drafts.**")) && defined(slug.current) && (!defined(status) || status == "published") && (!defined(publishedAt) || publishedAt <= now())] | order(coalesce(publishedAt, publishDate, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, publishDate, _createdAt),
    "excerpt": coalesce(excerpt, lead, ""),
    mainImage,
    author->{
      name,
      "slug": slug.current,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`);

// Dotaz na detail článku podle slug
export const postQuery = defineQuery(`
  *[_type in ["post", "article"] && !(_id in path("drafts.**")) && slug.current == $slug && (!defined(status) || status == "published") && (!defined(publishedAt) || publishedAt <= now())][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, publishDate, _createdAt),
    "excerpt": coalesce(excerpt, lead, ""),
    mainImage,
    author->{
      name,
      "slug": slug.current,
      image,
      bio
    },
    categories[]->{
      title,
      "slug": slug.current
    },
    "body": coalesce(body, content, []),
    sections[] {
      _key,
      _type,
      heading,
      title,
      variant,
      text[] {
        ${portableTextFragment}
      },
      content[] {
        ${portableTextFragment}
      },
      items[] {
        title,
        description
      }
    },
    faq[] {
      question,
      answer
    },
    takeaways,
    sources[] {
      _key,
      title,
      url,
      note
    },
    seo
  }
`);

// Dotaz na seznam kategorií
export const allCategoriesQuery = defineQuery(`
  *[_type == "category" && !(_id in path("drafts.**")) && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current,
    description
  }
`);

// Dotaz na kategorii podle slug
export const categoryQuery = defineQuery(`
  *[_type == "category" && !(_id in path("drafts.**")) && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description
  }
`);

// Dotaz na články pro konkrétní kategorii
export const postsByCategoryQuery = defineQuery(`
  *[_type in ["post", "article"] && !(_id in path("drafts.**")) && defined(slug.current) && (!defined(status) || status == "published") && (!defined(publishedAt) || publishedAt <= now()) && $categorySlug in categories[]->slug.current] | order(coalesce(publishedAt, publishDate, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, publishDate, _createdAt),
    "excerpt": coalesce(excerpt, lead, ""),
    mainImage,
    author->{
      name,
      "slug": slug.current,
      image
    },
    categories[]->{
      title,
      "slug": slug.current
    }
  }
`);
