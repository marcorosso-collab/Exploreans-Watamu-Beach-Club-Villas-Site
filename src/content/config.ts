import { defineCollection, z } from 'astro:content';

// ============================================================
// SITE-WIDE SETTINGS (single file)
// ============================================================
const site = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    tagline: z.string(),
    url: z.string(),
    contact: z.object({
      phone: z.string(),
      phoneRestaurant: z.string(),
      email: z.string(),
      addressStreet: z.string(),
      addressCity: z.string(),
      addressRegion: z.string(),
      addressCountry: z.string(),
      lat: z.number(),
      lng: z.number()
    }),
    booking: z.object({
      url: z.string()
    }),
    seo: z.object({
      title: z.string(),
      description: z.string(),
      keywords: z.string(),
      ogImage: z.string()
    })
  })
});

// ============================================================
// SECTIONS — one file per page section (singletons)
// ============================================================
const sections = defineCollection({
  type: 'data',
  schema: z.discriminatedUnion('type', [
    // Hero
    z.object({
      type: z.literal('hero'),
      eyebrow: z.string(),
      headline: z.string(),
      headlineEm: z.string(),
      tagline: z.string(),
      image: z.string(),
      meta: z.array(z.object({
        label: z.string(),
        value: z.string()
      }))
    }),
    // Letter (Chapter I)
    z.object({
      type: z.literal('letter'),
      chapterLabel: z.string(),
      chapterSubtitle: z.string(),
      headline: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      imageCaption: z.string(),
      paragraphs: z.array(z.string()),
      signatureName: z.string(),
      signatureLocation: z.string()
    }),
    // Setting (Chapter II)
    z.object({
      type: z.literal('setting'),
      chapterLabel: z.string(),
      headline: z.string(),
      paragraphs: z.array(z.string()),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string()
      })),
      image: z.string(),
      imageAlt: z.string()
    }),
    // Villas (Chapter III)
    z.object({
      type: z.literal('villas'),
      chapterLabel: z.string(),
      chapterSubtitle: z.string(),
      headline: z.string(),
      lede: z.string(),
      villas: z.array(z.object({
        number: z.string(),
        name: z.string(),
        nameEm: z.string(),
        description: z.string(),
        capacity: z.string(),
        meta: z.string()
      })),
      footnote: z.string()
    }),
    // Facilities (Chapter IV)
    z.object({
      type: z.literal('facilities'),
      chapterLabel: z.string(),
      chapterSubtitle: z.string(),
      headline: z.string(),
      lede: z.string(),
      facilities: z.array(z.object({
        title: z.string(),
        titleEm: z.string(),
        description: z.string(),
        icon: z.enum(['pool', 'beach', 'restaurant', 'wellness', 'gardens', 'concierge'])
      })),
      footerStrip: z.string()
    }),
    // Dining (Chapter V)
    z.object({
      type: z.literal('dining'),
      chapterLabel: z.string(),
      chapterSubtitle: z.string(),
      headline: z.string(),
      lede: z.string(),
      restaurants: z.array(z.object({
        tag: z.string(),
        name: z.string(),
        nameEm: z.string(),
        paragraphs: z.array(z.string()),
        image: z.string(),
        imageAlt: z.string(),
        meta: z.array(z.object({
          label: z.string(),
          value: z.string(),
          link: z.string().optional()
        }))
      }))
    }),
    // Beach Club (Chapter VI)
    z.object({
      type: z.literal('beach'),
      chapterLabel: z.string(),
      chapterSubtitle: z.string(),
      headline: z.string(),
      lede: z.string(),
      paragraphs: z.array(z.string()),
      features: z.array(z.object({
        title: z.string(),
        description: z.string()
      })),
      image: z.string(),
      imageAlt: z.string(),
      backgroundImage: z.string()
    }),
    // Family
    z.object({
      type: z.literal('family'),
      eyebrow: z.string(),
      headline: z.string(),
      lede: z.string(),
      pillars: z.array(z.string()),
      brands: z.array(z.object({
        name: z.string(),
        tagline: z.string(),
        description: z.string(),
        url: z.string()
      }))
    })
  ])
});

// ============================================================
// EXCURSIONS — folder collection (one file per excursion)
// ============================================================
const excursions = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    nameEm: z.string(),
    category: z.string(),
    distance: z.string(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    published: z.boolean().default(true)
  })
});

// ============================================================
// FIELD NOTES — folder collection (one file per note)
// ============================================================
const notes = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number(),
    noteNumber: z.string(),
    title: z.string(),
    titleEm: z.string(),
    excerpt: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    link: z.string().default('#'),
    published: z.boolean().default(true)
  })
});

export const collections = { site, sections, excursions, notes };
