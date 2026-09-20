import { copy } from '../lib/content';
import type { Locale } from '../lib/routes';
import { routeHref } from '../lib/routes';
import { ProjectCards } from '../components/ProjectCards';
import { ProjectVisual } from '../components/ProjectVisual';
import { RevenueChart } from '../components/RevenueChart';
import { Arrow } from '../components/Icons';
import RevenuePt from '../content/revenue.pt.mdx';
import RevenueEn from '../content/revenue.en.mdx';

export function Projects({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section listing-page container">
      <p className="eyebrow">{locale === 'pt' ? 'PORTFÓLIO / PROJETOS' : 'PORTFOLIO / PROJECTS'}</p>
      <h1>{t.projectsTitle}</h1>
      <p className="page-description">{t.projectsIntro}</p>
      <ProjectCards locale={locale} />
    </section>
  );
}

export function Blog({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section listing-page container">
      <p className="eyebrow">BLOG / ANALYTICS</p>
      <h1>{t.blogTitle}</h1>
      <p className="page-description">{t.blogIntro}</p>
      <div className="blog-list">
        {(['article', 'first-post'] as const).map((page, index) => (
          <article key={page}>
            <span className="article-number">0{index + 1}</span>
            <div>
              <div className="article-meta">
                <span>
                  {index === 0
                    ? locale === 'pt'
                      ? 'ANÁLISE INTERATIVA'
                      : 'INTERACTIVE ANALYSIS'
                    : 'WEB ANALYTICS'}
                </span>
                <span>{index === 0 ? '20.09.2026' : '05.08.2024'}</span>
              </div>
              <h2>
                <a href={routeHref(locale, page)}>{index === 0 ? t.articleTitle : t.firstTitle}</a>
              </h2>
              <p>{index === 0 ? t.articleSummary : t.firstSummary}</p>
              <a className="text-link" href={routeHref(locale, page)}>
                {t.read}
                <Arrow />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Article({ locale, firstPost = false }: { locale: Locale; firstPost?: boolean }) {
  const t = copy[locale];
  const pt = locale === 'pt';
  return (
    <article className="article-page">
      <header className="container article-header">
        <a className="back-link" href={routeHref(locale, 'blog')}>
          ← {t.back} / Blog
        </a>
        <p className="eyebrow">
          {firstPost
            ? 'WEB ANALYTICS'
            : pt
              ? 'ANÁLISE DE NEGÓCIO · EXPERIMENTO'
              : 'BUSINESS ANALYSIS · EXPERIMENT'}
        </p>
        <h1>{firstPost ? t.firstTitle : t.articleTitle}</h1>
        <p className="page-description">{firstPost ? t.firstSummary : t.articleSummary}</p>
        <div className="author-line">
          <span className="author-avatar">ER</span>
          <span>Eric Ramos Souza</span>
          <span>·</span>
          <time dateTime={firstPost ? '2024-08-05' : '2026-09-20'}>
            {firstPost ? '05.08.2024' : '20.09.2026'}
          </time>
        </div>
      </header>
      {!firstPost && (
        <div className="container article-chart">
          <RevenueChart locale={locale} />
        </div>
      )}
      <div className="prose">
        {firstPost ? (
          <>
            <h2>{pt ? 'Começando com Web Analytics' : 'Getting started with Web Analytics'}</h2>
            <p>
              {pt
                ? 'Este é meu primeiro post estudando web analytics.'
                : 'This is my first post exploring web analytics.'}
            </p>
            <h2>{pt ? 'O que vou aprender' : 'What I want to learn'}</h2>
            <ul>
              <li>Google Analytics 4</li>
              <li>Google Tag Manager</li>
              <li>{pt ? 'Eventos customizados' : 'Custom events'}</li>
              <li>E-commerce tracking</li>
            </ul>
            <p>
              {pt
                ? 'Este texto registra o início dos estudos em agosto de 2024.'
                : 'This post records the start of my studies in August 2024.'}
            </p>
          </>
        ) : pt ? (
          <RevenuePt />
        ) : (
          <RevenueEn />
        )}
      </div>
      <div className="container article-end">
        <a className="text-link" href={routeHref(locale, 'blog')}>
          {t.allArticles}
          <Arrow />
        </a>
      </div>
    </article>
  );
}

export function Project({ locale, kind }: { locale: Locale; kind: 'finance' | 'explorer' }) {
  const t = copy[locale];
  const pt = locale === 'pt';
  const finance = kind === 'finance';
  return (
    <article className="project-page container">
      <header className="project-header">
        <a className="back-link" href={routeHref(locale, 'projects')}>
          ← {t.back} / {pt ? 'Projetos' : 'Projects'}
        </a>
        <p className="eyebrow">{finance ? t.financeTag : t.explorerTag}</p>
        <h1>{finance ? t.financeTitle : t.explorerTitle}</h1>
        <p className="page-description">{finance ? t.financeText : t.explorerText}</p>
      </header>
      {finance ? (
        <ProjectVisual kind="finance" locale={locale} />
      ) : (
        <RevenueChart locale={locale} />
      )}
      <div className="case-grid">
        <aside>
          <p className="tiny-label">{pt ? 'EM POUCAS PALAVRAS' : 'AT A GLANCE'}</p>
          <dl>
            <dt>{pt ? 'Área' : 'Focus'}</dt>
            <dd>
              {finance ? 'Business Intelligence' : pt ? 'Análise de negócio' : 'Business analysis'}
            </dd>
            <dt>{pt ? 'Ferramentas' : 'Tools'}</dt>
            <dd>{finance ? 'Power BI' : 'React · TypeScript · SVG'}</dd>
            <dt>{pt ? 'Material' : 'Material'}</dt>
            <dd>
              {finance
                ? pt
                  ? 'Descrição do projeto'
                  : 'Project description'
                : pt
                  ? 'Demonstração com dados sintéticos'
                  : 'Synthetic-data demonstration'}
            </dd>
          </dl>
        </aside>
        <div className="case-body">
          <p className="eyebrow">{t.caseContext}</p>
          <h2>
            {finance
              ? pt
                ? 'Conectar a visão financeira à comercial.'
                : 'Connect financial and commercial performance.'
              : pt
                ? 'O que um indicador isolado deixa de mostrar?'
                : 'What does a single metric leave out?'}
          </h2>
          <p>
            {finance
              ? pt
                ? 'O painel descrito neste projeto reúne análise financeira, desempenho por produto e vendedor, simulação financeira e oportunidades de cross-sell. O objetivo é permitir que diferentes perguntas de negócio sejam exploradas em uma visão integrada.'
                : 'This dashboard project brings together financial analysis, product and sales performance, financial simulation and cross-selling opportunities. Its purpose is to explore related business questions in a connected view.'
              : pt
                ? 'Este experimento foi criado para o portfólio. Uma base sintética permite comparar receita, custos e margem sem expor informações de empresas ou clientes.'
                : 'This experiment was built for the portfolio. A synthetic dataset makes it possible to compare revenue, costs and margin without exposing company or client information.'}
          </p>
          <p className="eyebrow">{t.caseApproach}</p>
          <h2>{pt ? 'Dar contexto às perguntas.' : 'Put questions in context.'}</h2>
          <p>
            {finance
              ? pt
                ? 'A organização parte de quatro perguntas: como está o desempenho financeiro, quais produtos contribuem para ele, como variam os resultados comerciais e quais cenários merecem atenção. Filtros e segmentações ajudam a navegar entre essas perspectivas.'
                : 'The scope starts with four questions: how finances are performing, which products contribute, how commercial results vary and which scenarios deserve attention. Filters connect these perspectives.'
              : pt
                ? 'Os filtros permitem isolar cada canal. A alternância entre receita e margem mostra como a leitura muda conforme a métrica. A tabela mantém os números acessíveis, e o CSV permite reproduzir a análise.'
                : 'Filters isolate each channel. Switching between revenue and margin reveals how the interpretation changes with the metric. A table keeps the numbers accessible, and the CSV supports reproducing the analysis.'}
          </p>
          <p className="eyebrow">{t.caseLimits}</p>
          <div className="info-note">
            {finance
              ? pt
                ? 'Esta página documenta o escopo do painel. O diagrama é conceitual, não uma captura da implementação. Não há aqui dados de cliente, demonstração pública do Power BI ou resultados quantitativos verificados.'
                : 'This page documents the dashboard’s scope. The diagram is conceptual, not an implementation screenshot. It does not include client data, a public Power BI demo or verified quantitative outcomes.'
              : pt
                ? 'Todos os valores são sintéticos. O exemplo não inclui impostos ou despesas operacionais e não representa o resultado de uma empresa real.'
                : 'All values are synthetic. The example excludes taxes and operating expenses and does not represent a real company’s results.'}
          </div>
          {!finance && (
            <a className="button" href={routeHref(locale, 'article')}>
              {pt ? 'Leia a análise completa' : 'Read the full analysis'}
              <Arrow />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
