import { useArticlesQuery } from '@/hooks/queries';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useAppSearchParams } from '@/lib/app-router';
import { BlogView } from '@/modules/blog/views/BlogView';

/** Vite SPA entry — fetches client-side. Next uses `src/pages/blog/index.tsx`. */
export function BlogPage() {
  const [searchParams] = useAppSearchParams();
  const activeTag = searchParams.get('tag')?.trim() || undefined;
  const { data: articles = [], isPending, isError } = useArticlesQuery('blog', activeTag);
  const { data: siteConfig } = useSiteConfig();
  return (
    <BlogView
      articles={articles}
      brand={siteConfig?.brand ?? 'Homzen'}
      isLoading={isPending}
      isError={isError}
    />
  );
}
