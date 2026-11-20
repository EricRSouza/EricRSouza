import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, path, type Lang } from './i18n';

export type Post = CollectionEntry<'posts'> & { lang: Lang; slug: string };

/** Splits a collection id like `pt/cross-sell-dashboard` into language and slug. Fails the build on a bad folder. */
function withLang(entry: CollectionEntry<'posts'>): Post {
  const [lang, ...rest] = entry.id.split('/');
  if (!lang || !isLang(lang) || rest.length === 0) {
    throw new Error(`Post "${entry.id}" must live in src/content/posts/<en|pt>/`);
  }
  return { ...entry, lang, slug: rest.join('/') };
}

/** All published posts (plus drafts in dev), newest first. */
export async function getPosts(lang?: Lang) {
  const entries = await getCollection('posts', (e) => import.meta.env.DEV || !e.data.draft);
  return entries
    .map(withLang)
    .filter((p) => !lang || p.lang === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** `getStaticPaths` result for one language's post pages, pairing each post with its translation. */
export async function postPaths(lang: Lang) {
  const all = await getPosts();
  return all
    .filter((p) => p.lang === lang)
    .map((post) => ({
      params: { slug: post.slug },
      props: { post, translation: all.find((p) => p.lang !== lang && p.slug === post.slug) },
    }));
}

export function postUrl(post: Pick<Post, 'lang' | 'slug'>) {
  return path(post.lang, `/blog/${post.slug}/`);
}

/** URL-safe key for a tag, used in the `?tag=` filter. */
export function tagKey(tag: string) {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
