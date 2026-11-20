import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Kinds of content in the unified feed. Order here is the order of the filter chips. */
export const postTypes = ['project', 'article', 'note'] as const;

/** Interactive or embedded piece shown above the post body. */
const media = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('revenue-explorer') }),
  z.object({ kind: z.literal('powerbi'), src: z.url() }),
]);

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
    /** Short topic line above the title, e.g. "Power BI · Case study". */
    kicker: z.string(),
    tags: z.array(z.string()).default([]),
    /** Shown in "Selected work" (projects) or "Articles" (articles) on the home page. */
    featured: z.boolean().default(false),
    /** Illustration used on project cards. */
    cover: z.enum(['finance', 'explorer']).optional(),
    media: media.optional(),
    /** "At a glance" facts shown beside a project's body. */
    glance: z.array(z.tuple([z.string(), z.string()])).default([]),
    /** Visible in `pnpm dev` only; never published. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
