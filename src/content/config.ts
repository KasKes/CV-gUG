import { defineCollection, z } from "astro:content";

// Home Page collection schema
const homepage = defineCollection({
  schema: z.object({
    banner_slider: z
      .object({
        enable: z.boolean(),
        slider_item: z.array(
          z.object({
            bg_image: z.string(),
            subtitle: z.string().optional(),
            title: z.string(),
            content: z.string(),
            paginationIcon: z.string().optional(),
            paginationName: z.string(),
            button: z.object({
              enable: z.boolean(),
              label: z.string(),
              link: z.string(),
            }),
          }),
        ),
      })
      .optional(),
    service: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        subtitle: z.string().optional(),
      })
      .optional(),
    about: z
      .object({
        enable: z.boolean(),
        bg_image: z.string(),
        title: z.string(),
        content: z.string(),
        bulletPoint: z.array(z.string()).optional(),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      })
      .optional(),
    our_expertise: z
      .object({
        enable: z.boolean(),
        subtitle: z.string().optional(),
        title: z.string(),
        content: z.string(),
        funfacts: z
          .array(
            z
              .object({
                icon: z.string().optional(),
                title: z.string(),
                count: z.number(),
              })
              .optional(),
          )
          .optional(),
        progressbar: z
          .array(
            z
              .object({
                title: z.string(),
                progress: z.string(),
              })
              .optional(),
          )
          .optional(),
      })
      .optional(),
    project: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        subtitle: z.string().optional(),
      })
      .optional(),
    mission: z
      .object({
        enable: z.boolean(),
      })
      .optional(),
    promo_video: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        bg_image: z.string(),
        videoURL: z.string(),
        videoTitle: z.string(),
      })
      .optional(),
    testimonial: z
      .object({
        enable: z.boolean(),
      })
      .optional(),
    call_to_action: z
      .object({
        enable: z.boolean(),
      })
      .optional(),
    blog: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        subtitle: z.string().optional(),
      })
      .optional(),
    clients_logo_slider: z
      .object({
        enable: z.boolean(),
        clientLogos: z
          .array(
            z
              .object({
                logo: z.string(),
                link: z.string().optional(),
              })
              .optional(),
          )
          .optional(),
      })
      .optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    descriptionwe: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean(),
  }),
});

// Export collections
export const collections = {
  homepage: homepage,
  pages: pagesCollection
};
