import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ArticleCardSkeletonProps {
  /** Dark band sections (e.g. Helpful Guides) */
  tone?: 'default' | 'dark';
}

export function ArticleCardSkeleton({ tone = 'default' }: ArticleCardSkeletonProps) {
  const blockClass = tone === 'dark' ? 'bg-hz-deep-fg/10' : undefined;

  return (
    <div className="space-y-4" role="status" aria-label="Loading article">
      <Skeleton className={cn('aspect-[16/10] w-full rounded-hz', blockClass)} delayMs={0} />
      <Skeleton className={cn('h-4 w-3/4 rounded-hz', blockClass)} delayMs={80} />
      {tone === 'default' && <Skeleton className="h-3 w-full rounded-hz" delayMs={140} />}
    </div>
  );
}
