import type { ComponentProps } from 'react';
import BlogArticlePageImpl from '../../src/pages/blog/[slug]';

export { getStaticPaths, getStaticProps } from '@/lib/route-data/blog-slug';

export default function BlogArticlePage(props: ComponentProps<typeof BlogArticlePageImpl>) {
  return <BlogArticlePageImpl {...props} />;
}
