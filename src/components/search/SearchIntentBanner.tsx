import { describeSearchIntent, hasSearchIntent } from '@/lib/search-intent';
import type { ListingFilters } from '@/types';

interface SearchIntentBannerProps {
  intent: ListingFilters;
  onClear: () => void;
}

export function SearchIntentBanner({ intent, onClear }: SearchIntentBannerProps) {
  if (!hasSearchIntent(intent)) return null;

  return (
    <div
      className="mb-8 rounded-hz border border-hz-border bg-hz-sunken px-5 py-5 text-center"
      role="status"
    >
      <p className="font-poppins text-sm text-hz-body">
        Showing results for{' '}
        <span className="font-semibold text-hz-dark">{describeSearchIntent(intent)}</span>
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-hz border border-hz-border bg-hz-elevated px-5 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary"
      >
        Clear search
      </button>
    </div>
  );
}
