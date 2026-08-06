import { useState, useEffect, type FormEvent } from 'react';
import { Search, LocateFixed, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { MediaImage } from '@/components/ui/media-image';
import { PROPERTY_TYPES } from '@/data/property-types';
import { cn } from '@/lib/utils';
import { publicAsset } from '@/lib/public-asset';
import { sizedImage, HERO_PREVIEW_WIDTH } from '@/lib/image-url';
import { preloadImage } from '@/lib/preload-image';
import { useListingFilters } from '@/hooks/useListingFilters';
import { useHomepageQuery } from '@/hooks/queries';
import { useTheme } from '@/hooks/useTheme';
import type { PropertyStatus, PropertyType } from '@/types';
import heroImage from '@/assets/hero.webp';

const LIGHT_HERO_LEFT_BG = publicAsset('bg/bg-hero-left-property-v1.webp');

const TABS = ['For Rent', 'For Sale'] as const satisfies readonly PropertyStatus[];
type HeroTab = (typeof TABS)[number];

const TYPE_OPTIONS = ['All', ...PROPERTY_TYPES] as const;

export function HeroSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const { data: homepage } = useHomepageQuery();
  const hero = homepage?.hero;
  const heroSrc = sizedImage(hero?.backgroundImage ?? heroImage, HERO_PREVIEW_WIDTH, {
    maxWidth: 1440,
  });
  const { filters, applySearch, setAdvancedSearchOpen } = useListingFilters();

  useEffect(() => {
    return preloadImage(heroSrc);
  }, [heroSrc]);

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
    'flex min-h-[52px] flex-col justify-center px-4 border-hz-border max-lg:border-b max-lg:px-3 max-lg:py-3 lg:min-w-[140px] lg:border-r';

  const searchFields = (
    <>
      <div className={fieldClassName}>
        <label
          htmlFor="hero-keyword"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-hz-muted"
        >
          Keyword
        </label>
        <input
          id="hero-keyword"
          type="search"
          placeholder="e.g. Villa, Brooklyn, Office"
          value={keyword}
          onChange={(e) => setKeywordLocal(e.target.value)}
          className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-hz-muted w-full min-w-0 truncate"
        />
      </div>

      <div className={fieldClassName}>
        <label
          htmlFor="hero-location"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-hz-muted"
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
            className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-hz-muted w-full min-w-0 truncate"
          />
          <LocateFixed
            size={16}
            className="shrink-0 text-hz-dark max-lg:text-hz-muted"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={fieldClassName}>
        <label
          htmlFor="hero-type"
          className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px] max-lg:text-hz-muted"
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
            className="shrink-0 text-hz-muted pointer-events-none"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );

  const heroCopy = (
    <div className="max-w-[620px] lg:max-w-[680px] 3xl:max-w-[720px]">
      <p className="hz-eyebrow mb-4 text-hz-primary">
        {hero?.eyebrow ?? 'Real Estate Agency'}
      </p>

      <h1 className="hz-display max-w-[500px] font-bold text-hz-dark lg:max-w-[580px] 3xl:max-w-[640px]">
        {(hero?.headline ?? 'Find A Home That\nFits Your Dream').split('\n').map((line, index) => (
          <span key={line}>
            {index > 0 && <br />}
            {line}
          </span>
        ))}
      </h1>

      <p className="hz-lead mb-6 max-w-[460px] text-hz-muted 3xl:max-w-[520px]">
        {hero?.subheadline ??
          'We are a real estate agency that will help you find the best residence for you at an affordable price.'}
      </p>
    </div>
  );

  const searchBlock = (
    <div
      className={cn(
        'relative z-30 mt-0 w-full max-w-[560px]',
        'lg:max-w-[900px] lg:w-[min(900px,max(100%,calc(80vw-7.5rem)))]'
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
                ? 'bg-hz-elevated text-hz-dark font-semibold'
                : 'bg-hz-sunken text-hz-muted font-medium hover:text-hz-dark'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-hz-elevated rounded-b-hz rounded-tr-hz shadow-hz-elevated"
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
  );

  const heroFooter = (
    <>
      <p className="mt-3 max-w-[520px] font-poppins text-[12px] leading-relaxed text-hz-muted max-md:hidden">
        Your search preferences are saved and shared via the URL. Matching listings load live from
        our database — scroll down to browse results.
      </p>

      <div className="mt-4 flex max-w-[620px] flex-wrap items-center gap-3 3xl:max-w-[720px] max-md:hidden">
        <span className="font-poppins font-normal text-[13px] text-hz-muted">
          When you are looking for:
        </span>
        {PROPERTY_TYPES.map((type, idx) => (
          <span key={type} className="flex items-center gap-3">
            {idx > 0 && (
              <span className="text-hz-border select-none" aria-hidden="true">
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
    </>
  );

  return (
    <section
      className={cn(
        'relative overflow-hidden font-poppins',
        isLight ? 'bg-hz-page' : 'bg-hz-sunken'
      )}
      aria-label="Hero — Find your home"
    >
      {isLight ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1] max-md:hidden"
          aria-hidden="true"
        >
          <MediaImage
            src={LIGHT_HERO_LEFT_BG}
            alt=""
            width={960}
            height={720}
            className="object-cover object-left opacity-[0.2]"
            wrapperClassName="absolute inset-0"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, #000 0%, #000 34%, rgba(0,0,0,0.75) 48%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.12) 72%, transparent 84%)',
              maskImage:
                'linear-gradient(to right, #000 0%, #000 34%, rgba(0,0,0,0.75) 48%, rgba(0,0,0,0.35) 62%, rgba(0,0,0,0.12) 72%, transparent 84%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 16% 38%, color-mix(in oklch, white 14%, transparent), transparent 48%)',
              WebkitMaskImage:
                'linear-gradient(to right, #000 0%, #000 28%, transparent 68%)',
              maskImage: 'linear-gradient(to right, #000 0%, #000 28%, transparent 68%)',
            }}
          />
        </div>
      ) : (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[55%] md:block"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at left, color-mix(in oklch, oklch(0.55 0.09 250) 18%, transparent), transparent 68%)',
          }}
        />
      )}

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:aspect-[2560/1103] lg:min-h-0">
        <div className="order-2 lg:order-1 relative z-20 flex flex-col justify-center overflow-visible py-12 lg:h-full lg:min-h-0 lg:py-10 lg:pr-14">
          <div className="relative z-10 hero-container lg:mx-0 lg:w-full lg:max-w-none">
            {heroCopy}
            {searchBlock}
            {heroFooter}
          </div>
        </div>

        <div className="relative order-1 lg:order-2 aspect-[1280/1103] w-full min-h-0 overflow-hidden bg-hz-sunken lg:aspect-auto lg:h-full">
          <MediaImage
            src={heroSrc}
            alt="Modern luxury residential home"
            width={1280}
            height={1103}
            className="object-cover object-center"
            wrapperClassName="absolute inset-0"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
