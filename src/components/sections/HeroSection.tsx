import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { luxuryButton, sectionEyebrow } from '@/lib/cva';

// Luxury villa exterior — wood cladding, glass, landscaped grounds (real-estate hero)
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80';

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[88dvh] bg-[--color-luxury-cream] overflow-hidden"
      aria-label="Hero section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88dvh] items-center gap-10 lg:gap-0">

          {/* ── Left: Copy ─────────────────────────────────── */}
          <div className="flex flex-col gap-6 pt-16 pb-10 lg:pt-0 lg:pb-0 lg:pr-12 max-w-[600px]">

            {/* Kicker */}
            <p className={sectionEyebrow()}>
              #1 Luxury Real Estate Platform
            </p>

            {/* Heading — Cormorant Garamond, editorial weight */}
            <h1
              className="text-[clamp(2.6rem,5vw,5rem)] font-light leading-[1.06] text-[--color-luxury-dark] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Find A Home That<br />
              <em className="not-italic font-normal">Fits Dream Home</em>
            </h1>

            <p className="font-sans text-[15px] leading-relaxed text-[--color-luxury-muted] max-w-[440px]">
              We are a real estate agency that will help you find the best
              residence for you at an affordable price.
            </p>

            {/* Stat pills */}
            <div className="flex items-center gap-6 mt-2">
              {[
                { value: '7,500+', label: 'Properties Listed' },
                { value: '3,200+', label: 'Happy Clients' },
                { value: '15+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-2xl font-light text-[--color-luxury-dark]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-sans text-[--color-luxury-muted] uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Button
                variant="ghost"
                className={cn(luxuryButton({ variant: 'crimson', size: 'lg' }))}
                aria-label="Find properties"
              >
                Find Properties
                <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <ArrowRight size={13} strokeWidth={2} />
                </span>
              </Button>
              <Button
                variant="ghost"
                className={cn(luxuryButton({ variant: 'outline', size: 'lg' }))}
                aria-label="List your property"
              >
                List Property
              </Button>
            </div>
          </div>

          {/* ── Right: Hero Image ───────────────────────────── */}
          <div className="relative h-[520px] lg:h-full flex items-end lg:items-center justify-center">
            <div className="relative w-full max-w-[560px] mx-auto">
              {/* Outer shell — Double-Bezel technique */}
              <div className="ring-1 ring-[--color-luxury-border] rounded-2xl p-1.5 bg-white/40 shadow-sm">
                <div className="rounded-[calc(1rem-2px)] overflow-hidden">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Luxury villa exterior with modern architecture and landscaped grounds"
                    className="w-full h-[440px] lg:h-[560px] object-cover object-[center_35%]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Floating property-count badge */}
              <div className="absolute -bottom-4 -left-6 hidden md:flex items-center gap-3 bg-white rounded-xl shadow-md px-4 py-3">
                <span
                  className="text-2xl font-light text-[--color-luxury-crimson]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  500+
                </span>
                <span className="text-[11px] font-sans text-[--color-luxury-dark]/60 uppercase tracking-widest leading-tight">
                  Premium<br />Listings
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
