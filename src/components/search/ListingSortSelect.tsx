import { SORT_OPTIONS } from '@/lib/sort-options';
import { cn } from '@/lib/utils';
import type { PropertySort } from '@/types';

interface ListingSortSelectProps {
  value: PropertySort | '';
  onChange: (sort: PropertySort | '') => void;
  className?: string;
}

export function ListingSortSelect({ value, onChange, className }: ListingSortSelectProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <label
        htmlFor="listing-sort"
        className="shrink-0 font-poppins text-sm text-hz-muted"
      >
        Sort by
      </label>
      <select
        id="listing-sort"
        value={value}
        onChange={(e) => onChange(e.target.value as PropertySort | '')}
        className={cn(
          'h-10 rounded-hz border border-hz-border bg-hz-elevated px-3',
          'font-poppins text-sm text-hz-dark outline-none',
          'focus:border-hz-primary/60'
        )}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value || 'default'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
