import { useEffect, useState } from 'react';
import { Home } from './Home';
import { Arrow } from '../components/Icons';
import { RevenueChart } from '../components/RevenueChart';
import { routeHref } from '../lib/routes';
import type { Locale } from '../lib/routes';
import './home-studies.css';

const studies = ['original', 'clarity', 'personal', 'analysis'] as const;
type Study = (typeof studies)[number];

export function HomeStudies({ locale }: { locale: Locale }) {
  const [study, setStudy] = useState<Study>('original');
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('study');
    if (studies.some(item => item === requested)) {
      setStudy(studies.find(item => item === requested) ?? 'original');
      setEnabled(true);
    }
  }, []);
  const pt = locale === 'pt';
  const labels = pt ? ['Original', 'Clareza comercial', 'Marca pessoal', 'Raciocínio em ação'] : ['Original', 'Business clarity', 'Personal identity', 'Analysis in action'];
  function choose(value: Study) {
    setStudy(value);
    const url = new URL(location.href);
    url.searchParams.set('study', value);
    history.replaceState(null, '', url);
  }
  if (!enabled) return <Home locale={locale} />;
  return <>
    <nav className="study-picker" aria-label={pt ? 'Comparar propostas' : 'Compare proposals'}>
      {studies.map((item, index) => <button key={item} aria-pressed={study === item} onClick={() => choose(item)}>{labels[index]}</button>)}
    </nav>
    <div className={study === 'original' ? '' : 'home-refined'}>
      <Home locale={locale} opening={study === 'original' ? undefined : <Opening locale={locale} study={study} />} />
    </div>
  </>;
}

function Opening({ locale, study }: { locale: Locale; study: Exclude<Study, 'original'> }) {
  const pt = locale === 'pt';
  const contact = <a className="button" href="#contato">{pt ? 'Conversar sobre seu desafio' : 'Let’s discuss your challenge'}<Arrow diagonal /></a>;
  const work = <a className="text-link" href={routeHref(locale, 'projects')}>{pt ? 'Conheça os projetos' : 'Explore the projects'}<Arrow /></a>;
  const title = study === 'clarity'
    ? (pt ? <>Entender o negócio.<br /><em>Construir a resposta.</em></> : <>Understand the business.<br /><em>Build the answer.</em></>)
    : study === 'personal'
      ? (pt ? <>Sou Eric.<br />Analiso, construo<br /><em>e simplifico.</em></> : <>I’m Eric.<br />I analyze, build<br /><em>and simplify.</em></>)
      : (pt ? <>A receita cresceu.<br /><em>E o negócio?</em></> : <>Revenue grew.<br /><em>What about the business?</em></>);
  return <section className={`study-opening study-${study}`}>
    <div className="container study-grid">
      <div className="study-copy">
        <h1>{title}</h1>
        <p className="study-description">{study === 'analysis'
          ? pt ? 'Uma boa análise começa quando deixamos de olhar um número sozinho. Neste experimento, exploro receita, custos e margem para entender o que o crescimento esconde.' : 'Good analysis starts when we stop looking at one number alone. This experiment explores revenue, costs and margin to see what growth can hide.'
          : pt ? 'Sou Eric Ramos Souza. Trabalho a conexão entre perguntas de negócio, análise e construção de dados. Aqui compartilho projetos e o raciocínio por trás das soluções.' : 'I’m Eric Ramos Souza. I connect business questions, analysis and data development. Here I share projects and the reasoning behind the solutions.'}</p>
        <div className="study-actions">{contact}{work}</div>
      </div>
      {study === 'clarity' && <div className="study-questions">
        <h2>{pt ? 'O que você precisa entender?' : 'What do you need to understand?'}</h2>
        <a href="#servicos"><span>{pt ? 'Quais indicadores acompanhar?' : 'Which metrics should you track?'}</span><small>{pt ? 'Análise de negócio e BI' : 'Business analysis and BI'}</small><Arrow /></a>
        <a href={routeHref(locale, 'finance')}><span>{pt ? 'Como conectar os dados?' : 'How can your data connect?'}</span><small>{pt ? 'Conheça o escopo do projeto Power BI' : 'Explore the Power BI project scope'}</small><Arrow /></a>
        <a href={routeHref(locale, 'article')}><span>{pt ? 'O crescimento conta toda a história?' : 'Does growth tell the whole story?'}</span><small>{pt ? 'Explore uma análise com dados sintéticos' : 'Explore an analysis with synthetic data'}</small><Arrow /></a>
      </div>}
      {study === 'personal' && <div className="study-personal-note">
        <p>{pt ? 'A ferramenta vem depois da pergunta.' : 'The question comes before the tool.'}</p>
        <p>{pt ? 'Entender o contexto. Escolher o que medir. Explicar as decisões e os limites do que foi construído.' : 'Understand the context. Choose what to measure. Explain the decisions and limitations of what was built.'}</p>
        <a className="text-link" href="#sobre">{pt ? 'Minha forma de trabalhar' : 'How I approach the work'}<Arrow /></a>
      </div>}
      {study === 'analysis' && <figure className="study-demonstration">
        <figcaption>{pt ? 'Demonstração com dados sintéticos · janeiro a junho' : 'Synthetic-data demonstration · January to June'}</figcaption>
        <RevenueChart locale={locale} compact />
        <p>{pt ? 'A receita aumenta, mas a margem cai. Os custos mudam a leitura do resultado.' : 'Revenue rises, but margin falls. Costs change how we read the result.'}</p>
        <a className="text-link" href={routeHref(locale, 'article')}>{pt ? 'Explorar os dados e a análise' : 'Explore the data and analysis'}<Arrow /></a>
      </figure>}
      {study !== 'analysis' && <div className="study-work-note">
        <p>{pt ? 'Um exemplo do meu raciocínio' : 'An example of my reasoning'}</p>
        <a href={routeHref(locale, 'article')}><strong>{pt ? 'A receita cresceu. O negócio melhorou?' : 'Revenue grew. Did the business improve?'}</strong><Arrow /></a>
        <span>{pt ? 'Experimento interativo · dados sintéticos · não representa resultados de clientes' : 'Interactive experiment · synthetic data · not client results'}</span>
      </div>}
    </div>
  </section>;
}

