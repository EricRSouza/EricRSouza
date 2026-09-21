import { useEffect, useState } from "react";
import { Home } from "./Home";
import { copy, contact } from "../lib/content";
import { routeHref } from "../lib/routes";
import type { Locale } from "../lib/routes";
import { ProjectCards } from "../components/ProjectCards";
import { RevenueChart } from "../components/RevenueChart";
import { Arrow } from "../components/Icons";
import "./layouts.css";

type Design = "original" | "editorial" | "portfolio";

// These query-string options are local design studies, not new indexed pages.
export function LayoutComparison({ locale }: { locale: Locale }) {
  const [design, setDesign] = useState<Design>("original");
  useEffect(() => {
    const requested =
      new URLSearchParams(window.location.search).get("layout") ??
      sessionStorage.getItem("layout-study");
    if (
      requested === "editorial" ||
      requested === "portfolio" ||
      requested === "original"
    ) {
      setDesign(requested);
      sessionStorage.setItem("layout-study", requested);
    }
  }, []);
  const pt = locale === "pt";
  function choose(next: Design) {
    setDesign(next);
    sessionStorage.setItem("layout-study", next);
    const url = new URL(window.location.href);
    url.searchParams.set("layout", next);
    window.history.replaceState(null, "", url);
  }
  return (
    <>
      <nav
        className="layout-picker"
        aria-label={pt ? "Comparar layouts" : "Compare layouts"}
      >
        <span>{pt ? "ESTUDO DE LAYOUT" : "LAYOUT STUDY"}</span>
        {(["original", "editorial", "portfolio"] as const).map(
          (item, index) => (
            <button
              key={item}
              aria-pressed={design === item}
              onClick={() => choose(item)}
            >
              0{index + 1} ·{" "}
              {item === "original"
                ? pt
                  ? "Atual"
                  : "Current"
                : item === "editorial"
                  ? "Editorial"
                  : pt
                    ? "Portfólio"
                    : "Portfolio"}
            </button>
          ),
        )}
      </nav>
      {design === "original" ? (
        <Home locale={locale} />
      ) : (
        <AlternativeHome locale={locale} design={design} />
      )}
    </>
  );
}

function AlternativeHome({
  locale,
  design,
}: {
  locale: Locale;
  design: Exclude<Design, "original">;
}) {
  const t = copy[locale];
  const pt = locale === "pt";
  const editorial = design === "editorial";
  const projects = (
    <section className="alt-projects section" id="projetos">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t.workLabel}</p>
            <h2>{t.workTitle}</h2>
          </div>
          <a className="text-link" href={routeHref(locale, "projects")}>
            {t.allProjects}
            <Arrow />
          </a>
        </div>
        <ProjectCards locale={locale} />
      </div>
    </section>
  );
  return (
    <div className={`alternative alternative-${design}`}>
      <section className="alt-hero container">
        <div className="alt-hero-main">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>
            {t.hero[0]} {t.hero[1]}
            <br />
            <em>{t.hero[2]}</em>
          </h1>
          <div className="alt-intro">
            <p>{t.intro}</p>
            <a className="button" href="#contato">
              {t.contact}
              <Arrow diagonal />
            </a>
          </div>
        </div>
        {editorial ? (
          <aside className="editorial-note">
            <span className="editorial-monogram" aria-hidden="true">
              er.
            </span>
            <p className="tiny-label">ERIC RAMOS SOUZA</p>
            <p>{t.heroNote}</p>
            <a className="text-link" href="#projetos">
              {t.seeWork}
              <Arrow />
            </a>
          </aside>
        ) : (
          <div className="portfolio-feature">
            <div className="portfolio-feature-heading">
              <span className="tiny-label">
                {pt ? "EM EXPLORAÇÃO" : "EXPLORING"}
              </span>
              <span aria-hidden="true">↗</span>
            </div>
            <RevenueChart locale={locale} compact />
            <a className="text-link" href={routeHref(locale, "article")}>
              {t.articleTitle}
              <Arrow />
            </a>
          </div>
        )}
      </section>
      <div className="alt-disciplines container">
        <span>Business Intelligence</span>
        <span>Analytics Engineering</span>
        <span>{pt ? "Visualização de dados" : "Data visualization"}</span>
      </div>
      {!editorial && projects}
      <section className="alt-services section container" id="servicos">
        <div className="alt-services-heading">
          <p className="eyebrow">{t.servicesLabel}</p>
          <h2>
            {t.servicesTitle}
            <br />
            <em>{t.servicesAccent}</em>
          </h2>
          <p>{t.servicesIntro}</p>
        </div>
        <div className="alt-service-list">
          {t.services.map((service) => (
            <article className="alt-service" key={service.number}>
              <span className="alt-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <p className="tiny-label">{service.tags}</p>
                <a
                  className="text-link"
                  href={
                    service.page === "article" || service.page === "finance"
                      ? routeHref(locale, service.page)
                      : "#contato"
                  }
                >
                  {service.link}
                  <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      {editorial && projects}
      <section className="alt-about section container" id="sobre">
        <div>
          <p className="eyebrow">{t.aboutLabel}</p>
          <h2>{t.aboutTitle}</h2>
        </div>
        <div>
          <p>{t.aboutText}</p>
          <p>{t.aboutText2}</p>
          <a
            className="text-link"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <Arrow diagonal />
          </a>
        </div>
        <ol className="alt-method">
          {t.method.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="alt-journal section">
        <div className="container alt-journal-grid">
          <div>
            <p className="eyebrow">{t.articlesLabel}</p>
            <h2>{t.articlesTitle}</h2>
            <a className="text-link" href={routeHref(locale, "blog")}>
              {t.allArticles}
              <Arrow />
            </a>
          </div>
          <article>
            <span className="tiny-label">
              {t.reading} · {pt ? "DADOS SINTÉTICOS" : "SYNTHETIC DATA"}
            </span>
            <h3>
              <a href={routeHref(locale, "article")}>{t.articleTitle}</a>
            </h3>
            <p>{t.articleSummary}</p>
            <a className="text-link" href={routeHref(locale, "article")}>
              {t.read}
              <Arrow />
            </a>
          </article>
        </div>
      </section>
    </div>
  );
}
