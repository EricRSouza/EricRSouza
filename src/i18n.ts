import type { postTypes } from './content.config';

/** English is served at the root, Portuguese under `/pt`. */
export const langs = ['en', 'pt'] as const;
export type Lang = (typeof langs)[number];
type PostType = (typeof postTypes)[number];

export const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-BR' };

/** Prefixes a root-relative path with the language segment: `path('pt', '/about/')` → `/pt/about/`. */
export function path(lang: Lang, to = '/') {
  return lang === 'en' ? to : `/pt${to}`;
}

export function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

export function formatDate(lang: Lang, date: Date) {
  return date.toLocaleDateString(htmlLang[lang], { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** Interface strings. Each language must define every key. */
export const ui = {
  en: {
    siteDescription: 'Eric Ramos Souza writes about business intelligence, data modeling and analytics, and shares the dashboards and cases behind them.',
    navAbout: 'About',
    switchLang: 'Português',
    switchLangLabel: 'Ler em português',
    filterAll: 'All',
    filterLabel: 'Filter by type',
    tagLabel: 'Filter by topic',
    clearFilters: 'Clear filters',
    emptyFeed: 'Nothing matches these filters yet.',
    featured: 'Featured',
    latest: 'Everything',
    published: 'Published',
    updatedOn: 'Updated',
    /** Shown (in this language) on a Portuguese post that has no English version. */
    noTranslation: 'This post is only available in Portuguese for now.',
    backHome: 'All posts',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This address doesn’t exist. It may have moved when the site was rebuilt.',
    footer: 'Business intelligence, data and the decisions they support.',
    types: { article: 'Article', case: 'Case study', dashboard: 'Dashboard', note: 'Note' },
    typesPlural: { article: 'Articles', case: 'Case studies', dashboard: 'Dashboards', note: 'Notes' },
  },
  pt: {
    siteDescription: 'Eric Ramos Souza escreve sobre business intelligence, modelagem de dados e analytics, e compartilha os dashboards e cases por trás disso.',
    navAbout: 'Sobre',
    switchLang: 'English',
    switchLangLabel: 'Read in English',
    filterAll: 'Tudo',
    filterLabel: 'Filtrar por tipo',
    tagLabel: 'Filtrar por tema',
    clearFilters: 'Limpar filtros',
    emptyFeed: 'Nada corresponde a esses filtros ainda.',
    featured: 'Em destaque',
    latest: 'Tudo',
    published: 'Publicado em',
    updatedOn: 'Atualizado em',
    noTranslation: 'Este post ainda não tem versão em português.',
    backHome: 'Todos os posts',
    notFoundTitle: 'Página não encontrada',
    notFoundBody: 'Este endereço não existe. Ele pode ter mudado quando o site foi refeito.',
    footer: 'Business intelligence, dados e as decisões que eles sustentam.',
    types: { article: 'Artigo', case: 'Case', dashboard: 'Dashboard', note: 'Nota' },
    typesPlural: { article: 'Artigos', case: 'Cases', dashboard: 'Dashboards', note: 'Notas' },
  },
} satisfies Record<Lang, Record<string, unknown> & { types: Record<PostType, string>; typesPlural: Record<PostType, string> }>;
