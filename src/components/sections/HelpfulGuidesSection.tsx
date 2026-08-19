import { AppLink } from '@/lib/app-link';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { ArticleCardSkeleton, LoadingOverlay } from '@/components/skeletons';
import { ARTICLE_PREVIEW_COUNT } from '@/data/articles';
import { SITE_CONFIG } from '@/data/site-config';
import { useArticlesQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

interface HelpfulGuidesSectionProps {
  articles?: Article[];
}

export function HelpfulGuidesSection({ articles: articlesProp }: HelpfulGuidesSectionProps) {
  const { data: fetchedArticles = [], isPending } = useArticlesQuery('news');
  const articles = articlesProp ?? fetchedArticles;
  const showSkeleton = isPending && !articlesProp;
  const previewArticles = articles.slice(0, ARTICLE_PREVIEW_COUNT);

  return (
    <section
      id="news"
      className="section-defer relative w-full overflow-hidden bg-hz-page py-16 md:py-20"
      aria-labelledby="news-heading"
    >
      <div className="section-container relative z-10">
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-12">
          <header className="text-center sm:text-left">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Latest News
            </p>
            <h2
              id="news-heading"
              className="font-poppins hz-h2 font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark"
            >
              {SITE_CONFIG.brand} Market Updates
            </h2>
          </header>

          <AppLink
            to={routes.news}
            className="inline-flex shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1"
            aria-label="See all news articles"
          >
            See All News
            <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </AppLink>
        </div>

        {showSkeleton ? (
          <LoadingOverlay active minHeight="min-h-[400px]">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
              {Array.from({ length: ARTICLE_PREVIEW_COUNT }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          </LoadingOverlay>
        ) : (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300"
            role="list"
            aria-label="Latest news articles"
          >
            {previewArticles.map((article) => (
              <div key={article.id} role="listitem">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
