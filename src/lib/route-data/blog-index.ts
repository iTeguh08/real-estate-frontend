
import { ARTICLES } from '@/data/articles';
import { SITE_CONFIG } from '@/data/site-config';
import { jsonSafe, withSsgFallback } from '@/lib/ssg';
import { getArticles } from '@/services/articles.service';

const REVALIDATE_SECONDS = 60;

export async function getStaticProps() {
  const articles = await withSsgFallback(
    'blogArticles',
    () => getArticles('blog'),
    ARTICLES.filter((item) => item.category === 'blog')
  );

  return {
    props: jsonSafe({
      articles,
      brand: SITE_CONFIG.brand,
    }),
    notFound: false,
    revalidate: REVALIDATE_SECONDS,
  };
}
