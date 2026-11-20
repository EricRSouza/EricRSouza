// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ericramos.com.br',
  trailingSlash: 'ignore',
  integrations: [
    mdx(),
    // React powers interactive islands inside posts (charts, simulators, dashboards).
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR' } },
    }),
  ],
});
