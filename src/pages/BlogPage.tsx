import { Link } from 'react-router-dom';
import { ArticleCard } from '@/components/cards/ArticleCard';
import { SITE_CONFIG } from '@/data/site-config';
import { useArticlesQuery } from '@/hooks/queries';
import { routes } from '@/lib/routes';

export function BlogPage() {
  const { data: articles = [], isLoading, isError } = useArticlesQuery();

  return (
    <main id="main-content" className="bg-white py-16 md:py-20">
      <div className="section-container">
        <header className="mb-12 max-w-2xl">
          <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
            Latest News
          </p>
          <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[36px]">
            {SITE_CONFIG.brand} Guides & Insights
          </h1>
          <p className="mt-4 font-poppins text-sm leading-relaxed text-hz-muted">
            Market updates, buyer guides, and expert tips for your real estate journey.
          </p>
        </header>

        {isError && (
          <p className="font-poppins text-sm text-hz-primary" role="alert">
            Unable to load articles. Please try again later.
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[16/10] rounded-hz bg-hz-bg-soft" />
                <div className="h-4 w-3/4 rounded-hz bg-hz-bg-soft" />
                <div className="h-3 w-full rounded-hz bg-hz-bg-soft" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        <p className="mt-12 text-center">
          <Link
            to={routes.home}
            className="font-poppins text-sm font-medium text-hz-body no-underline transition-colors hover:text-hz-primary"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
