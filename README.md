# ericramos.com.br

Eric Ramos Souza's personal site: projects, articles and notes about business intelligence, data modeling and analytics, in English (root) and Portuguese (`/pt`).

Built with [Astro](https://astro.build), MDX and React islands. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`; pull requests run the same build, which `main` requires to pass.

## Run locally

```sh
pnpm install
pnpm dev      # http://localhost:4321, drafts included
pnpm build    # type check + tests + static build into dist/
```

Needs Node 22.23.4 or newer.

## Writing a post

Create `src/content/posts/en/<slug>.mdx` and, for the translation, `src/content/posts/pt/<slug>.mdx` with the same slug. Posts are served at `/blog/<slug>/` and `/pt/blog/<slug>/`. The schema in `src/content.config.ts` validates the frontmatter:

```yaml
---
title: My post
description: One sentence for the feed, search engines and social cards.
date: 2026-11-20
type: article          # project | article | note
kicker: POWER BI · DAX # short line above the title
tags: [Power BI, DAX]  # topic filters on the blog
featured: false        # home page: "Selected work" (projects) or "Articles" (articles)
cover: finance         # projects only: card illustration (finance | explorer)
media:                 # optional piece above the body
  kind: powerbi        # powerbi (with src) | revenue-explorer
  src: https://app.powerbi.com/view?r=...
glance:                # projects only: "At a glance" facts
  - [Tools, Power BI]
draft: true            # only visible in `pnpm dev`
---
```

Projects use the case-study layout (media, "At a glance", body); articles and notes use the reading layout. In the body, `<Note>…</Note>` adds a highlighted caveat, and any React component can be imported and rendered with `client:visible` for interactive charts.

## Where things are

| Path | What it holds |
| --- | --- |
| `src/i18n.ts` | Languages, contact details, URL helper and interface strings |
| `src/posts.ts` | Loading posts, translation pairs and URLs |
| `src/components/` | Page bodies shared by both languages (home, blog, post, about) |
| `src/react/` | React components: icons, project illustrations, revenue explorer |
| `src/lib/analytics.ts` | Synthetic dataset and margin maths behind the explorer (tested in `tests/`) |
| `src/pages/` | Thin routes for `/` and `/pt/`, RSS, the CSV download and redirects from the old site |
| `src/styles/site.css` | All styles |
| `src/consent.ts`, `src/components/Tracking.astro` | GTM container ID, consent banner (Consent Mode v2) and click events |
| `gtm/` | Importable GTM container (GA4, Clarity) and setup steps |
