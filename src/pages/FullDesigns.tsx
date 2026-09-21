import { useId, useState } from "react";
import { monthlySales } from "../lib/analytics";
import { contact, copy } from "../lib/content";
import { routeHref } from "../lib/routes";
import type { Locale } from "../lib/routes";
import { Arrow } from "../components/Icons";
import "./full-designs.css";

const data = monthlySales("all");
const names = ["Laboratório", "Caderno", "História"];
const englishNames = ["Laboratory", "Journal", "Story"];
const brl = (n: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);

export function FullDesigns({
  initial,
  locale,
}: {
  initial: number;
  locale: Locale;
}) {
  const [design, setDesign] = useState(initial);
  const pt = locale === "pt";
  function select(value: number) {
    setDesign(value);
    const url = new URL(location.href);
    url.searchParams.set("design", String(value));
    history.replaceState(null, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className={`proposal proposal-${design}`}>
      <a className="skip-link" href="#proposal-main">
        {pt ? "Pular para o conteúdo" : "Skip to content"}
      </a>
      <nav
        className="proposal-picker"
        aria-label={pt ? "Comparar designs" : "Compare designs"}
      >
        <span>{pt ? "PROPOSTAS" : "PROPOSALS"}</span>
        {(pt ? names : englishNames).map((name, i) => (
          <button
            key={name}
            aria-pressed={design === i + 1}
            onClick={() => select(i + 1)}
          >
            {i + 1} · {name}
          </button>
        ))}
        <a href={`${routeHref(pt ? "en" : "pt", "home")}?design=${design}`}>
          {pt ? "EN" : "PT"}
        </a>
      </nav>
      {design === 1 ? (
        <Laboratory locale={locale} />
      ) : design === 2 ? (
        <Journal locale={locale} />
      ) : (
        <Story locale={locale} />
      )}
    </div>
  );
}

function Header({
  locale,
  mode,
}: {
  locale: Locale;
  mode: "lab" | "journal" | "story";
}) {
  const pt = locale === "pt";
  return (
    <header className={`proposal-header header-${mode}`}>
      <a className="proposal-signature" href="#proposal-main">
        eric ramos souza<span>.</span>
      </a>
      {mode === "journal" && (
        <span className="journal-motto">
          {pt
            ? "Dados, perguntas e decisões."
            : "Data, questions and decisions."}
        </span>
      )}
      <nav aria-label={pt ? "Navegação principal" : "Main navigation"}>
        <a href="#trabalhos">{pt ? "Trabalho" : "Work"}</a>
        <a href="#ajuda">{pt ? "Como ajudo" : "How I help"}</a>
        <a href="#pessoa">{pt ? "Sobre" : "About"}</a>
        <a href="#conversa">
          {pt ? "Contato" : "Contact"}
          <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}

function Plot({ locale, line = false }: { locale: Locale; line?: boolean }) {
  const [metric, setMetric] = useState<"revenue" | "margin">("revenue");
  const id = useId();
  const pt = locale === "pt";
  const months = pt
    ? ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const isRevenue = metric === "revenue";
  const format = (value: number) =>
    isRevenue
      ? brl(value, locale)
      : `${value.toFixed(1).replace(".", pt ? "," : ".")}%`;
  const max = isRevenue ? 160000 : 50;
  const points = data
    .map((row, i) => `${64 + i * 102},${218 - (row[metric] / max) * 174}`)
    .join(" ");
  return (
    <div className="reasoning-plot">
      <div className="plot-controls">
        <div role="group" aria-label={pt ? "Métrica" : "Metric"}>
          <button aria-pressed={isRevenue} onClick={() => setMetric("revenue")}>
            {pt ? "Receita" : "Revenue"}
          </button>
          <button aria-pressed={!isRevenue} onClick={() => setMetric("margin")}>
            {pt ? "Margem" : "Margin"}
          </button>
        </div>
        <span>
          {pt ? "Jan–Jun · dados sintéticos" : "Jan–Jun · synthetic data"}
        </span>
      </div>
      <svg viewBox="0 0 640 270" role="img" aria-labelledby={id}>
        <title id={id}>
          {pt ? "Evolução mensal de " : "Monthly trend: "}
          {isRevenue
            ? pt
              ? "receita"
              : "revenue"
            : pt
              ? "margem"
              : "margin"}.{" "}
          {data
            .map((row, i) => `${months[i]}: ${format(row[metric])}`)
            .join("; ")}
        </title>
        {[0, 1, 2, 3].map((i) => (
          <line
            className="plot-gridline"
            key={i}
            x1="28"
            x2="613"
            y1={218 - i * 55}
            y2={218 - i * 55}
          />
        ))}
        {line && <polyline className="plot-line" points={points} />}
        {data.map((row, i) => (
          <g key={row.month}>
            {line ? (
              <circle
                className="plot-dot"
                cx={64 + i * 102}
                cy={218 - (row[metric] / max) * 174}
                r="5"
              />
            ) : (
              <rect
                className={i === 5 ? "plot-bar last" : "plot-bar"}
                x={37 + i * 102}
                y={218 - (row[metric] / max) * 174}
                width="54"
                height={(row[metric] / max) * 174}
                rx="2"
              />
            )}
            <text
              className="plot-value"
              x={64 + i * 102}
              y={204 - (row[metric] / max) * 174}
              textAnchor="middle"
            >
              {isRevenue
                ? `${row.revenue / 1000}${pt ? " mil" : "k"}`
                : `${row.margin.toFixed(1).replace(".", pt ? "," : ".")}%`}
            </text>
            <text
              className="plot-month"
              x={64 + i * 102}
              y="247"
              textAnchor="middle"
            >
              {months[i]}
            </text>
          </g>
        ))}
      </svg>
      <p className="plot-reading" aria-live="polite">
        {isRevenue
          ? pt
            ? "A receita sobe de R$ 80 mil para R$ 138 mil. Agora, selecione Margem."
            : "Revenue rises from R$80k to R$138k. Now select Margin."
          : pt
            ? "A margem cai de 40% para 26,1%. Crescer não conta a história inteira."
            : "Margin falls from 40% to 26.1%. Growth does not tell the whole story."}
      </p>
    </div>
  );
}

function Laboratory({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <>
      <Header locale={locale} mode="lab" />
      <main id="proposal-main" className="lab-main">
        <section className="lab-intro">
          <h1>
            {pt ? (
              <>
                Os dados respondem.
                <br />
                <em>A pergunta muda tudo.</em>
              </>
            ) : (
              <>
                Data answers.
                <br />
                <em>The question changes everything.</em>
              </>
            )}
          </h1>
          <p>
            {pt
              ? "Sou Eric. Analiso, automatizo e construo para conectar dados a decisões. Explore um exemplo do meu raciocínio."
              : "I’m Eric. I analyze, automate and build to connect data to decisions. Explore an example of my reasoning."}
          </p>
        </section>
        <section
          className="lab-workbench"
          aria-label={pt ? "Laboratório de análise" : "Analysis laboratory"}
        >
          <div className="lab-screen">
            <div className="lab-screen-title">
              <h2>
                {pt
                  ? "A receita cresceu. E o negócio?"
                  : "Revenue grew. What about the business?"}
              </h2>
              <span>{pt ? "Experimento aberto" : "Open experiment"}</span>
            </div>
            <Plot locale={locale} />
          </div>
          <aside className="lab-observation">
            <h2>{pt ? "Minha leitura" : "My reading"}</h2>
            <p>
              {pt
                ? "O crescimento chama atenção. Mas os custos crescem mais rápido — e deixam menos margem em cada venda."
                : "Growth draws attention. But costs grow faster, leaving less margin on each sale."}
            </p>
            <div>
              <span>{pt ? "Próxima pergunta" : "Next question"}</span>
              <strong>
                {pt
                  ? "O que muda quando isolamos cada canal?"
                  : "What changes when we isolate each channel?"}
              </strong>
            </div>
            <a href={routeHref(locale, "article")}>
              {pt ? "Abrir a análise completa" : "Open the full analysis"}
              <Arrow />
            </a>
            <small>
              {pt
                ? "Exemplo didático. Não são resultados de clientes."
                : "Educational example. These are not client results."}
            </small>
          </aside>
        </section>
        <Work locale={locale} />
        <Services locale={locale} />
        <About locale={locale} />
      </main>
      <Contact locale={locale} />
    </>
  );
}

function Journal({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <>
      <Header locale={locale} mode="journal" />
      <main id="proposal-main" className="journal-main">
        <section className="journal-lead">
          <h1>
            {pt ? (
              <>
                Crescer é uma coisa.
                <br />
                <em>Melhorar é outra.</em>
              </>
            ) : (
              <>
                Growth is one thing.
                <br />
                <em>Progress is another.</em>
              </>
            )}
          </h1>
          <div className="journal-byline">
            <strong>Eric Ramos Souza</strong>
            <p>
              {pt
                ? "Análises para entender o negócio. Projetos para mostrar como as respostas são construídas."
                : "Analysis to understand the business. Projects to show how the answers are built."}
            </p>
          </div>
        </section>
        <section className="journal-analysis">
          <div className="journal-chart">
            <h2>
              {pt ? "Seis meses. Duas leituras." : "Six months. Two readings."}
            </h2>
            <Plot locale={locale} line />
          </div>
          <aside>
            <p className="journal-dropcap">
              {pt
                ? "O faturamento avançou. Seria fácil encerrar a análise aqui. Ao olhar os custos, porém, a conclusão muda: cada real vendido deixa uma parcela menor de resultado."
                : "Revenue grew. It would be easy to stop the analysis here. Looking at costs changes the conclusion: each real sold leaves a smaller share of profit."}
            </p>
            <p>
              {pt
                ? "Troque a métrica no gráfico. A mesma base responde a duas perguntas diferentes."
                : "Change the chart metric. The same dataset answers two different questions."}
            </p>
            <a
              className="proposal-text-link"
              href={routeHref(locale, "article")}
            >
              {pt ? "Ler o raciocínio completo" : "Read the full reasoning"}
              <Arrow />
            </a>
            <small>
              {pt
                ? "Demonstração com dados sintéticos. Sem impostos ou despesas operacionais."
                : "Synthetic-data demonstration. Excludes taxes and operating expenses."}
            </small>
          </aside>
        </section>
        <div className="journal-columns">
          <Work locale={locale} />
          <Services locale={locale} />
        </div>
        <About locale={locale} />
      </main>
      <Contact locale={locale} />
    </>
  );
}

function Story({ locale }: { locale: Locale }) {
  const [month, setMonth] = useState(5);
  const sliderId = useId();
  const pt = locale === "pt";
  const current = data[month];
  const names = pt
    ? ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"]
    : ["January", "February", "March", "April", "May", "June"];
  return (
    <>
      <Header locale={locale} mode="story" />
      <main id="proposal-main">
        <section className="story-hero">
          <div className="story-hero-copy">
            <h1>
              {pt ? (
                <>
                  Nem todo
                  <br />
                  crescimento
                  <br />
                  <em>é avanço.</em>
                </>
              ) : (
                <>
                  Not all
                  <br />
                  growth is
                  <br />
                  <em>progress.</em>
                </>
              )}
            </h1>
            <p>
              {pt
                ? "Sou Eric Ramos Souza. Meu ponto de partida é uma pergunta. Meu trabalho é construir um caminho até a resposta."
                : "I’m Eric Ramos Souza. My starting point is a question. My work is to build a path to the answer."}
            </p>
            <a href="#historia">
              {pt ? "Acompanhe uma análise" : "Follow an analysis"}
              <Arrow />
            </a>
          </div>
          <div className="story-hero-evidence">
            <span>{pt ? "Janeiro → Junho" : "January → June"}</span>
            <div>
              <strong>
                {pt ? "+72,5" : "+72.5"}
                <span>%</span>
              </strong>
              <p>{pt ? "na receita" : "revenue growth"}</p>
            </div>
            <div>
              <strong>
                {pt ? "−13,9" : "−13.9"}
                <span>{pt ? " p.p." : " pp"}</span>
              </strong>
              <p>{pt ? "na margem" : "margin change"}</p>
            </div>
            <small>
              {pt
                ? "Dados sintéticos · um exemplo para explorar, não um resultado de cliente."
                : "Synthetic data · an example to explore, not a client result."}
            </small>
          </div>
        </section>
        <section className="story-step" id="historia">
          <div>
            <h2>
              {pt ? (
                <>
                  O que fica
                  <br />
                  de cada venda?
                </>
              ) : (
                <>
                  What remains
                  <br />
                  from each sale?
                </>
              )}
            </h2>
            <p>
              {pt
                ? "Avance pelos meses. Compare a parte consumida pelos custos com a que sobra antes de impostos e despesas operacionais."
                : "Move through the months. Compare costs with what remains before taxes and operating expenses."}
            </p>
          </div>
          <div className="story-interactive">
            <label htmlFor={sliderId}>
              {pt ? "Explore o período" : "Explore the period"}
              <strong>{names[month]}</strong>
            </label>
            <input
              id={sliderId}
              type="range"
              min="0"
              max="5"
              step="1"
              value={month}
              onChange={(event) => setMonth(Number(event.target.value))}
              aria-valuetext={names[month]}
            />
            <div className="story-share" aria-hidden="true">
              <span style={{ width: `${100 - current.margin}%` }} />
              <span style={{ width: `${current.margin}%` }} />
            </div>
            <dl aria-live="polite">
              <div>
                <dt>{pt ? "Receita" : "Revenue"}</dt>
                <dd>{brl(current.revenue, locale)}</dd>
              </div>
              <div>
                <dt>{pt ? "Custos" : "Costs"}</dt>
                <dd>{brl(current.cost, locale)}</dd>
              </div>
              <div>
                <dt>{pt ? "Margem" : "Margin"}</dt>
                <dd>
                  {current.margin.toFixed(1).replace(".", pt ? "," : ".")}%
                </dd>
              </div>
            </dl>
            <p>
              {pt
                ? "Azul: custos. Âmbar: parcela restante da receita. Dados sintéticos."
                : "Blue: costs. Amber: remaining revenue share. Synthetic data."}
            </p>
          </div>
        </section>
        <section className="story-conclusion">
          <h2>
            {pt
              ? "O gráfico mostra a mudança. A análise procura o motivo."
              : "The chart shows the change. Analysis looks for the reason."}
          </h2>
          <a href={routeHref(locale, "article")}>
            {pt
              ? "Explore os canais e as premissas"
              : "Explore channels and assumptions"}
            <Arrow />
          </a>
        </section>
        <div className="story-body">
          <Services locale={locale} />
          <Work locale={locale} />
          <About locale={locale} />
        </div>
      </main>
      <Contact locale={locale} />
    </>
  );
}

function Work({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <section className="proposal-work" id="trabalhos">
      <h2>
        {pt ? "Perguntas que viram trabalho." : "Questions that become work."}
      </h2>
      <a className="work-entry" href={routeHref(locale, "finance")}>
        <div className="work-symbol" aria-hidden="true">
          <span>{pt ? "Financeiro" : "Finance"}</span>
          <i />
          <span>{pt ? "Produtos" : "Products"}</span>
          <i />
          <span>{pt ? "Clientes" : "Customers"}</span>
        </div>
        <div>
          <h3>
            {pt
              ? "Uma visão integrada do negócio"
              : "A connected view of the business"}
          </h3>
          <p>
            {pt
              ? "Como reunir perspectivas financeiras, de produtos e comerciais em Power BI."
              : "Connecting financial, product and commercial perspectives in Power BI."}
          </p>
          <small>
            {pt
              ? "Escopo documentado · diagrama conceitual · sem resultados de clientes"
              : "Documented scope · conceptual diagram · no client results"}
          </small>
        </div>
        <Arrow diagonal />
      </a>
      <a className="work-entry" href={routeHref(locale, "explorer")}>
        <div className="work-symbol second" aria-hidden="true">
          <span>{pt ? "Receita" : "Revenue"}</span>
          <b>≠</b>
          <span>{pt ? "Margem" : "Margin"}</span>
        </div>
        <div>
          <h3>
            {pt
              ? "Crescimento sob outra perspectiva"
              : "Growth from another perspective"}
          </h3>
          <p>
            {pt
              ? "Filtros, tabela e dados para reproduzir a análise de receita e margem."
              : "Filters, a table and data to reproduce the revenue and margin analysis."}
          </p>
          <small>
            {pt
              ? "Experimento interativo · dados sintéticos"
              : "Interactive experiment · synthetic data"}
          </small>
        </div>
        <Arrow diagonal />
      </a>
      <a className="proposal-text-link" href={routeHref(locale, "blog")}>
        {pt ? "Mais raciocínio no blog" : "More reasoning on the blog"}
        <Arrow />
      </a>
    </section>
  );
}

function Services({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="proposal-services" id="ajuda">
      <h2>{locale === "pt" ? "Onde posso ajudar." : "Where I can help."}</h2>
      {t.services.map((service) => (
        <article key={service.title}>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <span>{service.tags}</span>
        </article>
      ))}
      <a className="proposal-text-link" href="#conversa">
        {t.contact}
        <Arrow />
      </a>
    </section>
  );
}

function About({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <section className="proposal-about" id="pessoa">
      <h2>
        {pt ? (
          <>
            O raciocínio tem
            <br />
            uma pessoa por trás.
          </>
        ) : (
          <>
            There’s a person
            <br />
            behind the reasoning.
          </>
        )}
      </h2>
      <div>
        <p>{copy[locale].aboutText}</p>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
          {pt
            ? "Conheça minha trajetória no LinkedIn"
            : "Explore my experience on LinkedIn"}
          <Arrow diagonal />
        </a>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const pt = locale === "pt";
  return (
    <footer className="proposal-contact" id="conversa">
      <div>
        <h2>{pt ? "Qual é a sua pergunta?" : "What’s your question?"}</h2>
        <p>
          {pt
            ? "Conte o contexto, os dados disponíveis e a decisão que precisa tomar."
            : "Tell me the context, the data available and the decision you need to make."}
        </p>
      </div>
      <a className="contact-email" href={`mailto:${contact.email}`}>
        {contact.email}
        <Arrow diagonal />
      </a>
      <div className="proposal-footer">
        <span>Eric Ramos Souza</span>
        <a href={contact.github}>GitHub</a>
        <a href={contact.linkedin}>LinkedIn</a>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
