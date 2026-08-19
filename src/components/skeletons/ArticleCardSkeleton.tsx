import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface ArticleCardSkeletonProps {
  tone?: 'default' | 'dark';
  className?: string;
}

/** Structural twin of `ArticleCard` — image, category badge, meta, title, excerpt, tags. */
export function ArticleCardSkeleton({ tone = 'default', className }: ArticleCardSkeletonProps) {
  const imageBg = tone === 'dark' ? 'bg-hz-deep-fg/10' : 'bg-hz-bg-soft';

  return (
    <article className={cn('group relative', className)} role="status" aria-label="Loading article">
      <div className={cn('relative aspect-[16/9] overflow-hidden rounded-hz', imageBg)}>
        <Skeleton className="absolute inset-0 rounded-none" delayMs={0} />
        <Skeleton className="absolute bottom-3 left-3 h-[22px] w-16 rounded-hz" delayMs={50} />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-40 rounded-hz" delayMs={80} />
        <Skeleton className="h-[18px] w-full rounded-hz" delayMs={110} />
        <Skeleton className="h-[18px] w-[92%] rounded-hz" delayMs={130} />
        <Skeleton className="h-3 w-full rounded-hz" delayMs={160} />
        <Skeleton className="h-3 w-full rounded-hz" delayMs={180} />
        <Skeleton className="h-3 w-4/5 rounded-hz" delayMs={200} />
        <div className="flex flex-wrap gap-1.5 pt-1">
          <Skeleton className="h-5 w-14 rounded-hz" delayMs={220} />
          <Skeleton className="h-5 w-16 rounded-hz" delayMs={240} />
          <Skeleton className="h-5 w-12 rounded-hz" delayMs={260} />
        </div>
      </div>
    </article>
  );
}
