import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import { useCompare } from '@/hooks/useCompare';
import { MAX_COMPARE_ITEMS } from '@/services/compare.service';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

export function CompareBar() {
  const { compareCount, lastLimited } = useCompare();

  if (compareCount === 0 && !lastLimited) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-90 border-t border-hz-border bg-white/95 px-5 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm',
        'font-poppins'
      )}
      role="region"
      aria-label="Property compare"
    >
      <div className="section-container flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hz-primary/10 text-hz-primary">
            <ArrowLeftRight size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-hz-dark">
              {compareCount} of {MAX_COMPARE_ITEMS} properties selected
            </p>
            {lastLimited && (
              <p className="text-xs text-hz-primary" role="status">
                Maximum {MAX_COMPARE_ITEMS} properties — remove one to add another.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {compareCount > 0 && (
            <Link
              to={routes.compare}
              className={cn(
                'inline-flex items-center justify-center rounded-hz bg-hz-primary px-5 py-2',
                'text-sm font-semibold text-white no-underline transition-colors hover:bg-hz-primary-hover'
              )}
            >
              Compare Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
