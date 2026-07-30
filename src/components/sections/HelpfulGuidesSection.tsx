import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { ARTICLE_PREVIEW_COUNT } from '@/data/articles';
import { SITE_CONFIG } from '@/data/site-config';
import { useArticlesQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

interface HelpfulGuidesSectionProps {
  articles?: Article[];
}

export function HelpfulGuidesSection({ articles: articlesProp }: HelpfulGuidesSectionProps) {
  const { data: fetchedArticles = [], isLoading } = useArticlesQuery('news');
  const articles = articlesProp ?? fetchedArticles;
  const previewArticles = articles.slice(0, ARTICLE_PREVIEW_COUNT);

  return (
    <section
      id="news"
      className="relative w-full overflow-hidden bg-hz-deep py-16 text-hz-deep-fg md:py-20"
      aria-labelledby="news-heading"
    >
      <SectionAtmosphere
        tone="dark"
        surface="deep"
        intensity="default"
        variant="edge"
        side="right"
        image="interior-dark"
        photoOpacity={0.55}
      />
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <header className="text-center sm:text-left">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Latest News
            </p>
            <h2
              id="news-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-deep-fg md:text-[36px]"
            >
              {SITE_CONFIG.brand} Market Updates
            </h2>
          </header>

          <Link
            to={routes.news}
            className="inline-flex shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-deep-fg/70 no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1"
            aria-label="See all news articles"
          >
            See All News
            <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        {isLoading && !articlesProp ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ARTICLE_PREVIEW_COUNT }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[16/10] rounded-hz bg-hz-deep-fg/10" />
                <div className="h-4 w-3/4 rounded-hz bg-hz-deep-fg/10" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
            role="list"
            aria-label="Latest news articles"
          >
            {previewArticles.map((article) => (
              <div key={article.id} role="listitem">
                <ArticleCard article={article} tone="dark" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
