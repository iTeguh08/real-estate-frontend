import { NewsView } from '@/modules/blog/views/NewsView';
import { useArticlesQuery } from '@/hooks/queries';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useAppSearchParams } from '@/lib/app-router';

/** Vite SPA entry — Next.js uses `src/pages/news/index.tsx`. */
export function NewsPage() {
  const [searchParams] = useAppSearchParams();
  const activeTag = searchParams.get('tag')?.trim() || undefined;
  const { data: articles = [], isLoading, isError } = useArticlesQuery('news', activeTag);
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? 'Homzen';

  return (
    <NewsView
      articles={articles}
      brand={brand}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
