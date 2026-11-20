# ericramos.com.br

Eric Ramos Souza's personal site: posts and case studies about business intelligence, data modeling and analytics, in English (root) and Portuguese (`/pt`).

Built with [Astro](https://astro.build), MDX and React islands. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Run locally

```sh
pnpm install
pnpm dev      # http://localhost:4321, drafts included
pnpm build    # type check + static build into dist/
```

## Writing a post

Create `src/content/posts/en/<slug>.mdx` and, for the translation, `src/content/posts/pt/<slug>.mdx` with the same slug. The schema in `src/content.config.ts` validates the frontmatter:

```yaml
---
title: My post
description: One sentence for the feed, search engines and social cards.
date: 2026-11-20
type: article        # article | case | dashboard | note
tags: [Power BI, DAX]
featured: false      # pins it at the top of the home page
draft: true          # only visible in `pnpm dev`
---
```

Posts can import components from `src/components/mdx/`:

- `PowerBIEmbed.astro`: a Power BI "Publish to web" report that loads on click.
- Any React component, e.g. `<AttachRateDemo client:visible />`, for interactive charts and simulations.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/i18n.ts` | Languages, URL helper and interface strings |
| `src/posts.ts` | Loading posts, translation pairs and URLs |
| `src/components/` | Page bodies shared by both languages, plus the feed |
| `src/pages/` | Thin routes for `/` and `/pt/` |
| `src/styles/global.css` | Colour, type and prose tokens |
