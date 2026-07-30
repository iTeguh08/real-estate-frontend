import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ChevronDown, MapPin, Search } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { PROPERTY_TYPES } from '@/data/property-types';
import { useListingFilters } from '@/hooks/useListingFilters';
import { cn } from '@/lib/utils';
import type { PropertyStatus, PropertyType } from '@/types';

const BED_OPTIONS = ['', '1', '2', '3', '4', '5+'] as const;
const STATUS_OPTIONS: Array<{ value: PropertyStatus | ''; label: string }> = [
  { value: '', label: 'Any status' },
  { value: 'For Sale', label: 'For Sale' },
  { value: 'For Rent', label: 'For Rent' },
  { value: 'Off Plan', label: 'Off Plan' },
  { value: 'Sold', label: 'Sold' },
];
const PRICE_MIN = 0;
const PRICE_MAX = 24000;

function parsePrice(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function clampPrice(value: number) {
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, value));
}

function formatPrice(value: number) {
  return `$${value.toLocaleString()}`;
}

function SelectField({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          'h-11 w-full cursor-pointer appearance-none rounded-hz border border-hz-border bg-hz-elevated px-3 pr-12 font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
          className
        )}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-hz-ink"
        aria-hidden="true"
      />
    </div>
  );
}

export function AdvancedSearchSheet() {
  const {
    filters,
    advancedSearchOpen,
    setAdvancedSearchOpen,
    applySearch,
    clearFilters,
  } = useListingFilters();

  const [keyword, setKeyword] = useState(filters.keyword);
  const [location, setLocation] = useState(filters.location);
  const [status, setStatus] = useState(filters.status);
  const [beds, setBeds] = useState(filters.beds);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [propertyType, setPropertyType] = useState(filters.propertyType);

  const minValue = parsePrice(minPrice, PRICE_MIN);
  const maxValue = parsePrice(maxPrice, PRICE_MAX);
  const sliderMin = Math.min(minValue, maxValue);
  const sliderMax = Math.max(minValue, maxValue);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setKeyword(filters.keyword);
      setLocation(filters.location);
      setStatus(filters.status);
      setBeds(filters.beds);
      setMinPrice(filters.minPrice);
      setMaxPrice(filters.maxPrice);
      setPropertyType(filters.propertyType);
    }
    setAdvancedSearchOpen(open);
  };

  const handleApply = () => {
    applySearch({
      keyword,
      location,
      status,
      beds,
      minPrice,
      maxPrice,
      propertyType: propertyType as PropertyType | '',
    });
    setAdvancedSearchOpen(false);
  };

  const handleReset = () => {
    clearFilters();
    setKeyword('');
    setLocation('');
    setStatus('');
    setBeds('');
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('');
    setAdvancedSearchOpen(false);
  };

  return (
    <Sheet open={advancedSearchOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full font-poppins sm:max-w-md">
        <SheetHeader className="border-b border-hz-border pb-4">
          <SheetTitle className="font-poppins text-lg font-semibold text-hz-dark">
            Advanced Search
          </SheetTitle>
          <SheetDescription className="font-poppins text-sm text-hz-muted">
            Refine listings by keyword, location, type, status, bedrooms, and a custom price range.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-2">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="advanced-keyword"
                className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
              >
                Keyword
              </label>
              <div className="relative">
                <input
                  id="advanced-keyword"
                  type="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search by title or keyword"
                  className="h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 pr-11 font-poppins text-sm text-hz-dark outline-none placeholder:text-hz-muted focus:border-hz-primary/60"
                />
                <Search
                  size={16}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-hz-muted"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="advanced-location"
                className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
              >
                Location
              </label>
              <div className="relative">
                <input
                  id="advanced-location"
                  type="search"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, district, or neighborhood"
                  className="h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3 pr-11 font-poppins text-sm text-hz-dark outline-none placeholder:text-hz-muted focus:border-hz-primary/60"
                />
                <MapPin
                  size={16}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-hz-muted"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label
                htmlFor="advanced-status"
                className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
              >
                Status
              </label>
              <SelectField
                id="advanced-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus | '')}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="advanced-type"
                className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
              >
                Property Type
              </label>
              <SelectField
                id="advanced-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType | '')}
              >
                <option value="">Any type</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark">
              Minimum Beds
            </span>
            <div className="flex flex-wrap gap-2">
              {BED_OPTIONS.map((option) => (
                <button
                  key={option || 'any'}
                  type="button"
                  onClick={() => setBeds(option)}
                  className={cn(
                    'cursor-pointer rounded-hz border px-3 py-1.5 font-poppins text-sm transition-colors duration-200',
                    beds === option
                      ? 'border-hz-primary bg-hz-primary text-white'
                      : 'border-hz-border bg-hz-elevated text-hz-body hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  {option === '' ? 'Any' : option === '5+' ? '5+' : `${option}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-hz border border-hz-border bg-hz-sunken p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark">
                  Price Range
                </p>
                <p className="mt-1 font-poppins text-xs text-hz-muted">
                  Drag both handles or enter values manually.
                </p>
              </div>
              <span className="font-poppins text-xs font-semibold text-hz-primary">
                {formatPrice(sliderMin)} - {formatPrice(sliderMax)}
              </span>
            </div>

            <div className="px-1 py-2">
              <Slider
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={500}
                value={[sliderMin, sliderMax]}
                onValueChange={([nextMin, nextMax]) => {
                  setMinPrice(String(clampPrice(nextMin)));
                  setMaxPrice(String(clampPrice(nextMax)));
                }}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label
                  htmlFor="advanced-min-price"
                  className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
                >
                  Min Price
                </label>
                <input
                  id="advanced-min-price"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 2,500"
                  value={sliderMin}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, '');
                    const nextValue = digits === '' ? PRICE_MIN : clampPrice(Math.min(Number(digits), sliderMax));
                    setMinPrice(String(nextValue));
                  }}
                  className={cn(
                    'h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3',
                    'font-poppins text-sm text-hz-dark outline-none placeholder:text-hz-muted',
                    'focus:border-hz-primary/60'
                  )}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="advanced-max-price"
                  className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
                >
                  Max Price
                </label>
                <input
                  id="advanced-max-price"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 12,000"
                  value={sliderMax}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, '');
                    const nextValue = digits === '' ? PRICE_MAX : clampPrice(Math.max(Number(digits), sliderMin));
                    setMaxPrice(String(nextValue));
                  }}
                  className={cn(
                    'h-11 w-full rounded-hz border border-hz-border bg-hz-elevated px-3',
                    'font-poppins text-sm text-hz-dark outline-none placeholder:text-hz-muted',
                    'focus:border-hz-primary/60'
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 border-t border-hz-border">
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              'flex-1 cursor-pointer rounded-hz border border-hz-border bg-hz-elevated py-2.5',
              'font-poppins text-sm font-medium text-hz-dark',
              'transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary'
            )}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className={cn(
              'flex-1 cursor-pointer rounded-hz bg-hz-primary py-2.5',
              'font-poppins text-sm font-semibold text-white',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
          >
            Apply Preferences
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
