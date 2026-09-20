export type Channel = 'all' | 'online' | 'store';
export type Metric = 'revenue' | 'margin';
export type SalesRow = {
  month: number;
  channel: Exclude<Channel, 'all'>;
  revenue: number;
  cost: number;
};

// Synthetic BRL figures for an educational example, not client results.
export const sales: SalesRow[] = [
  { month: 1, channel: 'online', revenue: 48000, cost: 30000 },
  { month: 1, channel: 'store', revenue: 32000, cost: 18000 },
  { month: 2, channel: 'online', revenue: 55000, cost: 35000 },
  { month: 2, channel: 'store', revenue: 36000, cost: 21000 },
  { month: 3, channel: 'online', revenue: 64000, cost: 44000 },
  { month: 3, channel: 'store', revenue: 39000, cost: 23000 },
  { month: 4, channel: 'online', revenue: 74000, cost: 53000 },
  { month: 4, channel: 'store', revenue: 41000, cost: 25000 },
  { month: 5, channel: 'online', revenue: 84000, cost: 63000 },
  { month: 5, channel: 'store', revenue: 40000, cost: 24000 },
  { month: 6, channel: 'online', revenue: 96000, cost: 76000 },
  { month: 6, channel: 'store', revenue: 42000, cost: 26000 },
];

export function summarize(rows: SalesRow[]) {
  const revenue = rows.reduce((total, row) => total + row.revenue, 0);
  const cost = rows.reduce((total, row) => total + row.cost, 0);
  return {
    revenue,
    cost,
    profit: revenue - cost,
    margin: revenue === 0 ? 0 : ((revenue - cost) / revenue) * 100,
  };
}

export function monthlySales(channel: Channel) {
  return Array.from({ length: 6 }, (_, index) => {
    const month = index + 1;
    return {
      month,
      ...summarize(
        sales.filter(
          (row) => row.month === month && (channel === 'all' || row.channel === channel),
        ),
      ),
    };
  });
}
