export type Locale = 'pt' | 'en';
export type Page =
  | 'home'
  | 'projects'
  | 'finance'
  | 'explorer'
  | 'blog'
  | 'article'
  | 'first-post'
  | 'not-found';

export const paths = {
  pt: {
    home: '/',
    projects: '/projetos/',
    finance: '/projetos/analise-financeira/',
    explorer: '/projetos/receita-e-margem/',
    blog: '/blog/',
    article: '/blog/receita-e-margem/',
    'first-post': '/blog/primeiro-post/',
    'not-found': '/404/',
  },
  en: {
    home: '/en/',
    projects: '/en/projects/',
    finance: '/en/projects/financial-analysis/',
    explorer: '/en/projects/revenue-and-margin/',
    blog: '/en/blog/',
    article: '/en/blog/revenue-and-margin/',
    'first-post': '/en/blog/first-post/',
    'not-found': '/en/404/',
  },
} satisfies Record<Locale, Record<Page, string>>;

export const legacyPaths: Record<string, Page> = {
  '/index.html': 'home',
  '/blog.html': 'blog',
  '/projetos.html': 'projects',
  '/sobre.html': 'home',
  '/analytics/2024/08/05/primeiro-post.html': 'first-post',
};

export function resolveRoute(path: string): { locale: Locale; page: Page } {
  const normalized = path.endsWith('.html') || path.endsWith('/') ? path : `${path}/`;
  for (const locale of ['pt', 'en'] as const) {
    for (const [page, route] of Object.entries(paths[locale])) {
      if (route === normalized) return { locale, page: page as Page };
    }
  }
  if (legacyPaths[normalized]) return { locale: 'pt', page: legacyPaths[normalized] };
  return { locale: path.startsWith('/en/') ? 'en' : 'pt', page: 'not-found' };
}

export function routeHref(locale: Locale, page: Page, hash = '') {
  return `${import.meta.env.BASE_URL}${paths[locale][page].slice(1)}${hash}`;
}

// Pages can serve the shared 404 document at any URL; only hydrate matching content.
export function canHydrateRoute(path: string, renderedPath: string) {
  const current = resolveRoute(path);
  const rendered = resolveRoute(renderedPath);
  return current.locale === rendered.locale && current.page === rendered.page;
}
