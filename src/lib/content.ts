import type { Locale, Page } from './routes';

export const contact = {
  email: 'ericr.souza@outlook.com',
  linkedin: 'https://www.linkedin.com/in/ericramosanalyticsengineer/',
  github: 'https://github.com/EricRSouza',
};

export const copy = {
  pt: {
    nav: ['Como posso ajudar', 'Projetos', 'Sobre', 'Blog'],
    contact: 'Vamos conversar',
    skip: 'Pular para o conteúdo',
    menu: 'Menu',
    close: 'Fechar menu',
    eyebrow: 'ANÁLISE DE DADOS · BI · ANALYTICS ENGINEERING',
    hero: ['Dados bem', 'construídos.', 'Decisões melhores.'],
    intro:
      'Conecto o problema de negócio à análise e à construção de dados confiáveis. Para que a informação faça sentido — e ajude a decidir.',
    seeWork: 'Explore meu trabalho',
    heroNote: 'Analisar. Construir. Simplificar.',
    servicesLabel: '01 / COMO POSSO AJUDAR',
    servicesTitle: 'Começa com uma pergunta.',
    servicesAccent: 'Termina com clareza.',
    servicesIntro:
      'O ponto de partida é o que você precisa entender ou melhorar. A tecnologia vem para dar suporte à resposta.',
    services: [
      {
        number: '01',
        title: 'Entender o negócio',
        text: 'Quais indicadores realmente importam? Organizar perguntas, explorar dados e construir análises que ajudem a enxergar o desempenho.',
        tags: 'Análise de dados · Indicadores · BI',
        link: 'Veja uma análise',
        page: 'article',
      },
      {
        number: '02',
        title: 'Confiar nos dados',
        text: 'Por que os números não batem? Modelagem, definições de métricas e validações para dar consistência ao que chega aos relatórios.',
        tags: 'SQL · Modelagem · Qualidade',
        link: 'Conheça a abordagem',
        page: 'finance',
      },
      {
        number: '03',
        title: 'Simplificar a operação',
        text: 'O que ainda depende de trabalho repetitivo? Investigar o fluxo e conectar transformação, automação e visualização de dados.',
        tags: 'Python · Integração · Automação',
        link: 'Converse sobre seu desafio',
        page: 'home',
      },
    ],
    workLabel: '02 / TRABALHO EM FOCO',
    workTitle: 'Do problema à prática.',
    allProjects: 'Todos os projetos',
    financeTitle: 'Uma visão integrada do negócio.',
    financeText: 'Análise financeira, produtos e oportunidades comerciais em um painel Power BI.',
    financeTag: 'POWER BI · PROJETO DOCUMENTADO',
    explorerTitle: 'Receita em alta. E a margem?',
    explorerText:
      'Explore como duas métricas podem contar histórias diferentes sobre o mesmo negócio.',
    explorerTag: 'ANÁLISE INTERATIVA · DEMONSTRAÇÃO',
    viewProject: 'Conhecer o projeto',
    aboutLabel: '03 / SOBRE MIM',
    aboutTitle: 'Gosto de transformar complexidade em algo que faça sentido.',
    aboutText:
      'Sou Eric Ramos Souza. Gosto de analisar, automatizar e construir. Meu trabalho parte do contexto: entender a pergunta antes de escolher a ferramenta e explicar o raciocínio por trás da solução.',
    aboutText2:
      'Este espaço reúne projetos, análises e experimentos em dados. Um lugar para compartilhar o que construo e como penso sobre problemas de negócio.',
    methodTitle: 'Uma forma de trabalhar',
    method: [
      ['Entender', 'O problema, as pessoas e a decisão.'],
      ['Construir', 'Dados, modelos e análises com propósito.'],
      ['Validar', 'Conferir as premissas e os limites.'],
      ['Compartilhar', 'Explicar a solução e o que aprendemos.'],
    ],
    articlesLabel: '04 / ARTIGOS & EXPERIMENTOS',
    articlesTitle: 'O raciocínio também faz parte da entrega.',
    allArticles: 'Explore o blog',
    articleTitle: 'A receita cresceu. O negócio melhorou?',
    articleSummary:
      'Um exercício interativo para olhar além da receita e entender a relação entre crescimento, custos e margem.',
    read: 'Ler análise',
    reading: '5 min de leitura',
    firstTitle: 'Primeiros passos em Web Analytics',
    firstSummary: 'O ponto de partida para estudar métricas, eventos e comportamento digital.',
    contactLabel: 'VAMOS CONVERSAR',
    contactTitle: 'Qual problema você quer entender melhor?',
    contactText:
      'Conte um pouco sobre seu contexto, os dados que tem e a decisão que precisa tomar. Podemos começar por aí.',
    email: 'Escreva para mim',
    footer: 'Dados, contexto e boas perguntas.',
    back: 'Voltar',
    source: 'Dados sintéticos · Jan–Jun · Exemplo didático',
    projectsTitle: 'Trabalho que ganha contexto.',
    projectsIntro:
      'Cada projeto conta uma parte: o problema, as escolhas e o que é possível aprender com os dados.',
    blogTitle: 'Análises, perguntas e descobertas.',
    blogIntro:
      'Ideias sobre dados e negócio, com espaço para explorar, testar e entender o porquê.',
    notFoundTitle: 'Este caminho não levou a uma página.',
    notFoundText: 'Você pode voltar ao início ou explorar os projetos.',
    caseContext: 'CONTEXTO',
    caseApproach: 'ABORDAGEM',
    caseLimits: 'ESCOPO & LIMITES',
  },
  en: {
    nav: ['How I can help', 'Projects', 'About', 'Blog'],
    contact: 'Let’s talk',
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close menu',
    eyebrow: 'DATA ANALYSIS · BI · ANALYTICS ENGINEERING',
    hero: ['Well-built data.', 'Clear context.', 'Better decisions.'],
    intro:
      'Connecting business questions to analysis and reliable data. Making information easier to understand — and act on.',
    seeWork: 'Explore my work',
    heroNote: 'Analyze. Build. Simplify.',
    servicesLabel: '01 / HOW I CAN HELP',
    servicesTitle: 'It starts with a question.',
    servicesAccent: 'It leads to clarity.',
    servicesIntro:
      'The starting point is what you need to understand or improve. Technology supports the answer.',
    services: [
      {
        number: '01',
        title: 'Understand the business',
        text: 'Which metrics actually matter? Frame questions, explore data and build analyses that reveal business performance.',
        tags: 'Data analysis · Metrics · BI',
        link: 'Explore an analysis',
        page: 'article',
      },
      {
        number: '02',
        title: 'Trust the data',
        text: 'Why don’t the numbers agree? Data models, metric definitions and validation help make reporting consistent.',
        tags: 'SQL · Modeling · Quality',
        link: 'See the approach',
        page: 'finance',
      },
      {
        number: '03',
        title: 'Simplify operations',
        text: 'What still relies on repetitive work? Examine the workflow and connect data transformation, automation and visualization.',
        tags: 'Python · Integration · Automation',
        link: 'Discuss your challenge',
        page: 'home',
      },
    ],
    workLabel: '02 / SELECTED WORK',
    workTitle: 'From question to practice.',
    allProjects: 'All projects',
    financeTitle: 'A connected view of the business.',
    financeText:
      'Financial performance, products and commercial opportunities in a Power BI dashboard.',
    financeTag: 'POWER BI · DOCUMENTED PROJECT',
    explorerTitle: 'Revenue is up. What about margin?',
    explorerText: 'Explore how two metrics can tell different stories about the same business.',
    explorerTag: 'INTERACTIVE ANALYSIS · DEMONSTRATION',
    viewProject: 'Explore the project',
    aboutLabel: '03 / ABOUT ME',
    aboutTitle: 'I like making complex things easier to understand.',
    aboutText:
      'I’m Eric Ramos Souza. I enjoy analyzing, automating and building. My work starts with context: understanding the question before choosing a tool, and explaining the thinking behind a solution.',
    aboutText2:
      'This space brings together data projects, analyses and experiments. A place to share what I build and how I approach business problems.',
    methodTitle: 'How I approach the work',
    method: [
      ['Understand', 'The problem, the people and the decision.'],
      ['Build', 'Purposeful data models and analyses.'],
      ['Validate', 'Check assumptions and limitations.'],
      ['Share', 'Explain the solution and the learning.'],
    ],
    articlesLabel: '04 / ARTICLES & EXPERIMENTS',
    articlesTitle: 'The thinking is part of the work.',
    allArticles: 'Explore the blog',
    articleTitle: 'Revenue grew. Did the business improve?',
    articleSummary:
      'An interactive exercise to look beyond revenue and understand growth, costs and margin.',
    read: 'Read the analysis',
    reading: '5 min read',
    firstTitle: 'Getting started with Web Analytics',
    firstSummary: 'A starting point for exploring metrics, events and digital behavior.',
    contactLabel: 'LET’S TALK',
    contactTitle: 'What would you like to understand better?',
    contactText:
      'Tell me about your context, the data you have and the decision you need to make. We can start there.',
    email: 'Send me an email',
    footer: 'Data, context and good questions.',
    back: 'Back',
    source: 'Synthetic data · Jan–Jun · Educational example',
    projectsTitle: 'Work, with context.',
    projectsIntro:
      'Each project tells part of the story: the problem, the choices and what the data can teach us.',
    blogTitle: 'Analyses, questions and discoveries.',
    blogIntro: 'Ideas about data and business, with room to explore, test and understand why.',
    notFoundTitle: 'This path didn’t lead to a page.',
    notFoundText: 'You can head back home or explore the projects.',
    caseContext: 'CONTEXT',
    caseApproach: 'APPROACH',
    caseLimits: 'SCOPE & LIMITATIONS',
  },
} satisfies Record<Locale, object>;

export function pageMetadata(locale: Locale, page: Page) {
  const t = copy[locale];
  const names: Record<Page, string> = {
    home: locale === 'pt' ? 'Dados, contexto e decisões' : 'Data, context and decisions',
    projects: locale === 'pt' ? 'Projetos' : 'Projects',
    finance: t.financeTitle,
    explorer: t.explorerTitle,
    blog: 'Blog',
    article: t.articleTitle,
    'first-post': t.firstTitle,
    'not-found': '404',
  };
  const description =
    page === 'article'
      ? t.articleSummary
      : page === 'finance'
        ? t.financeText
        : page === 'explorer'
          ? t.explorerText
          : page === 'first-post'
            ? t.firstSummary
            : t.intro;
  return { title: `${names[page]} — Eric Ramos Souza`, description };
}
