import { renderToString } from 'react-dom/server';
import { App } from './App';
import { paths, legacyPaths, resolveRoute } from './lib/routes';
import { pageMetadata } from './lib/content';
export { sales } from './lib/analytics';

export const routes = [
  ...Object.values(paths.pt),
  ...Object.values(paths.en),
  ...Object.keys(legacyPaths),
  '/404.html',
];
export function render(path: string) {
  const { locale, page } = resolveRoute(path);
  return {
    html: renderToString(<App path={path} />),
    locale,
    page,
    canonical: paths[locale][page],
    alternates: { pt: paths.pt[page], en: paths.en[page] },
    ...pageMetadata(locale, page),
  };
}
