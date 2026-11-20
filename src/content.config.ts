import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Kinds of content in the unified feed. Order here is the order of the filter chips. */
export const postTypes = ['article', 'case', 'dashboard', 'note'] as const;

/**
 * Posts live in `src/content/posts/<lang>/<slug>.(md|mdx)`.
 * The same `<slug>` in both language folders marks a translation pair.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    type: z.enum(postTypes),
    tags: z.array(z.string()).default([]),
    /** Pinned at the top of the home page. */
    featured: z.boolean().default(false),
    /** Visible in `pnpm dev` only; never published. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
