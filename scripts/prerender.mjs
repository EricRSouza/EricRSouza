import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { render, routes, sales } from '../.build/entry-server.js';

const origin = 'https://ericrsouza.github.io';
const base = '/EricRSouza/';
const site = origin + base.slice(0, -1);
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const canonicalUrls = new Set();

// Render each known URL at build time. Production serves only static files.
for (const route of routes) {
  const page = render(route);
  const canonical = site + page.canonical;
  const is404 = page.page === 'not-found';
  if (!is404) canonicalUrls.add(canonical);
  const meta = [
    is404
      ? '<meta name="robots" content="noindex,follow" />'
      : `<link rel="canonical" href="${canonical}" />`,
    ...Object.entries(page.alternates).map(
      ([locale, path]) =>
        `<link rel="alternate" hreflang="${locale === 'pt' ? 'pt-BR' : 'en'}" href="${site + path}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${site + page.alternates.pt}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:type" content="${page.page === 'article' || page.page === 'first-post' ? 'article' : 'website'}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${site}/social-card.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta property="og:locale" content="${page.locale === 'pt' ? 'pt_BR' : 'en_US'}" />`,
    `<link rel="alternate" type="application/rss+xml" title="Eric Ramos Souza — Blog" href="${base}${page.locale === 'en' ? 'en/' : ''}feed.xml" />`,
  ].join('\n    ');
  const html = template
    .replace('lang="pt-BR"', `lang="${page.locale === 'pt' ? 'pt-BR' : 'en'}"`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escape(page.description)}" />`,
    )
    .replace('<!--page-meta-->', meta)
    .replace('<div id="root">', `<div id="root" data-route="${route}">`)
    .replace('<!--app-html-->', page.html);
  const file = join(
    'dist',
    route.endsWith('.html') ? route.slice(1) : route.slice(1) + 'index.html',
  );
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...canonicalUrls].map((url) => `<url><loc>${url}</loc></url>`).join('')}</urlset>`,
);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
await writeFile('dist/.nojekyll', '');
await mkdir('dist/data', { recursive: true });
await writeFile(
  'dist/data/revenue-demo.csv',
  'month,channel,revenue_brl,cost_brl\n' +
    sales.map((row) => `${row.month},${row.channel},${row.revenue},${row.cost}`).join('\n') +
    '\n',
);
for (const locale of ['pt', 'en']) {
  const articles =
    locale === 'pt'
      ? ['/blog/receita-e-margem/', '/blog/primeiro-post/']
      : ['/en/blog/revenue-and-margin/', '/en/blog/first-post/'];
  const channel = `<title>Eric Ramos Souza — Blog</title><link>${site}/${locale === 'en' ? 'en/' : ''}blog/</link><description>${locale === 'pt' ? 'Análises e experimentos com dados.' : 'Data analyses and experiments.'}</description><language>${locale === 'pt' ? 'pt-BR' : 'en'}</language>`;
  const items = articles
    .map((route, index) => {
      const page = render(route);
      return `<item><title>${escape(page.title)}</title><link>${site + route}</link><guid>${site + route}</guid><description>${escape(page.description)}</description><pubDate>${index === 0 ? 'Sun, 20 Sep 2026' : 'Mon, 05 Aug 2024'} 12:00:00 GMT</pubDate></item>`;
    })
    .join('');
  await writeFile(
    `dist/${locale === 'en' ? 'en/' : ''}feed.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>${channel}${items}</channel></rss>`,
  );
}
console.log(`Pre-rendered ${routes.length} routes, bilingual RSS, sitemap and demo dataset.`);
