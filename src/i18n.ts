import type { postTypes } from './content.config';

/** English is served at the root, Portuguese under `/pt`. */
export const langs = ['en', 'pt'] as const;
export type Lang = (typeof langs)[number];
type PostType = (typeof postTypes)[number];

export const htmlLang: Record<Lang, string> = { en: 'en', pt: 'pt-BR' };

export const contact = {
  email: 'ericr.souza@outlook.com',
  linkedin: 'https://www.linkedin.com/in/ericramosanalyticsengineer/',
  github: 'https://github.com/EricRSouza',
};

/** Prefixes a root-relative path with the language segment: `path('pt', '/about/')` → `/pt/about/`. */
export function path(lang: Lang, to = '/') {
  return lang === 'en' ? to : `/pt${to}`;
}

export function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

/** Dates as `20.09.2026`, the format used across the site. */
export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10).split('-').reverse().join('.');
}

/** Interface strings. Each language must define every key. */
export const ui = {
  en: {
    siteDescription:
      'Eric Ramos Souza: data analysis, BI and analytics engineering. Projects, analyses and articles about turning data into decisions.',
    homeTitle: 'Data, context and decisions',
    nav: { services: 'How I can help', projects: 'Projects', about: 'About', blog: 'Lab' },
    contact: 'Let’s talk',
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close menu',
    langLabel: 'Language',
    mainNav: 'Main',
    mobileNav: 'Mobile menu',
    eyebrow: 'DATA ANALYSIS · BI · ANALYTICS ENGINEERING',
    hero: ['Well-built data.', 'Clear context.', 'Better decisions.'],
    intro:
      'Connecting business questions to analysis and reliable data. Making information easier to understand — and act on.',
    seeWork: 'Explore my work',
    heroNote: 'Analyze. Build. Simplify.',
    heroWindow: 'Numbers grow. So do the questions.',
    heroCaption: 'An example of what data can reveal.',
    expertiseLabel: 'FROM QUESTION TO DELIVERY',
    expertise: ['Business Intelligence', 'Analytics Engineering', 'Data visualization'],
    servicesLabel: '01 / HOW I CAN HELP',
    servicesTitle: 'It starts with a question.',
    servicesAccent: 'It leads to clarity.',
    servicesIntro: 'The starting point is what you need to understand or improve. Technology supports the answer.',
    services: [
      {
        title: 'Understand the business',
        text: 'Which metrics actually matter? Frame questions, explore data and build analyses that reveal business performance.',
        tags: 'Data analysis · Metrics · BI',
        link: 'Explore an analysis',
        href: '/blog/revenue-grew/',
      },
      {
        title: 'Trust the data',
        text: 'Why don’t the numbers agree? Data models, metric definitions and validation help make reporting consistent.',
        tags: 'SQL · Modeling · Quality',
        link: 'See the approach',
        href: '/blog/cross-sell-dashboard/',
      },
      {
        title: 'Simplify operations',
        text: 'What still relies on repetitive work? Examine the workflow and connect data transformation, automation and visualization.',
        tags: 'Python · Integration · Automation',
        link: 'Discuss your challenge',
        href: '#contact',
      },
    ],
    workLabel: '02 / SELECTED WORK',
    workTitle: 'From question to practice.',
    allProjects: 'All projects',
    viewProject: 'Explore the project',
    aboutLabel: '03 / ABOUT ME',
    aboutTitle: 'I like making complex things easier to understand.',
    aboutText:
      'I’m Eric Ramos Souza. I enjoy analyzing, automating and building. My work starts with context: understanding the question before choosing a tool, and explaining the thinking behind a solution.',
    aboutText2:
      'This space brings together data projects, analyses and experiments. A place to share what I build and how I approach business problems.',
    aboutMore: 'My experience',
    methodTitle: 'How I approach the work',
    method: [
      ['Understand', 'The problem, the people and the decision.'],
      ['Build', 'Purposeful data models and analyses.'],
      ['Validate', 'Check assumptions and limitations.'],
      ['Share', 'Explain the solution and the learning.'],
    ],
    articlesLabel: '04 / ARTICLES & EXPERIMENTS',
    articlesTitle: 'The thinking is part of the work.',
    allArticles: 'Explore the lab',
    read: 'Read',
    contactLabel: 'LET’S TALK',
    contactTitle: 'What would you like to understand better?',
    contactText:
      'Tell me about your context, the data you have and the decision you need to make. We can start there.',
    email: 'Send me an email',
    footer: 'Data, context and good questions.',
    back: 'Back',
    blogLabel: 'LAB / PROJECTS & ANALYSES',
    blogTitle: 'Analyses, projects and discoveries.',
    blogIntro: 'Ideas about data and business, with room to explore, test and understand why.',
    filterAll: 'All',
    filterLabel: 'Filter by type',
    tagLabel: 'Filter by topic',
    clearFilters: 'Clear filters',
    emptyFeed: 'Nothing matches these filters yet.',
    glance: 'AT A GLANCE',
    notFoundTitle: 'This path didn’t lead to a page.',
    notFoundText: 'You can head back home or explore the lab.',
    /** Shown on a Portuguese post that has no English version. */
    noTranslation: 'This post is only available in Portuguese for now.',
    types: { project: 'Project', article: 'Article', note: 'Note' },
    typesPlural: { project: 'Projects', article: 'Articles', note: 'Notes' },
  },
  pt: {
    siteDescription:
      'Eric Ramos Souza: análise de dados, BI e analytics engineering. Projetos, análises e artigos sobre transformar dados em decisões.',
    homeTitle: 'Dados, contexto e decisões',
    nav: { services: 'Como posso ajudar', projects: 'Projetos', about: 'Sobre', blog: 'Lab' },
    contact: 'Vamos conversar',
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    close: 'Fechar menu',
    langLabel: 'Idioma',
    mainNav: 'Principal',
    mobileNav: 'Menu móvel',
    eyebrow: 'ANÁLISE DE DADOS · BI · ANALYTICS ENGINEERING',
    hero: ['Dados bem', 'construídos.', 'Decisões melhores.'],
    intro:
      'Conecto o problema de negócio à análise e à construção de dados confiáveis. Para que a informação faça sentido — e ajude a decidir.',
    seeWork: 'Explore meu trabalho',
    heroNote: 'Analisar. Construir. Simplificar.',
    heroWindow: 'Os números crescem. As perguntas também.',
    heroCaption: 'Um exemplo do que os dados podem revelar.',
    expertiseLabel: 'DA PERGUNTA À ENTREGA',
    expertise: ['Business Intelligence', 'Analytics Engineering', 'Visualização de dados'],
    servicesLabel: '01 / COMO POSSO AJUDAR',
    servicesTitle: 'Começa com uma pergunta.',
    servicesAccent: 'Termina com clareza.',
    servicesIntro: 'O ponto de partida é o que você precisa entender ou melhorar. A tecnologia vem para dar suporte à resposta.',
    services: [
      {
        title: 'Entender o negócio',
        text: 'Quais indicadores realmente importam? Organizar perguntas, explorar dados e construir análises que ajudem a enxergar o desempenho.',
        tags: 'Análise de dados · Indicadores · BI',
        link: 'Veja uma análise',
        href: '/blog/revenue-grew/',
      },
      {
        title: 'Confiar nos dados',
        text: 'Por que os números não batem? Modelagem, definições de métricas e validações para dar consistência ao que chega aos relatórios.',
        tags: 'SQL · Modelagem · Qualidade',
        link: 'Conheça a abordagem',
        href: '/blog/cross-sell-dashboard/',
      },
      {
        title: 'Simplificar a operação',
        text: 'O que ainda depende de trabalho repetitivo? Investigar o fluxo e conectar transformação, automação e visualização de dados.',
        tags: 'Python · Integração · Automação',
        link: 'Converse sobre seu desafio',
        href: '#contact',
      },
    ],
    workLabel: '02 / TRABALHO EM FOCO',
    workTitle: 'Do problema à prática.',
    allProjects: 'Todos os projetos',
    viewProject: 'Conhecer o projeto',
    aboutLabel: '03 / SOBRE MIM',
    aboutTitle: 'Gosto de transformar complexidade em algo que faça sentido.',
    aboutText:
      'Sou Eric Ramos Souza. Gosto de analisar, automatizar e construir. Meu trabalho parte do contexto: entender a pergunta antes de escolher a ferramenta e explicar o raciocínio por trás da solução.',
    aboutText2:
      'Este espaço reúne projetos, análises e experimentos em dados. Um lugar para compartilhar o que construo e como penso sobre problemas de negócio.',
    aboutMore: 'Minha trajetória',
    methodTitle: 'Uma forma de trabalhar',
    method: [
      ['Entender', 'O problema, as pessoas e a decisão.'],
      ['Construir', 'Dados, modelos e análises com propósito.'],
      ['Validar', 'Conferir as premissas e os limites.'],
      ['Compartilhar', 'Explicar a solução e o que aprendemos.'],
    ],
    articlesLabel: '04 / ARTIGOS & EXPERIMENTOS',
    articlesTitle: 'O raciocínio também faz parte da entrega.',
    allArticles: 'Explore o lab',
    read: 'Ler',
    contactLabel: 'VAMOS CONVERSAR',
    contactTitle: 'Qual problema você quer entender melhor?',
    contactText:
      'Conte um pouco sobre seu contexto, os dados que tem e a decisão que precisa tomar. Podemos começar por aí.',
    email: 'Escreva para mim',
    footer: 'Dados, contexto e boas perguntas.',
    back: 'Voltar',
    blogLabel: 'LAB / PROJETOS & ANÁLISES',
    blogTitle: 'Análises, projetos e descobertas.',
    blogIntro: 'Ideias sobre dados e negócio, com espaço para explorar, testar e entender o porquê.',
    filterAll: 'Tudo',
    filterLabel: 'Filtrar por tipo',
    tagLabel: 'Filtrar por tema',
    clearFilters: 'Limpar filtros',
    emptyFeed: 'Nada corresponde a esses filtros ainda.',
    glance: 'EM POUCAS PALAVRAS',
    notFoundTitle: 'Este caminho não levou a uma página.',
    notFoundText: 'Você pode voltar ao início ou explorar o lab.',
    /** Shown on an English post that has no Portuguese version. */
    noTranslation: 'Este post ainda não tem versão em português.',
    types: { project: 'Projeto', article: 'Artigo', note: 'Nota' },
    typesPlural: { project: 'Projetos', article: 'Artigos', note: 'Notas' },
  },
} satisfies Record<Lang, Record<string, unknown> & { types: Record<PostType, string>; typesPlural: Record<PostType, string> }>;
