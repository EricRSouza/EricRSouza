import type { Locale } from '../lib/routes';

export function ProjectVisual({ kind, locale }: { kind: 'finance' | 'explorer'; locale: Locale }) {
  const pt = locale === 'pt';
  if (kind === 'explorer')
    return (
      <div className="project-visual explorer-visual" aria-hidden="true">
        <div className="visual-topline">
          <span>{pt ? 'UM NÚMERO NÃO CONTA TUDO' : 'ONE NUMBER IS NOT THE WHOLE STORY'}</span>
          <span>↗</span>
        </div>
        <div className="comparison">
          <div>
            <span>{pt ? 'Receita' : 'Revenue'}</span>
            <strong>
              {pt ? '+72,5' : '+72.5'}
              <small>%</small>
            </strong>
            <svg viewBox="0 0 230 70">
              <path d="M5 65 48 57 92 48 136 36 180 25 225 7" />
            </svg>
          </div>
          <div>
            <span>{pt ? 'Margem' : 'Margin'}</span>
            <strong>
              {pt ? '−13,9' : '−13.9'}
              <small>{pt ? 'p.p.' : 'pp'}</small>
            </strong>
            <svg viewBox="0 0 230 70">
              <path d="M5 8 48 15 92 27 136 39 180 48 225 64" />
            </svg>
          </div>
        </div>
        <span className="visual-caption">
          {pt ? 'Jan → Jun · exemplo sintético' : 'Jan → Jun · synthetic example'}
        </span>
      </div>
    );
  return (
    <div className="project-visual finance-visual" aria-hidden="true">
      <div className="visual-topline">
        <span>{pt ? 'DO DADO À VISÃO DE NEGÓCIO' : 'FROM DATA TO BUSINESS CONTEXT'}</span>
        <span>↗</span>
      </div>
      <div className="data-model">
        <div className="model-sources">
          <span>{pt ? 'Financeiro' : 'Finance'}</span>
          <span>{pt ? 'Produtos' : 'Products'}</span>
          <span>{pt ? 'Clientes' : 'Customers'}</span>
        </div>
        <div className="model-connector" />
        <div className="model-core">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="3" y="17" width="6" height="12" rx="1" />
            <rect x="13" y="9" width="6" height="20" rx="1" />
            <rect x="23" y="3" width="6" height="26" rx="1" />
          </svg>
          <strong>Power BI</strong>
          <span>{pt ? 'Uma visão integrada' : 'A connected view'}</span>
        </div>
      </div>
      <span className="visual-caption">
        {pt ? 'Diagrama conceitual do escopo' : 'Conceptual scope diagram'}
      </span>
    </div>
  );
}
