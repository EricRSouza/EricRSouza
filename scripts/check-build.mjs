import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? htmlFiles(join(dir, entry.name))
          : entry.name.endsWith('.html')
            ? [join(dir, entry.name)]
            : [],
      ),
    )
  ).flat();
}
const files = await htmlFiles('dist');
assert(files.length >= 20, 'Missing pre-rendered pages');
for (const file of files) {
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: expected exactly one h1`);
  assert(html.includes('mailto:ericr.souza@outlook.com'), `${file}: missing confirmed contact`);
  assert(!html.includes('<!--app-html-->'), `${file}: missing server-rendered content`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!href.startsWith('/EricRSouza/')) continue;
    const path = href.split(/[?#]/)[0].replace('/EricRSouza/', '');
    const target = join('dist', !path || path.endsWith('/') ? `${path}index.html` : path);
    assert((await stat(target).catch(() => null))?.isFile(), `${file}: broken local link ${href}`);
  }
}
const pt = await readFile('dist/blog/receita-e-margem/index.html', 'utf8');
const en = await readFile('dist/en/blog/revenue-and-margin/index.html', 'utf8');
assert(pt.includes('lang="pt-BR"') && pt.includes('Crescimento é o começo da pergunta'));
assert(en.includes('lang="en"') && en.includes('Growth is the beginning of the question'));
assert(pt.includes('href="https://ericrsouza.github.io/EricRSouza/blog/receita-e-margem/"'));
for (const internal of ['AGENTS.md', 'README.md', 'scripts', 'src', '.github']) {
  assert.equal(
    await stat(join('dist', internal)).catch(() => null),
    null,
    `${internal} leaked into public build`,
  );
}
console.log(
  `Validated ${files.length} HTML pages, local assets/links, translations and publication boundaries.`,
);
