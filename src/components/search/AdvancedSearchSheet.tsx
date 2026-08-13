import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type MutableRefObject,
  type SelectHTMLAttributes,
  type TransitionEvent,
} from 'react';
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
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
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
}: SelectHTMLAttributes<HTMLSelectElement>) {
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

/** Owns price draft locally so slider drag does not re-render the whole sheet form. */
function PriceRangeSection({
  initialMin,
  initialMax,
  priceRef,
}: {
  initialMin: string;
  initialMax: string;
  priceRef: MutableRefObject<{ min: string; max: string }>;
}) {
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  const minValue = parsePrice(minPrice, PRICE_MIN);
  const maxValue = parsePrice(maxPrice, PRICE_MAX);
  const sliderMin = Math.min(minValue, maxValue);
  const sliderMax = Math.max(minValue, maxValue);

  useEffect(() => {
    priceRef.current = { min: String(sliderMin), max: String(sliderMax) };
  }, [priceRef, sliderMin, sliderMax]);

  return (
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
              const nextValue =
                digits === '' ? PRICE_MIN : clampPrice(Math.min(Number(digits), sliderMax));
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
              const nextValue =
                digits === '' ? PRICE_MAX : clampPrice(Math.max(Number(digits), sliderMin));
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
  );
}

export function AdvancedSearchSheet() {
  const { filters, applySearch, clearFilters } = useListingFilters();
  const { open, setOpen } = useAdvancedSearch();

  const [keyword, setKeyword] = useState(filters.keyword);
  const [location, setLocation] = useState(filters.location);
  const [status, setStatus] = useState(filters.status);
  const [beds, setBeds] = useState(filters.beds);
  const [propertyType, setPropertyType] = useState(filters.propertyType);
  const [formEpoch, setFormEpoch] = useState(0);

  const priceRef = useRef({ min: filters.minPrice, max: filters.maxPrice });
  const pendingActionRef = useRef<(() => void) | null>(null);

  const syncDraftFromFilters = useCallback(() => {
    setKeyword(filters.keyword);
    setLocation(filters.location);
    setStatus(filters.status);
    setBeds(filters.beds);
    setPropertyType(filters.propertyType);
    priceRef.current = { min: filters.minPrice, max: filters.maxPrice };
    setFormEpoch((n) => n + 1);
  }, [filters]);

  const flushPending = useCallback(() => {
    const action = pendingActionRef.current;
    if (!action) return;
    pendingActionRef.current = null;
    action();
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      syncDraftFromFilters();
      setOpen(true);
      return;
    }
    setOpen(false);
  };

  const onSheetExit = (event: AnimationEvent | TransitionEvent) => {
    if (event.target !== event.currentTarget) return;
    if (open) return;
    flushPending();
  };

  const handleApply = () => {
    const { min, max } = priceRef.current;
    pendingActionRef.current = () => {
      applySearch({
        keyword,
        location,
        status,
        beds,
        minPrice: min,
        maxPrice: max,
        propertyType: propertyType as PropertyType | '',
      });
    };
    setOpen(false);
  };

  const handleReset = () => {
    pendingActionRef.current = () => {
      clearFilters();
    };
    setKeyword('');
    setLocation('');
    setStatus('');
    setBeds('');
    setPropertyType('');
    priceRef.current = { min: '', max: '' };
    setFormEpoch((n) => n + 1);
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(next) => {
        handleOpenChange(next);
        if (!next && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          flushPending();
        }
      }}
    >
      <SheetContent
        side="right"
        className="w-full font-poppins sm:max-w-md"
        onOpenAutoFocus={(event) => {
          if (window.matchMedia('(max-width: 767px)').matches) {
            event.preventDefault();
          }
        }}
        onCloseAutoFocus={(event) => event.preventDefault()}
        onAnimationEnd={onSheetExit}
        onTransitionEnd={onSheetExit}
      >
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

          <PriceRangeSection
            key={formEpoch}
            initialMin={priceRef.current.min}
            initialMax={priceRef.current.max}
            priceRef={priceRef}
          />
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
            Apply
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
