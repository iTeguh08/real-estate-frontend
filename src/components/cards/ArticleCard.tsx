import { Link } from 'react-router-dom';
import { getArticleCategoryLabel, getArticlePath, getArticleTagPath } from '@/lib/articles';
import { MediaImage } from '@/components/ui/media-image';
import { sizedImage } from '@/lib/image-url';
import { cn } from '@/lib/utils';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  className?: string;
  /** Dark band (Latest News on deep surface). */
  tone?: 'default' | 'dark';
}

export function ArticleCard({ article, className, tone = 'default' }: ArticleCardProps) {
  const { title, excerpt, category, publishedAt, imageUrl } = article;
  const categoryLabel = getArticleCategoryLabel(category);
  const isDark = tone === 'dark';

  return (
    <Link
      to={getArticlePath(article)}
      className={cn('group block cursor-pointer no-underline', className)}
      aria-label={`Read article: ${title}`}
    >
      <div
        className={cn(
          'relative aspect-[16/9] overflow-hidden rounded-hz',
          isDark ? 'bg-hz-deep-fg/10' : 'bg-hz-bg-soft'
        )}
      >
        <MediaImage
          src={sizedImage(imageUrl, 400)}
          alt=""
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-hz bg-hz-primary px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white">
          {categoryLabel}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className={cn('font-poppins text-xs', isDark ? 'text-hz-deep-fg/55' : 'text-hz-muted')}>
          {categoryLabel} <span aria-hidden="true">•</span> {publishedAt}
        </p>
        <h3
          className={cn(
            'line-clamp-2 font-poppins text-[15px] font-semibold leading-snug transition-colors duration-200 group-hover:text-hz-primary sm:text-base',
            isDark ? 'text-hz-deep-fg' : 'text-hz-dark'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'line-clamp-3 font-poppins text-[13px] leading-relaxed',
            isDark ? 'text-hz-deep-fg/65' : 'text-hz-body'
          )}
        >
          {excerpt}
        </p>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                to={getArticleTagPath(category, tag)}
                onClick={(event) => event.stopPropagation()}
                className={cn(
                  'relative z-10 rounded-hz px-2 py-0.5 font-poppins text-[10px] font-medium no-underline transition-colors hover:bg-hz-primary hover:text-white',
                  isDark
                    ? 'bg-hz-deep-fg/10 text-hz-deep-fg/70'
                    : 'bg-hz-bg-soft text-hz-muted'
                )}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
