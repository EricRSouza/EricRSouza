import { useEffect, useState } from "react";
import { FullDesigns } from "./pages/FullDesigns";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Article, Blog, Project, Projects } from "./pages/ContentPages";
import { resolveRoute, routeHref } from "./lib/routes";
import { copy, pageMetadata } from "./lib/content";

export function App({ path }: { path: string }) {
  const { locale, page } = resolveRoute(path);
  const [proposal, setProposal] = useState<number | null>(null);
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("design");
    if (value === "1" || value === "2" || value === "3")
      setProposal(Number(value));
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.title = pageMetadata(locale, page).title;
  }, [locale, page]);
  if (page === "home" && proposal !== null)
    return <FullDesigns initial={proposal} locale={locale} />;
  let content;
  switch (page) {
    case "home":
      content = <Home locale={locale} />;
      break;
    case "projects":
      content = <Projects locale={locale} />;
      break;
    case "finance":
    case "explorer":
      content = <Project locale={locale} kind={page} />;
      break;
    case "blog":
      content = <Blog locale={locale} />;
      break;
    case "article":
    case "first-post":
      content = <Article locale={locale} firstPost={page === "first-post"} />;
      break;
    default:
      content = (
        <section className="container section listing-page">
          <p className="eyebrow">404</p>
          <h1>{copy[locale].notFoundTitle}</h1>
          <p>{copy[locale].notFoundText}</p>
          <a className="button" href={routeHref(locale, "home")}>
            Home →
          </a>
        </section>
      );
  }
  return (
    <Layout locale={locale} page={page}>
      {content}
    </Layout>
  );
}
