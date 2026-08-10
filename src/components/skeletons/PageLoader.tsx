import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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

      <div
        className="relative flex h-16 w-16 items-center justify-center"
        aria-hidden="true"
      >
        <span className="hz-loader-pulse absolute inset-0 rounded-full bg-hz-line/40" />
        <span className="hz-loader-orbit absolute inset-0 rounded-full border border-transparent border-t-hz-muted/60 border-r-hz-line/40" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-hz-elevated shadow-hz-md ring-1 ring-hz-border">
          <Building2 size={18} strokeWidth={1.75} className="text-hz-muted" />
        </span>
      </div>

      <span className="sr-only">Loading content…</span>
    </div>
  );
}
