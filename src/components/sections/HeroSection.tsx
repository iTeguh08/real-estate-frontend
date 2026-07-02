import { useState, useEffect, type FormEvent } from 'react';
import { Search, LocateFixed, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useListingFilters } from '@/hooks/useListingFilters';
import type { PropertyStatus, PropertyType } from '@/types';
import heroImage from '@/assets/hero.webp';

const TABS = ['For Rent', 'For Sale'] as const satisfies readonly PropertyStatus[];
type HeroTab = (typeof TABS)[number];

const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Studio',
  'Townhouse',
  'Office',
] as const satisfies readonly PropertyType[];

const TYPE_OPTIONS = ['All', ...PROPERTY_TYPES] as const;

export function HeroSection() {
  const { filters, applySearch, setAdvancedSearchOpen } = useListingFilters();

  const [activeTab, setActiveTab] = useState<HeroTab>('For Rent');
  const [keyword, setKeywordLocal] = useState('');
  const [location, setLocationLocal] = useState('');
  const [propertyType, setPropertyTypeLocal] = useState<string>('All');
  const [activeChip, setActiveChip] = useState<PropertyType>('Apartment');

  useEffect(() => {
    setKeywordLocal(filters.keyword);
    setLocationLocal(filters.location);
    setPropertyTypeLocal(filters.propertyType || 'All');
    if (filters.status === 'For Sale' || filters.status === 'For Rent') {
      setActiveTab(filters.status);
    }
  }, [filters.keyword, filters.location, filters.propertyType, filters.status]);

  const handleTabChange = (tab: HeroTab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();
    const trimmedLocation = location.trim();
    const typeFilter = propertyType === 'All' ? '' : (propertyType as PropertyType);
    const isBrowseAll = !trimmedKeyword && !trimmedLocation && !typeFilter;

    if (isBrowseAll) {
      applySearch({}, { resetOthers: true });
      return;
    }

    applySearch(
      {
        keyword: trimmedKeyword,
        location: trimmedLocation,
        status: activeTab,
        propertyType: typeFilter,
        beds: '',
        minPrice: '',
        maxPrice: '',
      },
      { resetOthers: true }
    );
  };

  const handleChipClick = (type: PropertyType) => {
    setActiveChip(type);
    setPropertyTypeLocal(type);
    applySearch(
      {
        keyword: keyword.trim(),
        location: location.trim(),
        status: activeTab,
        propertyType: type,
        beds: '',
        minPrice: '',
        maxPrice: '',
      },
      { resetOthers: true }
    );
  };

  const fieldClassName =
    'flex min-h-[52px] flex-col justify-center px-4 border-[#ECECEC] max-lg:border-b max-lg:px-3 max-lg:py-3 lg:min-w-[140px] lg:border-r';

  const searchFields = (
    <>
      <div className={fieldClassName}>
        <label
          htmlFor="hero-keyword"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-[#AAAAAA]"
        >
          Keyword
        </label>
        <input
          id="hero-keyword"
          type="search"
          placeholder="e.g. Villa, Brooklyn, Office"
          value={keyword}
          onChange={(e) => setKeywordLocal(e.target.value)}
          className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full min-w-0 truncate"
        />
      </div>

      <div className={fieldClassName}>
        <label
          htmlFor="hero-location"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-[#AAAAAA]"
        >
          Location
        </label>
        <div className="flex items-center gap-2 min-w-0">
          <input
            id="hero-location"
            type="search"
            placeholder="e.g. New York, Los Angeles"
            value={location}
            onChange={(e) => setLocationLocal(e.target.value)}
            className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full min-w-0 truncate"
          />
          <LocateFixed
            size={16}
            className="shrink-0 text-hz-dark max-lg:text-[#AAAAAA]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={fieldClassName}>
        <label
          htmlFor="hero-type"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-[#AAAAAA]"
        >
          Type
        </label>
        <div className="flex items-center gap-2 min-w-0">
          <select
            id="hero-type"
            value={propertyType}
            onChange={(e) => setPropertyTypeLocal(e.target.value)}
            className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent appearance-none cursor-pointer w-full min-w-0 truncate"
          >
            {TYPE_OPTIONS.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="shrink-0 text-[#AAAAAA] pointer-events-none"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );

  return (
    <section
      className="bg-[#F7F7F7] font-poppins"
      aria-label="Hero — Find your home"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:aspect-[2560/1103] lg:min-h-0">
        <div className="order-2 lg:order-1 relative z-20 flex flex-col justify-center overflow-visible px-10 max-md:px-5 py-12 lg:h-full lg:min-h-0 lg:py-10 lg:px-10 lg:pr-6 xl:px-12 xl:pr-8 2xl:pl-14 2xl:pr-10">
          <div className="max-w-[620px] 3xl:max-w-[720px]">
            <p className="font-poppins font-semibold text-[12px] text-hz-primary uppercase tracking-[2px] mb-4">
              Real Estate Agency
            </p>

            <h1
              className={cn(
                'font-poppins font-bold text-hz-dark leading-[1.15] tracking-[-0.5px]',
                'text-[36px] md:text-[42px] lg:text-[48px] 3xl:text-[56px]',
                'max-w-[500px] 3xl:max-w-[580px]'
              )}
            >
              Find A Home That
              <br />
              Fits Your Dream
            </h1>

            <p className="font-poppins font-normal text-[15px] text-hz-muted leading-[1.65] max-w-[460px] 3xl:max-w-[520px] mb-6">
              We are a real estate agency that will help you find the best
              residence for you at an affordable price.
            </p>
          </div>

          <div
            className={cn(
              'relative z-30 mt-0 w-full max-w-[560px]',
              // Extend search bar into the image column without relying on excessive left padding
              'lg:max-w-[900px] lg:w-[min(900px,calc(100%+10rem))]'
            )}
          >
            <div className="flex">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  aria-pressed={activeTab === tab}
                  className={cn(
                    'font-poppins px-6 py-[10px] text-[12px] uppercase tracking-[0.5px]',
                    'rounded-t-hz transition-colors duration-200 cursor-pointer border-none',
                    activeTab === tab
                      ? 'bg-white text-hz-dark font-semibold'
                      : 'bg-[#EDEDED] text-[#888888] font-medium hover:text-hz-dark'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-b-hz rounded-tr-hz shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
            >
              <div className="hidden lg:grid lg:grid-cols-[minmax(140px,1fr)_minmax(140px,1fr)_minmax(140px,1fr)_auto_auto] items-stretch p-3 gap-0 min-w-0">
                {searchFields}

                <button
                  type="button"
                  onClick={() => setAdvancedSearchOpen(true)}
                  className="flex shrink-0 items-center gap-2 self-center px-4 font-poppins font-medium text-[13px] text-hz-dark hover:text-hz-primary bg-transparent border-none cursor-pointer transition-colors duration-200 whitespace-nowrap"
                >
                  <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                  Advanced
                </button>

                <div className="flex shrink-0 items-center self-center pl-2">
                  <button
                    type="submit"
                    className={cn(
                      'flex items-center justify-center gap-2',
                      'bg-hz-primary hover:bg-hz-primary-hover text-white',
                      'font-poppins font-semibold text-[14px]',
                      'px-6 py-[14px] rounded-hz',
                      'border-none cursor-pointer',
                      'transition-colors duration-200 whitespace-nowrap'
                    )}
                  >
                    <Search size={16} strokeWidth={2} aria-hidden="true" />
                    Find Properties
                  </button>
                </div>
              </div>

              <div className="lg:hidden flex flex-col p-3 gap-0">
                {searchFields}

                  <button
                    type="button"
                    onClick={() => setAdvancedSearchOpen(true)}
                    className="flex items-center justify-center gap-2 mx-3 mt-3 font-poppins font-medium text-[13px] text-hz-body hover:text-hz-primary bg-transparent border-none cursor-pointer transition-colors duration-200"
                  >
                  <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                  Advanced
                </button>

                <div className="px-3 pt-3">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-hz-primary hover:bg-hz-primary-hover text-white text-[14px] font-semibold px-4 py-3 rounded-hz border-none cursor-pointer transition-colors duration-200 font-poppins"
                  >
                    <Search size={16} strokeWidth={2} aria-hidden="true" />
                    Find Properties
                  </button>
                </div>
              </div>
            </form>
          </div>

          <p className="mt-3 max-w-[520px] font-poppins text-[12px] leading-relaxed text-hz-muted">
            Your search preferences are saved and shared via the URL. Results will be refined by
            our listings database soon — until then, explore featured properties below.
          </p>

          <div className="mt-4 max-w-[620px] 3xl:max-w-[720px] flex items-center gap-3 flex-wrap">
            <span className="font-poppins font-normal text-[13px] text-hz-muted">
              When you are looking for:
            </span>
            {PROPERTY_TYPES.map((type, idx) => (
              <span key={type} className="flex items-center gap-3">
                {idx > 0 && (
                  <span className="text-[#DDDDDD] select-none" aria-hidden="true">
                    |
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleChipClick(type)}
                  aria-pressed={activeChip === type}
                  className={cn(
                    'font-poppins font-medium text-[13px] cursor-pointer border-none bg-transparent p-0',
                    'transition-colors duration-200',
                    activeChip === type
                      ? 'text-hz-primary underline underline-offset-4 decoration-hz-primary decoration-1'
                      : 'text-hz-body hover:text-hz-primary'
                  )}
                >
                  {type}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="relative order-1 lg:order-2 aspect-[1280/1103] w-full min-h-0 overflow-hidden lg:aspect-auto lg:h-full">
          <img
            src={heroImage}
            alt="Modern luxury residential home"
            width={1280}
            height={1103}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
