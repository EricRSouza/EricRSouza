import rss from '@astrojs/rss';
import { ui, type Lang } from './i18n';
import { getPosts, postUrl } from './posts';

/** RSS feed for one language; used by `/rss.xml` and `/pt/rss.xml`. */
export async function feed(lang: Lang, site: URL | undefined) {
  const posts = await getPosts(lang);
  return rss({
    title: 'Eric Ramos Souza',
    description: ui[lang].siteDescription,
    site: site ?? 'https://ericramos.com.br',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [ui[lang].types[post.data.type], ...post.data.tags],
    })),
  });
}
