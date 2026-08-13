import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Shared Homzen orbit loader — matches inline `#hz-bootstrap-loader` in index.html. */
export function LoaderOrbit({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative flex h-16 w-16 items-center justify-center', className)}
      aria-hidden="true"
    >
      <span className="hz-loader-pulse absolute inset-0 rounded-full bg-hz-line/40" />
      <span className="hz-loader-orbit absolute inset-0 rounded-full border border-transparent border-t-hz-muted/60 border-r-hz-line/40" />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-hz-elevated shadow-hz-md ring-1 ring-hz-border">
        <Building2 size={18} strokeWidth={1.75} className="text-hz-muted" />
      </span>
    </div>
  );
}
