import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticleQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticleQuery(slug);

  if (isLoading) {
    return (
      <main id="main-content" className="section-container max-w-3xl py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded-hz bg-hz-bg-soft" />
          <div className="h-10 w-full rounded-hz bg-hz-bg-soft" />
          <div className="aspect-[16/10] rounded-hz bg-hz-bg-soft" />
          <div className="h-4 w-full rounded-hz bg-hz-bg-soft" />
          <div className="h-4 w-5/6 rounded-hz bg-hz-bg-soft" />
        </div>
      </main>
    );
  }

  if (isError || !article) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Article not found</h1>
        <Link
          to={routes.blog}
          className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-white py-12 md:py-16">
      <article className="section-container max-w-3xl">
        <Link
          to={routes.blog}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          All articles
        </Link>

        <p className="font-poppins text-xs text-hz-muted">
          {article.category} <span aria-hidden="true">•</span> {article.publishedAt}
        </p>
        <h1 className="mt-3 font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]">
          {article.title}
        </h1>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-hz bg-hz-bg-soft">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-8 font-poppins text-base leading-[1.75] text-hz-body">
          {article.body ?? article.excerpt}
        </p>
      </article>
    </main>
  );
}
