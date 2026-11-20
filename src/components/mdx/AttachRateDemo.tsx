import { useState } from 'react';

/**
 * Small interactive example for posts: how extra revenue grows with the cross-sell attach rate.
 * Use in MDX with `<AttachRateDemo client:visible />`.
 */
export default function AttachRateDemo({ customers = 1000, addOnValue = 40 }: { customers?: number; addOnValue?: number }) {
  const [rate, setRate] = useState(15);
  const extra = Math.round((customers * rate * addOnValue) / 100);
  const max = customers * addOnValue * 0.5;

  return (
    <figure style={{ margin: 0, fontFamily: 'var(--sans)' }}>
      <label style={{ display: 'grid', gap: '0.4rem' }}>
        <span>
          Attach rate: <strong>{rate}%</strong> of {customers.toLocaleString('en')} customers buy an add-on worth ${addOnValue}
        </span>
        <input type="range" min={0} max={50} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
      </label>
      <div
        role="img"
        aria-label={`Extra revenue: $${extra.toLocaleString('en')}`}
        style={{ marginTop: '1rem', height: '2.25rem', background: 'var(--rule)', borderRadius: 3, overflow: 'hidden' }}
      >
        <div style={{ width: `${(extra / max) * 100}%`, height: '100%', background: 'var(--t-case)', transition: 'width 120ms' }} />
      </div>
      <figcaption style={{ marginTop: '0.5rem', color: 'var(--muted)' }}>
        Extra revenue: <strong style={{ color: 'var(--ink)' }}>${extra.toLocaleString('en')}</strong>
      </figcaption>
    </figure>
  );
}
