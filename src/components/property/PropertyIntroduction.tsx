import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import type { PropertyDetail } from '@/types';

export interface PropertyIntroductionProps {
  property: Pick<PropertyDetail, 'tagline' | 'description' | 'specs' | 'type'>;
  embedded?: boolean;
}

export function PropertyIntroduction({ property, embedded = false }: PropertyIntroductionProps) {
  const { tagline, description, specs, type } = property;

  const content = (
    <div className="section-container relative mx-auto max-w-3xl text-center">
      <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
        Property Overview
      </p>
      <h2
        id="property-intro-heading"
        className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark text-balance md:text-[36px]"
      >
        {tagline}
      </h2>
      <p className="mx-auto mt-4 max-w-lg font-poppins text-sm leading-[1.65] text-hz-body text-pretty md:text-[15px]">
        {description}
      </p>

      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-hz border border-hz-border bg-hz-border sm:grid-cols-4">
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-3.5 text-center">
          <Bed size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">{specs.beds}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Beds</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-3.5 text-center">
          <Bathtub size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">{specs.baths}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Baths</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-3.5 text-center">
          <ArrowsOut size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">
            {specs.sqft.toLocaleString()}
          </span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Sq Ft</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-3.5 text-center">
          <span className="font-poppins text-base font-semibold text-hz-dark">{type}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Type</span>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="relative pt-12 pb-10 md:pt-16 md:pb-12" aria-labelledby="property-intro-heading">
        {content}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="property-intro-heading"
      className="relative overflow-hidden bg-hz-elevated pt-16 pb-12 md:pt-20 md:pb-14"
    >
      <SectionAtmosphere
        tone="soft"
        surface="elevated"
        intensity="quiet"
        variant="ambient"
        side="left"
        image="interior-light"
      />
      <div className="relative z-10">{content}</div>
    </section>
  );
}
