import { ArrowLeft } from 'lucide-react';
import { MediaImage } from '@/components/ui/media-image';
import { AppLink } from '@/lib/app-link';
import {
  getArticleCategoryLabel,
  getArticlesListPath,
  getArticleTagPath,
} from '@/lib/articles';
import { routes } from '@/lib/routes';
import { sanitizeHtml } from '@/lib/sanitize-html';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export interface ArticleDetailViewProps {
  article: Article;
}

export function ArticleDetailView({ article }: ArticleDetailViewProps) {
  const categoryLabel = getArticleCategoryLabel(article.category);
  const listPath = getArticlesListPath(article.category);
  const body = article.body ?? article.excerpt ?? '';
  const isHtml = looksLikeHtml(body);

  return (
    <main id="main-content" className="bg-hz-elevated py-12 md:py-16">
      <article className="section-container max-w-3xl">
        <AppLink
          href={listPath}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          All {categoryLabel.toLowerCase()} articles
        </AppLink>

        <p className="font-poppins text-xs text-hz-muted">
          {categoryLabel} <span aria-hidden="true">•</span> {article.publishedAt}
        </p>
        <h1 className="mt-3 font-poppins text-[28px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[34px]">
          {article.title}
        </h1>

        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <AppLink
                key={tag}
                href={getArticleTagPath(article.category, tag)}
                className="rounded-hz bg-hz-bg-soft px-3 py-1 font-poppins text-xs font-medium text-hz-body no-underline transition-colors hover:bg-hz-primary hover:text-white"
              >
                {tag}
              </AppLink>
            ))}
          </div>
        )}

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-hz bg-hz-bg-soft">
          <MediaImage
            mediaUrl={article.imageUrl}
            fitCover
            coverEstimate={{ width: 900, height: 562 }}
            coverMaxWidth={1400}
            alt={article.title}
            decoding="async"
            className="object-cover"
          />
        </div>

        {isHtml ? (
          <div
            className={cn(
              'prose prose-neutral mt-8 max-w-none font-poppins',
              'prose-headings:font-poppins prose-headings:text-hz-dark',
              'prose-p:text-hz-body prose-p:leading-[1.75]',
              'prose-a:text-hz-primary prose-a:no-underline hover:prose-a:underline'
            )}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
          />
        ) : (
          <p className="mt-8 whitespace-pre-wrap font-poppins text-base leading-[1.75] text-hz-body">
            {body}
          </p>
        )}

        <p className="mt-12">
          <AppLink
            href={routes.home}
            className="inline-flex items-center gap-2 font-poppins text-sm font-medium text-hz-body no-underline transition-colors hover:text-hz-primary"
          >
            <ArrowLeft size={16} />
            Back to home
          </AppLink>
        </p>
      </article>
    </main>
  );
}
