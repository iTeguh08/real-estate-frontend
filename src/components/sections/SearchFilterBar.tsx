import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { filterTab, luxuryButton } from '@/lib/cva';
import type { SearchMode } from '@/types';

const SEARCH_MODES: SearchMode[] = ['Buy', 'Rent', 'Off Plan'];

const PROPERTY_TYPES = ['Any Type', 'Townhouse', 'Villa', 'Apartment', 'Office', 'Commercial'];
const BED_OPTIONS = ['Any Beds', '1 Bed', '2 Beds', '3 Beds', '4 Beds', '5+ Beds'];
const PRICE_RANGES = ['Any Price', 'Under $200k', '$200k–$500k', '$500k–$1M', 'Over $1M'];

export function SearchFilterBar() {
  const [activeMode, setActiveMode] = useState<SearchMode>('Buy');

  return (
    <section
      className="relative z-20 w-full border-y border-luxury-border bg-white"
      aria-label="Property search filter"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex border-b border-luxury-border">
          {SEARCH_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={cn(filterTab({ active: activeMode === mode }))}
              aria-pressed={activeMode === mode}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-3 py-4 md:flex-row md:items-center">
          <div className="relative min-w-[180px] flex-1">
            <MapPin
              size={15}
              strokeWidth={1.5}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted"
            />
            <Input
              placeholder="City, neighbourhood, or address"
              className="h-11 rounded-sm border-luxury-border bg-luxury-cream/40 pl-9 font-sans text-sm focus-visible:ring-luxury-crimson"
              aria-label="Location search"
            />
          </div>

          <div className="hidden h-9 w-px bg-luxury-border md:block" aria-hidden="true" />

          <Select defaultValue="">
            <SelectTrigger
              className="h-11 w-full rounded-sm border-luxury-border bg-transparent font-sans text-sm focus:ring-luxury-crimson md:w-[156px]"
              aria-label="Property type"
            >
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t} value={t.toLowerCase().replace(/\s/g, '-')}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="">
            <SelectTrigger
              className="h-11 w-full rounded-sm border-luxury-border bg-transparent font-sans text-sm focus:ring-luxury-crimson md:w-[120px]"
              aria-label="Number of bedrooms"
            >
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              {BED_OPTIONS.map((b) => (
                <SelectItem key={b} value={b.toLowerCase().replace(/\s|\+/g, '-')}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select defaultValue="">
            <SelectTrigger
              className="h-11 w-full rounded-sm border-luxury-border bg-transparent font-sans text-sm focus:ring-luxury-crimson md:w-[156px]"
              aria-label="Price range"
            >
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent className="font-sans">
              {PRICE_RANGES.map((p) => (
                <SelectItem key={p} value={p.toLowerCase().replace(/[\s$–k+,]/g, '-')}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'crimson', size: 'lg' }), 'gap-2 whitespace-nowrap')}
            aria-label="Search properties"
          >
            <Search size={15} strokeWidth={2} />
            Find Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
