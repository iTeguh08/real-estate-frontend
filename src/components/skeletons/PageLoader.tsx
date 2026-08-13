import { cn } from '@/lib/utils';
import { LoaderOrbit } from '@/components/skeletons/LoaderOrbit';

interface PageLoaderProps {
  className?: string;
  /** Kept for callers; both variants fill the viewport. */
  variant?: 'route' | 'page';
}

/**
 * Homzen bootstrap preloader — brand orbit only (no skeleton overlay).
 * Fixed full-viewport so the spinner is truly centered (route Suspense + auth gate).
 */
export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-hz-page',
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
            'radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--hz-line) 40%, transparent), transparent 55%)',
        }}
      />

      <LoaderOrbit />

      <span className="sr-only">Loading content…</span>
    </div>
  );
}
