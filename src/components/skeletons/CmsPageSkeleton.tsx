import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CmsPageSkeletonVariant = 'default' | 'about' | 'article';

interface CmsPageSkeletonProps {
  variant?: CmsPageSkeletonVariant;
  className?: string;
}

export function CmsPageSkeleton({ variant = 'default', className }: CmsPageSkeletonProps) {
  if (variant === 'article') {
    return (
      <main id="main-content" className={cn('section-container max-w-3xl py-16', className)}>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32 rounded-hz" delayMs={0} />
          <Skeleton className="h-10 w-full rounded-hz" delayMs={70} />
          <Skeleton className="aspect-[16/10] w-full rounded-hz" delayMs={130} />
          <Skeleton className="h-4 w-full rounded-hz" delayMs={190} />
          <Skeleton className="h-4 w-5/6 rounded-hz" delayMs={230} />
          <Skeleton className="h-4 w-full rounded-hz" delayMs={270} />
        </div>
      </main>
    );
  }

  if (variant === 'about') {
    return (
      <main id="main-content" className={cn('section-container py-20', className)}>
        <div className="space-y-6">
          <Skeleton className="h-8 w-64 rounded-hz" delayMs={0} />
          <Skeleton className="h-64 rounded-hz" delayMs={80} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-hz" delayMs={140 + i * 60} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className={cn('section-container py-20', className)}>
      <div className="space-y-6">
        <Skeleton className="mx-auto h-8 w-64 rounded-hz" delayMs={0} />
        <Skeleton className="h-40 rounded-hz" delayMs={80} />
        <Skeleton className="h-4 w-full rounded-hz" delayMs={140} />
        <Skeleton className="h-4 w-5/6 rounded-hz" delayMs={180} />
      </div>
    </main>
  );
}
