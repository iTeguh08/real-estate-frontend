import { AGENTS } from '@/data/agents';
import { ARTICLES } from '@/data/articles';
import { absoluteUrl, getSiteOrigin } from '@/lib/runtime-env';
import { routes } from '@/lib/routes';
import { withSsgFallback } from '@/lib/ssg';
import { getAgents } from '@/services/agents.service';
import { getArticles } from '@/services/articles.service';
import {
  getBestValueProperties,
  getFeaturedProperties,
  searchProperties,
} from '@/services/properties.service';
import { DEFAULT_LISTING_FILTERS } from '@/types';

const SITE_FALLBACK_ORIGIN = 'https://baliestate.web.id';

const MARKETING_PATHS = [
  routes.home,
  routes.listings,
  routes.about,
  routes.contact,
  routes.agents,
  routes.blog,
  routes.news,
  routes.privacy,
  routes.terms,
  routes.cookies,
] as const;

function siteOrigin(): string {
  return getSiteOrigin() || SITE_FALLBACK_ORIGIN;
}

function loc(path: string): string {
  return absoluteUrl(path) || `${siteOrigin()}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildRobotsTxt(): string {
  const sitemap = loc('/sitemap.xml');
  return [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /dashboard',
    'Disallow: /wishlist',
    'Disallow: /compare',
    'Disallow: /submit-property',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
}

export function buildLlmsTxt(): string {
  const origin = siteOrigin();
  return [
    '# Homzen',
    '',
    `> Luxury real estate — villas, homes, and apartments for sale and rent in Bali.`,
    '',
    `Site: ${origin}/`,
    `Listings: ${origin}${routes.listings}`,
    `Agents: ${origin}${routes.agents}`,
    `About: ${origin}${routes.about}`,
    `Contact: ${origin}${routes.contact}`,
    `Blog: ${origin}${routes.blog}`,
    `News: ${origin}${routes.news}`,
    '',
    '## Contact',
    '',
    'Email: info@homzen.com',
    '',
  ].join('\n');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildSitemapXml(): Promise<string> {
  const paths = await collectSitemapPaths();
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${escapeXml(loc(path))}</loc>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function collectSitemapPaths(): Promise<string[]> {
  const [featured, bestValue, searchResult, agents, blog, news] = await Promise.all([
    withSsgFallback('sitemap:featured', getFeaturedProperties, []),
    withSsgFallback('sitemap:bestValue', getBestValueProperties, []),
    withSsgFallback(
      'sitemap:search',
      () => searchProperties({ ...DEFAULT_LISTING_FILTERS, perPage: 100, page: 1 }),
      { items: [], total: 0, page: 1, perPage: 100, lastPage: 1 }
    ),
    withSsgFallback('sitemap:agents', getAgents, AGENTS),
    withSsgFallback(
      'sitemap:blog',
      () => getArticles('blog'),
      ARTICLES.filter((item) => item.category === 'blog')
    ),
    withSsgFallback(
      'sitemap:news',
      () => getArticles('news'),
      ARTICLES.filter((item) => item.category === 'news')
    ),
  ]);

  const propertySlugs = new Set(
    [...featured, ...bestValue, ...searchResult.items]
      .map((item) => item.slug)
      .filter(Boolean)
  );

  const dynamic = [
    ...[...propertySlugs].map((slug) => routes.property(slug)),
    ...agents.map((agent) => routes.agent(agent.slug)),
    ...blog.map((article) => routes.blogArticle(article.slug)),
    ...news.map((article) => routes.newsArticle(article.slug)),
  ];

  return [...MARKETING_PATHS, ...dynamic];
}
