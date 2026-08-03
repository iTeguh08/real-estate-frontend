import { Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  className?: string;
  /** Compact route fallback vs fuller page shell. */
  variant?: 'route' | 'page';
}

/**
 * Elegant Homzen page / route preloader — shimmer panels + soft brand orbit.
 * Used by Suspense route fallbacks and full-page loading states.
 */
export function PageLoader({ className, variant = 'route' }: PageLoaderProps) {
  const isPage = variant === 'page';

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-hz-page',
        isPage ? 'min-h-[70vh]' : 'min-h-[48vh]',
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, color-mix(in oklch, var(--hz-primary) 10%, transparent), transparent 55%)',
        }}
      />

      <div className="section-container relative z-10 py-14 md:py-20">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <Skeleton className="h-2.5 w-24 rounded-full" delayMs={0} />
          <Skeleton className="h-8 w-64 max-w-full rounded-hz md:h-9 md:w-80" delayMs={60} />
          <Skeleton className="h-3.5 w-80 max-w-full rounded-hz" delayMs={120} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: isPage ? 6 : 3 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-hz border border-hz-border/70 bg-hz-elevated/40 shadow-hz-sm"
            >
              <Skeleton
                className="aspect-[16/10] w-full rounded-none"
                delayMs={80 + index * 90}
              />
              <div className="space-y-3 p-4">
                <Skeleton className="h-4 w-3/4 rounded-hz" delayMs={120 + index * 90} />
                <Skeleton className="h-3 w-1/2 rounded-hz" delayMs={160 + index * 90} />
                <Skeleton className="h-3 w-full rounded-hz" delayMs={200 + index * 90} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-[38%] z-20 flex justify-center"
        aria-hidden="true"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="hz-loader-pulse absolute inset-0 rounded-full bg-hz-primary/10" />
          <span
            className="hz-loader-orbit absolute inset-0 rounded-full border border-transparent border-t-hz-primary/70 border-r-hz-primary/25"
          />
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-hz-elevated shadow-hz-md ring-1 ring-hz-border">
            <Building2 size={18} strokeWidth={1.75} className="text-hz-primary" />
          </span>
        </div>
      </div>

      <span className="sr-only">Loading content…</span>
    </div>
  );
}
