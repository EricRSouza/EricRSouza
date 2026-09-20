import test from 'node:test';
import assert from 'node:assert/strict';
import { paths, resolveRoute, canHydrateRoute } from '../src/lib/routes.ts';

test('every translated page resolves to the same content identity', () => {
  for (const locale of ['pt', 'en'] as const) {
    for (const [page, path] of Object.entries(paths[locale])) {
      assert.deepEqual(resolveRoute(path), { locale, page });
    }
  }
});

test('Pages fallback keeps the requested language without hydrating different HTML', () => {
  assert.equal(canHydrateRoute('/en/not-a-page/', '/404.html'), false);
  assert.deepEqual(resolveRoute('/en/not-a-page/'), { locale: 'en', page: 'not-found' });
  assert.equal(canHydrateRoute('/missing/', '/404.html'), true);
  assert.equal(canHydrateRoute('/en/', '/en/'), true);
  assert.equal(canHydrateRoute('/missing/', '/'), false);
});
test('old public links remain readable and unknown URLs become 404', () => {
  assert.deepEqual(resolveRoute('/blog.html'), { locale: 'pt', page: 'blog' });
  assert.deepEqual(resolveRoute('/analytics/2024/08/05/primeiro-post.html'), {
    locale: 'pt',
    page: 'first-post',
  });
  assert.deepEqual(resolveRoute('/en/projects'), { locale: 'en', page: 'projects' });
  assert.deepEqual(resolveRoute('/missing'), { locale: 'pt', page: 'not-found' });
});
