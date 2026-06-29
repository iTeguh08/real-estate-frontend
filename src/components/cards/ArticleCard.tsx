import { cn } from '@/lib/utils';
import type { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const { title, excerpt, category, publishedAt, imageUrl } = article;

  return (
    <a
      href="#"
      className={cn('group block cursor-pointer', className)}
      aria-label={`Read article: ${title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-hz-bg-soft">
        <img
          src={imageUrl}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-[3px] bg-hz-primary px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white">
          {category}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <p className="font-poppins text-xs text-hz-muted">
          {category} <span aria-hidden="true">•</span> {publishedAt}
        </p>
        <h3 className="line-clamp-2 font-poppins text-[15px] font-semibold leading-snug text-hz-dark transition-colors duration-200 group-hover:text-hz-primary sm:text-base">
          {title}
        </h3>
        <p className="line-clamp-3 font-poppins text-[13px] leading-relaxed text-hz-body">
          {excerpt}
        </p>
      </div>
    </a>
  );
}
