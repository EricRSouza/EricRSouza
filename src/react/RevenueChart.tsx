import { useId, useState } from 'react';
import { monthlySales, sales, summarize } from '../lib/analytics';
import type { Channel, Metric } from '../lib/analytics';
import type { Lang as Locale } from '../i18n';

export function RevenueChart({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const [channel, setChannel] = useState<Channel>('all');
  const [metric, setMetric] = useState<Metric>('revenue');
  const [selectedIndex, setSelectedIndex] = useState(5);
  const id = useId();
  const pt = locale === 'pt';
  const format = new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', { maximumFractionDigits: 1 });
  const money = (value: number) =>
    new Intl.NumberFormat(pt ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  const months = pt
    ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = monthlySales(channel);
  const totals = summarize(sales.filter((row) => channel === 'all' || row.channel === channel));
  const max = metric === 'revenue' ? 160000 : 50;
  const value = (row: (typeof data)[number]) => (metric === 'revenue' ? row.revenue : row.margin);
  const valueLabel = (n: number) => (metric === 'revenue' ? money(n) : `${format.format(n)}%`);
  const barLabel = (n: number) =>
    metric === 'revenue' ? `${Math.round(n / 1000)}k` : `${format.format(n)}%`;

  const first = data[0];
  const last = data[data.length - 1];
  const revenueDelta = first && last && first.revenue > 0 ? ((last.revenue - first.revenue) / first.revenue) * 100 : 0;
  const marginDelta = first && last ? last.margin - first.margin : 0;
  const formatSigned = (n: number) => `${n >= 0 ? '+' : '−'}${format.format(Math.abs(n))}`;
  const activeRow = data[selectedIndex] ?? last;

  return (
    <div className={`revenue-chart ${compact ? 'compact' : ''}`}>
      <div className="chart-heading">
        <span className="tiny-label">
          {pt ? 'EXPLORADOR DE RESULTADOS' : 'PERFORMANCE EXPLORER'}
        </span>
        <span className="demo-badge">{pt ? 'Dados sintéticos' : 'Synthetic data'}</span>
      </div>
      <div className={`chart-controls ${compact ? 'is-compact' : ''}`}>
        <div
          className="segmented"
          role="group"
          aria-label={pt ? 'Métrica do gráfico' : 'Chart metric'}
        >
          <button
            type="button"
            aria-pressed={metric === 'revenue'}
            onClick={() => setMetric('revenue')}
          >
            {pt ? 'Receita' : 'Revenue'}
          </button>
          <button
            type="button"
            aria-pressed={metric === 'margin'}
            onClick={() => setMetric('margin')}
          >
            {pt ? 'Margem' : 'Margin'}
          </button>
        </div>
        {!compact && (
          <label htmlFor={`${id}-channel`}>
            {pt ? 'Canal' : 'Channel'}
            <select
              id={`${id}-channel`}
              value={channel}
              onChange={(event) => {
                const next = event.target.value;
                if (next === 'all' || next === 'online' || next === 'store') setChannel(next);
              }}
            >
              <option value="all">{pt ? 'Todos os canais' : 'All channels'}</option>
              <option value="online">Online</option>
              <option value="store">{pt ? 'Loja física' : 'Store'}</option>
            </select>
          </label>
        )}
      </div>
      <div className="chart-kpis" aria-live="polite" aria-atomic="true">
        <div>
          <span>{pt ? 'Receita no semestre' : 'Six-month revenue'}</span>
          <strong>{money(totals.revenue)}</strong>
          <em className="kpi-delta is-up">
            {pt ? `Jan→Jun: ${formatSigned(revenueDelta)}%` : `Jan→Jun: ${formatSigned(revenueDelta)}%`}
          </em>
        </div>
        <div>
          <span>{pt ? 'Margem no semestre' : 'Six-month margin'}</span>
          <strong>
            {format.format(totals.margin)}
            <small>%</small>
          </strong>
          <em className={`kpi-delta ${marginDelta < 0 ? 'is-down' : 'is-up'}`}>
            {pt ? `Jan→Jun: ${formatSigned(marginDelta)} p.p.` : `Jan→Jun: ${formatSigned(marginDelta)} pp`}
          </em>
        </div>
      </div>
      {activeRow && (
        <div className="chart-readout" aria-live="polite">
          <strong>{months[activeRow.month - 1]}</strong>
          <span>
            {pt ? 'Receita' : 'Revenue'}: {money(activeRow.revenue)}
          </span>
          <span>
            {pt ? 'Custo' : 'Cost'}: {money(activeRow.cost)}
          </span>
          <span>
            {pt ? 'Margem' : 'Margin'}: {format.format(activeRow.margin)}%
          </span>
        </div>
      )}
      <svg
        className="bar-chart"
        viewBox="0 0 540 255"
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>
          {metric === 'revenue'
            ? pt
              ? 'Receita mensal em reais'
              : 'Monthly revenue in Brazilian reais'
            : pt
              ? 'Margem mensal em porcentagem'
              : 'Monthly margin in percent'}
        </title>
        <desc id={`${id}-desc`}>
          {data.map((row) => `${months[row.month - 1]}: ${valueLabel(value(row))}`).join('; ')}
        </desc>
        {[0, 1, 2, 3, 4].map((tick) => (
          <g key={tick}>
            <line
              x1="56"
              x2="528"
              y1={215 - tick * 44}
              y2={215 - tick * 44}
              stroke="#D1D5DB"
              strokeDasharray={tick ? '3 5' : undefined}
            />
            <text x="46" y={219 - tick * 44} textAnchor="end" className="chart-axis">
              {metric === 'revenue' ? `${tick * 40}k` : `${format.format(tick * 12.5)}%`}
            </text>
          </g>
        ))}
        {data.map((row, index) => {
          const val = value(row);
          const barHeight = (val / max) * 176;
          const barY = 215 - barHeight;
          const isSelected = index === selectedIndex;
          return (
            <g
              key={row.month}
              className={`chart-bar-group ${isSelected ? 'is-selected' : ''}`}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`${months[index]}: ${valueLabel(val)}`}
              onMouseEnter={() => setSelectedIndex(index)}
              onFocus={() => setSelectedIndex(index)}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <rect
                x={74 + index * 77}
                y={barY}
                width="42"
                height={barHeight}
                rx="3"
                fill={isSelected ? '#0B1F3B' : '#1F6A8D'}
              />
              <text
                x={95 + index * 77}
                y={Math.max(16, barY - 8)}
                textAnchor="middle"
                className={`chart-value ${isSelected ? 'is-selected' : ''}`}
              >
                {barLabel(val)}
              </text>
              <text x={95 + index * 77} y="238" textAnchor="middle" className="chart-axis">
                {months[index]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="chart-note">
        <span className="legend-dot" />
        <span>
          {metric === 'revenue'
            ? pt
              ? 'Receita em R$ · barra escura indica o mês selecionado'
              : 'Revenue in BRL · dark bar marks the selected month'
            : pt
              ? 'Margem = (receita − custo) ÷ receita · barra escura indica o mês selecionado'
              : 'Margin = (revenue − cost) ÷ revenue · dark bar marks the selected month'}
        </span>
      </div>
      {!compact && (
        <details className="data-details">
          <summary>{pt ? 'Ver dados e metodologia' : 'View data and methodology'}</summary>
          <p>
            {pt
              ? 'Exemplo sintético, sem relação com uma empresa real. Custos simplificados; não representa lucro líquido. A margem do período é calculada sobre os totais, não pela média das porcentagens.'
              : 'Synthetic example, unrelated to any real company. Costs are simplified; this is not net profit. Period margin is calculated from totals, not by averaging percentages.'}
          </p>
          <div className="table-scroll">
            <table>
              <caption>
                {pt
                  ? 'Valores mensais para o canal selecionado'
                  : 'Monthly values for the selected channel'}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{pt ? 'Mês' : 'Month'}</th>
                  <th scope="col">{pt ? 'Receita' : 'Revenue'}</th>
                  <th scope="col">{pt ? 'Custo' : 'Cost'}</th>
                  <th scope="col">{pt ? 'Margem' : 'Margin'}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.month}>
                    <th scope="row">{months[row.month - 1]}</th>
                    <td>{money(row.revenue)}</td>
                    <td>{money(row.cost)}</td>
                    <td>{format.format(row.margin)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a
            className="text-link"
            href="/data/revenue-demo.csv"
            download
          >
            {pt ? 'Baixar os dados (CSV)' : 'Download the data (CSV)'}
          </a>
        </details>
      )}
    </div>
  );
}
