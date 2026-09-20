import { copy, contact } from '../lib/content';
import { routeHref } from '../lib/routes';
import type { Locale, Page } from '../lib/routes';
import { Arrow, ServiceIcon } from '../components/Icons';
import { RevenueChart } from '../components/RevenueChart';
import { ProjectCards } from '../components/ProjectCards';

export function Home({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              {t.eyebrow}
            </p>
            <h1>
              {t.hero[0]}
              <br />
              {t.hero[1]}
              <br />
              <em>{t.hero[2]}</em>
            </h1>
            <p className="hero-description">{t.intro}</p>
            <div className="hero-actions">
              <a className="button" href={routeHref(locale, 'projects')}>
                {t.seeWork}
                <Arrow />
              </a>
              <a className="text-link" href="#contato">
                {t.contact}
                <Arrow diagonal />
              </a>
            </div>
            <p className="hero-note">{t.heroNote}</p>
          </div>
          <div className="hero-art">
            <div className="chart-window">
              <div className="window-bar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>DATA / INSIGHTS</span>
                <span>↗</span>
              </div>
              <RevenueChart locale={locale} compact />
              <a className="chart-window-footer" href={routeHref(locale, 'article')}>
                <span>
                  {locale === 'pt'
                    ? 'Os números crescem. As perguntas também.'
                    : 'Numbers grow. So do the questions.'}
                </span>
                <Arrow />
              </a>
            </div>
            <div className="hero-caption">
              <span className="caption-line" />
              {locale === 'pt'
                ? 'Um exemplo do que os dados podem revelar.'
                : 'An example of what data can reveal.'}
            </div>
          </div>
        </div>
        <div className="container expertise-bar">
          <span>{locale === 'pt' ? 'DA PERGUNTA À ENTREGA' : 'FROM QUESTION TO DELIVERY'}</span>
          <div>
            <span>Business Intelligence</span>
            <i />
            <span>Analytics Engineering</span>
            <i />
            <span>{locale === 'pt' ? 'Visualização de dados' : 'Data visualization'}</span>
          </div>
        </div>
      </section>
      <section className="section services-section" id="servicos">
        <div className="container">
          <div className="section-intro">
            <div>
              <p className="eyebrow">{t.servicesLabel}</p>
              <h2>
                {t.servicesTitle}
                <br />
                <em>{t.servicesAccent}</em>
              </h2>
            </div>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="service-grid">
            {t.services.map((service, index) => (
              <article className="service-card" key={service.number}>
                <div className="service-top">
                  <ServiceIcon index={index} />
                  <span>{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <p className="service-tags">{service.tags}</p>
                <a
                  className="text-link"
                  href={routeHref(
                    locale,
                    service.page as Page,
                    service.page === 'home' ? '#contato' : '',
                  )}
                >
                  {service.link}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section work-section" id="projetos">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.workLabel}</p>
              <h2>{t.workTitle}</h2>
            </div>
            <a className="text-link" href={routeHref(locale, 'projects')}>
              {t.allProjects}
              <Arrow />
            </a>
          </div>
          <ProjectCards locale={locale} />
        </div>
      </section>
      <section className="section about-section" id="sobre">
        <div className="container about-grid">
          <div>
            <p className="eyebrow">{t.aboutLabel}</p>
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutText}</p>
            <p>{t.aboutText2}</p>
            <div className="tool-list">
              <span>Power BI</span>
              <span>SQL</span>
              <span>Python</span>
              <span>Databricks</span>
            </div>
            <a
              className="text-link"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'pt' ? 'Minha trajetória no LinkedIn' : 'My experience on LinkedIn'}
              <Arrow diagonal />
            </a>
          </div>
          <div className="method">
            <p className="tiny-label">{t.methodTitle}</p>
            {t.method.map(([title, text], index) => (
              <div className="method-step" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section articles-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.articlesLabel}</p>
              <h2>{t.articlesTitle}</h2>
            </div>
            <a className="text-link" href={routeHref(locale, 'blog')}>
              {t.allArticles}
              <Arrow />
            </a>
          </div>
          <article className="featured-article">
            <div className="article-art" aria-hidden="true">
              <span>ƒ(x)</span>
              <div>{locale === 'pt' ? 'Crescer ≠ lucrar' : 'Growth ≠ profit'}</div>
              <svg viewBox="0 0 340 120">
                <path d="M10 106C85 96 65 77 145 67s80-31 180-55" />
                <path d="M10 36C85 36 95 50 160 56s70 22 165 36" />
              </svg>
            </div>
            <div>
              <div className="article-meta">
                <span>{locale === 'pt' ? 'ANÁLISE DE NEGÓCIO' : 'BUSINESS ANALYSIS'}</span>
                <span>{t.reading}</span>
              </div>
              <h3>
                <a href={routeHref(locale, 'article')}>{t.articleTitle}</a>
              </h3>
              <p>{t.articleSummary}</p>
              <a className="text-link" href={routeHref(locale, 'article')}>
                {t.read}
                <Arrow />
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
