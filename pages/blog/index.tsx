import type { ComponentProps } from 'react';
import BlogPageImpl from '../../src/pages/blog/index';

export { getStaticProps } from '@/lib/route-data/blog-index';

export default function BlogPage(props: ComponentProps<typeof BlogPageImpl>) {
  return <BlogPageImpl {...props} />;
}
