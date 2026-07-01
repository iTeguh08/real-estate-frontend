import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { ARTICLE_PREVIEW_COUNT } from '@/data/articles';
import { SITE_CONFIG } from '@/data/site-config';
import { useArticlesQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';
import type { Article } from '@/types';

interface HelpfulGuidesSectionProps {
  articles?: Article[];
}

export function HelpfulGuidesSection({ articles: articlesProp }: HelpfulGuidesSectionProps) {
  const { data: fetchedArticles = [], isLoading } = useArticlesQuery();
  const articles = articlesProp ?? fetchedArticles;
  const previewArticles = articles.slice(0, ARTICLE_PREVIEW_COUNT);

  return (
    <section
      id="blog"
      className="w-full bg-white py-16 md:py-20"
      aria-labelledby="guides-heading"
    >
      <div className="section-container">
        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-between">
          <header className="text-center sm:text-left">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Latest News
            </p>
            <h2
              id="guides-heading"
              className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]"
            >
              Helpful {SITE_CONFIG.brand} Guides
            </h2>
          </header>

          <Link
            to={routes.blog}
            className="inline-flex shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1"
            aria-label="See all articles"
          >
            See All Articles
            <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </div>

        {isLoading && !articlesProp ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ARTICLE_PREVIEW_COUNT }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[16/10] rounded-hz bg-hz-bg-soft" />
                <div className="h-4 w-3/4 rounded-hz bg-hz-bg-soft" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3"
            role="list"
            aria-label="Helpful guides and articles"
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
