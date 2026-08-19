import type { ReactNode } from 'react';
import { LoaderOrbit } from '@/components/skeletons/LoaderOrbit';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  /** When true, shows orbit spinner over children (skeleton/content). */
  active: boolean;
  children: ReactNode;
  className?: string;
  /** Minimum height so the spinner has room on short skeleton blocks. */
  minHeight?: string;
}

/**
 * Orbit spinner + skeleton/content — spinner sits centered over the loading region
 * so users see both structural placeholder and brand preloader feedback.
 */
export function LoadingOverlay({
  active,
  children,
  className,
  minHeight = 'min-h-[320px]',
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', active && minHeight, className)}>
      {children}
      {active ? (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20 flex items-center justify-center',
            'bg-hz-page/45 supports-backdrop-filter:backdrop-blur-[2px]',
            'animate-in fade-in duration-200',
          )}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="rounded-full bg-hz-elevated/95 p-3 shadow-hz-md ring-1 ring-hz-border">
            <LoaderOrbit />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Fixed viewport spinner for route transitions (sits above page skeleton). */
export function RouteLoadingSpinner() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[290] flex items-center justify-center animate-in fade-in duration-200"
      style={{ top: 'var(--header-height, 76px)' }}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="rounded-full bg-hz-elevated/95 p-4 shadow-hz-lg ring-1 ring-hz-border">
        <LoaderOrbit />
      </div>
    </div>
  );
}
