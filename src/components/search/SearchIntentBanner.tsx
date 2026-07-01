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
      className="mb-8 rounded-hz border border-hz-border bg-[#F8F8F8] px-5 py-5 text-center"
      role="status"
    >
      <p className="font-poppins text-sm text-hz-body">
        You&apos;re looking for{' '}
        <span className="font-semibold text-hz-dark">{describeSearchIntent(intent)}</span>
      </p>
      <p className="mt-2 max-w-lg mx-auto font-poppins text-xs leading-relaxed text-hz-muted">
        We&apos;ve saved your preferences. Refined results will appear here once search is
        connected to our listings database — for now, browse our featured properties below.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 rounded-hz border border-hz-border bg-white px-5 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary"
      >
        Clear search
      </button>
    </div>
  );
}
