import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { CmsPageSkeleton } from '@/components/skeletons';
import { useArticleQuery } from '@/hooks/queries';
import { AppLink } from '@/lib/app-link';
import { routes } from '@/lib/routes';
import { ArticleDetailView } from '@/modules/blog/views/ArticleDetailView';

/** Shared client entry for Vite/news routes — Next blog uses `src/pages/blog/[slug].tsx`. */
export function ArticleDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : undefined;
  const { data: article, isLoading, isError } = useArticleQuery(slug);

  if (isLoading || !router.isReady) {
    return <CmsPageSkeleton variant="article" />;
  }

  if (isError || !article) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Article not found</h1>
        <AppLink
          href={routes.home}
          className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline"
        >
          <ArrowLeft size={16} />
          Back to home
        </AppLink>
      </main>
    );
  }

  return <ArticleDetailView article={article} />;
}
