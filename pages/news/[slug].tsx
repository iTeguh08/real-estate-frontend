import type { ComponentProps } from 'react';
import NewsArticlePageImpl from '../../src/pages/news/[slug]';

export { getStaticPaths, getStaticProps } from '@/lib/route-data/news-slug';

export default function NewsArticlePage(props: ComponentProps<typeof NewsArticlePageImpl>) {
  return <NewsArticlePageImpl {...props} />;
}
