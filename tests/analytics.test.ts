import test from 'node:test';
import assert from 'node:assert/strict';
import { monthlySales, sales, summarize } from '../src/lib/analytics.ts';

test('period margin uses totals, not an unweighted average of percentages', () => {
  const result = summarize(sales);
  assert.equal(result.revenue, 651000);
  assert.equal(result.cost, 438000);
  assert.equal(result.profit, 213000);
  assert.equal(result.margin, (213000 / 651000) * 100);
  assert.notEqual(result.margin, monthlySales('all').reduce((sum, row) => sum + row.margin, 0) / 6);
});

test('channel filtering preserves monthly totals and article claims', () => {
  const all = monthlySales('all');
  const online = monthlySales('online');
  const store = monthlySales('store');
  all.forEach((row, index) => {
    assert.equal(row.revenue, online[index].revenue + store[index].revenue);
    assert.equal(row.cost, online[index].cost + store[index].cost);
  });
  assert.equal(((all[5].revenue - all[0].revenue) / all[0].revenue) * 100, 72.5);
  assert.equal(all[0].margin, 40);
  assert.equal(all[5].margin.toFixed(1), '26.1');
  assert.equal((all[5].margin - all[0].margin).toFixed(1), '-13.9');
});

test('empty or zero-revenue data produce finite results', () => {
  assert.deepEqual(summarize([]), { revenue: 0, cost: 0, profit: 0, margin: 0 });
  assert.equal(summarize([{ month: 1, channel: 'online', revenue: 0, cost: 10 }]).margin, 0);
});
