import { SlidersHorizontal, X } from 'lucide-react';
import { describeSearchIntent, hasSearchIntent } from '@/lib/search-intent';
import type { ListingFilters } from '@/types';

interface SearchIntentBannerProps {
  intent: ListingFilters;
  onClear: () => void;
}

export function SearchIntentBanner({ intent, onClear }: SearchIntentBannerProps) {
  if (!hasSearchIntent(intent)) return null;

  const summary = describeSearchIntent(intent);

  return (
    <div
      className="mb-8 flex flex-wrap items-center justify-center gap-2.5"
      role="status"
    >
      <span className="font-poppins text-sm text-hz-muted">Showing results for</span>

      <div className="inline-flex max-w-full items-center rounded-full border border-hz-primary/25 bg-hz-primary/[0.07] pl-3 pr-1 py-1 shadow-hz-sm">
        <SlidersHorizontal
          className="mr-2 size-3.5 shrink-0 text-hz-primary"
          strokeWidth={2}
          aria-hidden="true"
        />
        <span className="truncate font-poppins text-sm font-semibold text-hz-ink">{summary}</span>
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear search: ${summary}`}
          className="ml-1.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full text-hz-muted transition-colors duration-200 hover:bg-hz-primary/15 hover:text-hz-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary/40"
        >
          <X className="size-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
