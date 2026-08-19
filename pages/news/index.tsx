import type { ComponentProps } from 'react';
import NewsPageImpl from '../../src/pages/news/index';

export { getStaticProps } from '@/lib/route-data/news-index';

export default function NewsPage(props: ComponentProps<typeof NewsPageImpl>) {
  return <NewsPageImpl {...props} />;
}
