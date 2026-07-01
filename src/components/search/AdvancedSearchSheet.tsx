import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useListingFilters } from '@/hooks/useListingFilters';
import { cn } from '@/lib/utils';
import type { PropertyType } from '@/types';

const BED_OPTIONS = ['', '1', '2', '3', '4', '5+'] as const;

export function AdvancedSearchSheet() {
  const {
    filters,
    advancedSearchOpen,
    setAdvancedSearchOpen,
    applySearch,
    clearFilters,
  } = useListingFilters();

  const [beds, setBeds] = useState(filters.beds);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const [propertyType, setPropertyType] = useState(filters.propertyType);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setBeds(filters.beds);
      setMinPrice(filters.minPrice);
      setMaxPrice(filters.maxPrice);
      setPropertyType(filters.propertyType);
    }
    setAdvancedSearchOpen(open);
  };

  const handleApply = () => {
    applySearch({
      beds,
      minPrice,
      maxPrice,
      propertyType: propertyType as PropertyType | '',
    });
    setAdvancedSearchOpen(false);
  };

  const handleReset = () => {
    clearFilters();
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
            Optional preferences — saved for when search connects to our database. Sample cities:
            New York, Los Angeles, Miami, London.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-2">
          <div className="space-y-2">
            <label
              htmlFor="advanced-type"
              className="font-poppins text-xs font-semibold uppercase tracking-wide text-hz-dark"
            >
              Property Type
            </label>
            <select
              id="advanced-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType | '')}
              className={cn(
                'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
                'font-poppins text-sm text-hz-dark outline-none',
                'focus:border-hz-primary/60'
              )}
            >
              <option value="">Any type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Office">Office</option>
              <option value="Commercial">Commercial</option>
            </select>
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
                    'rounded-hz border px-3 py-1.5 font-poppins text-sm transition-colors duration-200',
                    beds === option
                      ? 'border-hz-primary bg-hz-primary text-white'
                      : 'border-hz-border bg-white text-hz-body hover:border-hz-primary hover:text-hz-primary'
                  )}
                >
                  {option === '' ? 'Any' : option === '5+' ? '5+' : `${option}+`}
                </button>
              ))}
            </div>
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
                type="number"
                min={0}
                placeholder="e.g. 500000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className={cn(
                  'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
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
                type="number"
                min={0}
                placeholder="e.g. 2000000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className={cn(
                  'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
                  'font-poppins text-sm text-hz-dark outline-none placeholder:text-hz-muted',
                  'focus:border-hz-primary/60'
                )}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 border-t border-hz-border">
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              'flex-1 rounded-hz border border-hz-border bg-white py-2.5',
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
              'flex-1 rounded-hz bg-hz-primary py-2.5',
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
