import { z, defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";

const drinks = defineCollection({
  loader: file("src/data/drinks.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      occasion: z.string(),
      spirit: z.enum([
        "whiskey",
        "vodka",
        "rum",
        "gin",
        "tequila",
        "brandy",
        "non-alcoholic",
      ]),
      description: z.string().optional(),
      image: image(),
      glutenFree: z.boolean().default(false),
    }),
});

const members = defineCollection({
  loader: file("src/data/members.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      image: image(),
      description: z.string(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      image: image(),
      imageAlt: z.string(),
      excerpt: z.string().optional(),
      publishDate: z.coerce.date().default(new Date(2014, 0, 1)),
    }),
});

export const collections = { drinks, members, blog };
