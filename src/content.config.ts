import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const transmissions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/transmissions' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Exosphere'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

const craft = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/craft' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
  }),
});

export const collections = { transmissions, craft };
