import { useState } from 'react';
import { Search, LocateFixed, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero.png';

const TABS = ['For Rent', 'For Sale'] as const;
type Tab = (typeof TABS)[number];

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Studio', 'House', 'Office'] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

const TYPE_OPTIONS = ['All', ...PROPERTY_TYPES];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>('For Rent');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All');
  const [activeChip, setActiveChip] = useState<PropertyType>('Apartment');

  return (
    <section
      className="bg-[#F7F7F7] font-poppins min-h-[60dvh] lg:min-h-[80dvh]"
      aria-label="Hero — Find your home"
    >
      <div className="w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[80dvh] lg:items-stretch lg:gap-0">

          {/* ══ LEFT COLUMN ════════════════════════════════════════ */}
          <div className="order-2 lg:order-1 relative z-20 flex flex-col justify-center px-10 max-md:px-5 py-12 lg:py-16 lg:pl-[max(40px,calc((100vw-1280px)/2+40px))] lg:pr-14 3xl:pl-20 3xl:pr-16">
            <div className="max-w-[620px] 3xl:max-w-[720px]">
            {/* Eyebrow */}
            <p className="font-poppins font-semibold text-[12px] text-hz-primary uppercase tracking-[2px] mb-4">
              Real Estate Agency
            </p>

            {/* Headline */}
            <h1
              className={cn(
                'font-poppins font-bold text-hz-dark leading-[1.15] tracking-[-0.5px]',
                'text-[36px] md:text-[42px] lg:text-[48px] 3xl:text-[56px]',
                'max-w-[500px] 3xl:max-w-[580px]'
              )}
            >
              Find A Home That<br />
              Fits Dream Home
            </h1>

            {/* Subtext */}
            <p className="font-poppins font-normal text-[15px] text-hz-muted leading-[1.65] max-w-[460px] 3xl:max-w-[520px] mb-6">
              We are a real estate agency that will help you find the best
              residence for you at an affordable price.
            </p>
            </div>

            {/* ── Property Search Bar — extends to mid-point of hero image ── */}
            <div
              className={cn(
                'relative z-30 mt-0 max-w-[560px]',
                'lg:max-w-none lg:w-[calc(80vw-max(92px,calc((100vw-1280px)/2+92px)))]',
                '3xl:w-[calc(85vw-max(96px,calc((100vw-1680px)/2+96px)))]'
              )}
            >
              {/* Tab Row */}
              <div className="flex">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'font-poppins px-6 py-[10px] text-[12px] uppercase tracking-[0.5px]',
                      'rounded-t-[3px] transition-colors duration-200 cursor-pointer border-none',
                      activeTab === tab
                        ? 'bg-white text-hz-dark font-semibold'
                        : 'bg-[#EDEDED] text-[#888888] font-medium hover:text-hz-dark'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search Container */}
              <div
                className="bg-white rounded-b-[3px] rounded-tr-[10px]"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
              >
                {/* ── Desktop (lg+) ─────────────────────────────── */}
                <div className="hidden lg:flex items-stretch p-3 gap-0">
                  {/* Keyword */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center px-4 border-r border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px]">
                      Keyword
                    </label>
                    <input
                      type="text"
                      placeholder="Search Keywords"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full min-w-0"
                    />
                  </div>

                  {/* Location */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center px-4 border-r border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px]">
                      Location
                    </label>
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="text"
                        placeholder="Search Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full min-w-0"
                      />
                      <LocateFixed size={16} className="shrink-0 text-hz-dark" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center px-4 border-r border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-hz-dark uppercase tracking-[0.8px] mb-[2px]">
                      Type
                    </label>
                    <div className="flex items-center gap-2 min-w-0">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent appearance-none cursor-pointer w-full min-w-0"
                      >
                        {TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} className="shrink-0 text-[#AAAAAA] pointer-events-none" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Advanced */}
                  <button
                    type="button"
                    className="shrink-0 flex items-center gap-2 px-4 font-poppins font-medium text-[13px] text-hz-dark hover:text-hz-primary bg-transparent border-none cursor-pointer transition-colors duration-200 whitespace-nowrap"
                  >
                    <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                    Advanced
                  </button>

                  {/* Find Properties */}
                  <div className="shrink-0 flex items-center pl-2">
                    <button
                      type="button"
                      className={cn(
                        'flex items-center justify-center gap-2',
                        'bg-hz-primary hover:bg-hz-primary-hover text-white',
                        'font-poppins font-semibold text-[14px]',
                        'px-6 py-[14px] rounded-[8px]',
                        'border-none cursor-pointer',
                        'transition-colors duration-200 whitespace-nowrap'
                      )}
                    >
                      <Search size={16} strokeWidth={2} aria-hidden="true" />
                      Find Properties
                    </button>
                  </div>
                </div>

                {/* ── Mobile (< lg) ─────────────────────────────── */}
                <div className="lg:hidden flex flex-col p-3 gap-0">
                  <div className="flex flex-col px-3 py-3 border-b border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-[#AAAAAA] uppercase tracking-[0.8px] mb-[2px]">Keyword</label>
                    <input
                      type="text"
                      placeholder="Search Keywords"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full"
                    />
                  </div>
                  <div className="flex flex-col px-3 py-3 border-b border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-[#AAAAAA] uppercase tracking-[0.8px] mb-[2px]">Location</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent placeholder:text-[#BBBBBB] w-full"
                      />
                      <LocateFixed size={16} className="shrink-0 text-[#AAAAAA]" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex flex-col px-3 py-3 border-b border-[#ECECEC]">
                    <label className="font-poppins font-semibold text-[11px] text-[#AAAAAA] uppercase tracking-[0.8px] mb-[2px]">Type</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="font-poppins font-normal text-[14px] text-hz-dark border-none outline-none bg-transparent appearance-none cursor-pointer w-full"
                      >
                        {TYPE_OPTIONS.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown size={15} className="shrink-0 text-[#AAAAAA] pointer-events-none" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 mx-3 mt-3 font-poppins font-medium text-[13px] text-hz-body hover:text-hz-primary bg-transparent border-none cursor-pointer transition-colors duration-200"
                  >
                    <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
                    Advanced
                  </button>

                  <div className="px-3 pt-3">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 bg-hz-primary hover:bg-hz-primary-hover text-white text-[14px] font-semibold px-4 py-3 rounded-[8px] border-none cursor-pointer transition-colors duration-200 font-poppins"
                    >
                      <Search size={16} strokeWidth={2} aria-hidden="true" />
                      Find Properties
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Property Type Quick Links ──────────────────── */}
            <div className="mt-5 max-w-[620px] 3xl:max-w-[720px] flex items-center gap-3 flex-wrap">
              <span className="font-poppins font-normal text-[13px] text-hz-muted">
                When you are looking for:
              </span>
              {PROPERTY_TYPES.map((type, idx) => (
                <span key={type} className="flex items-center gap-3">
                  {idx > 0 && (
                    <span className="text-[#DDDDDD] select-none" aria-hidden="true">|</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveChip(type)}
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

          {/* ══ RIGHT COLUMN ═══════════════════════════════════════ */}
          <div className="relative order-1 lg:order-2 min-h-[320px] lg:min-h-[80dvh] w-full overflow-hidden">
            <img
              src={heroImage}
              alt="Modern luxury residential home"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
