import { ArticleCard } from '@/components/cards/ArticleCard';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { ArticleCardSkeleton } from '@/components/skeletons';
import { AppLink } from '@/lib/app-link';
import { useAppSearchParams } from '@/lib/app-router';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

export interface BlogViewProps {
  articles?: Article[];
  brand?: string;
  isLoading?: boolean;
  isError?: boolean;
}

export function BlogView({
  articles: initialArticles,
  brand = 'Homzen',
  isLoading = false,
  isError = false,
}: BlogViewProps) {
  const [searchParams] = useAppSearchParams();
  const activeTag = searchParams.get('tag')?.trim() || undefined;
  const articles = (initialArticles ?? []).filter((article) =>
    activeTag ? article.tags.includes(activeTag) : true
  );

  return (
    <main id="main-content" className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
      <SectionAtmosphere
        tone="soft"
        surface="elevated"
        intensity="default"
        variant="ambient"
        side="left"
        image="blog-arches"
        photoOpacity={0.1}
        photoScrimMix={32}
        photoFade="balanced"
        className="max-md:hidden"
      />
      <div className="section-container relative z-10">
        <header className="mb-12 max-w-2xl">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Blog
          </p>
          <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]">
            {brand} Guides & Insights
          </h1>
          <p className="mt-4 font-poppins text-sm leading-relaxed text-hz-muted">
            Buyer guides, expert tips, and practical advice for your real estate journey.
          </p>
          {activeTag && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-hz bg-hz-bg-soft px-3 py-1 font-poppins text-xs font-medium text-hz-body">
                Tag: {activeTag}
              </span>
              <AppLink
                href={routes.blog}
                className="font-poppins text-sm font-medium text-hz-primary no-underline transition-colors hover:text-hz-primary-hover"
              >
                Clear filter
              </AppLink>
            </div>
          )}
        </header>

        {isError ? (
          <p className="font-poppins text-sm text-hz-primary" role="alert">
            Unable to load blog articles. Please try again later.
          </p>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-18 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-hz border border-hz-border bg-hz-sunken px-6 py-16 text-center">
            <p className="font-poppins text-lg font-semibold text-hz-dark">
              {activeTag ? 'No blog articles match this tag' : 'No blog articles yet'}
            </p>
            <p className="mt-2 font-poppins text-sm text-hz-muted">
              {activeTag
                ? 'Try clearing the filter to browse all blog articles.'
                : 'Check back soon for guides and insights.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-18 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <p className="mt-12 text-center">
          <AppLink
            href={routes.home}
            className="font-poppins text-sm font-medium text-hz-body no-underline transition-colors hover:text-hz-primary"
          >
            ← Back to home
          </AppLink>
        </p>
      </div>
    </main>
  );
}
