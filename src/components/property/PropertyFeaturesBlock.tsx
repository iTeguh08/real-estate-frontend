import { Check } from 'lucide-react';
import type { PropertyDetail } from '@/types';

export interface PropertyFeaturesBlockProps {
  property: Pick<
    PropertyDetail,
    'title' | 'features' | 'featureImageUrl' | 'imageUrl' | 'showcaseImages'
  >;
  children?: React.ReactNode;
}

export function PropertyFeaturesBlock({ property, children }: PropertyFeaturesBlockProps) {
  const { title, features, featureImageUrl, imageUrl, showcaseImages } = property;
  const tearBackdropImage = showcaseImages[0]?.url ?? imageUrl ?? featureImageUrl;

  return (
    <section
      aria-labelledby="property-features-heading"
      className="relative overflow-visible bg-hz-dark pb-20 pt-16 md:pb-20 md:pt-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 -translate-y-full overflow-hidden md:h-20" aria-hidden="true">
        <img
          src={tearBackdropImage}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center opacity-[0.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/35 to-white" />
      </div>
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-px"
        aria-hidden="true"
      >
        <div className="h-0 w-0 border-x-[34px] border-t-[30px] border-x-transparent border-t-white md:border-x-[42px] md:border-t-[36px]" />
      </div>

      <img
        src={featureImageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right opacity-[0.07]"
      />
      <div className="absolute inset-0 bg-hz-dark/92" aria-hidden="true" />

      <div className="section-container relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
        <div className="lg:pr-6">
          <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-white/65">
            Key Highlights
          </p>
          <h2
            id="property-features-heading"
            className="mt-4 font-poppins text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-white text-balance"
          >
            What makes this home stand out
          </h2>
          <div className="mt-4 h-px w-16 bg-white/35" aria-hidden="true" />
          <p className="mt-5 max-w-lg font-poppins text-sm leading-[1.7] text-white/75 text-pretty md:text-base">
            Curated finishes and practical upgrades across {title} — refined from the first
            walk-through.
          </p>
          <ul className="mt-10 space-y-4" role="list">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0"
              >
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-hz bg-hz-primary/25 text-hz-primary"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={2.5} />
                </span>
                <span className="font-poppins text-sm leading-relaxed text-white/92 md:text-[15px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-hz border-4 border-white/90 shadow-2xl lg:aspect-[4/3]">
            <img
              src={featureImageUrl}
              alt={`${title} — featured interior`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}
