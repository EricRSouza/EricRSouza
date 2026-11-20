import type { APIRoute } from 'astro';
import { sales } from '../../lib/analytics';

/** Synthetic dataset behind the revenue and margin explorer, offered as a download. */
export const GET: APIRoute = () => {
  const rows = sales.map((row) => [row.month, row.channel, row.revenue, row.cost].join(','));
  return new Response(['month,channel,revenue_brl,cost_brl', ...rows].join('\n') + '\n', {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
};
