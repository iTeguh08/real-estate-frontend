import { Button } from '@/components/ui/button';
import type { PropertyDetail } from '@/types';

export interface PropertyShowcaseSectionProps {
  property: Pick<PropertyDetail, 'title' | 'tagline' | 'showcaseImages' | 'imageUrl' | 'description'>;
  onScheduleViewing?: () => void;
  embedded?: boolean;
}

export function PropertyShowcaseSection({
  property,
  onScheduleViewing,
  embedded = false,
}: PropertyShowcaseSectionProps) {
  const { title, tagline, showcaseImages, imageUrl } = property;
  const [primary, secondary] = showcaseImages;

  const content = (
    <div className="section-container relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-20">
      <div className="relative mx-auto min-h-[380px] w-full max-w-lg lg:mx-0 lg:min-h-[480px] lg:max-w-none">
        <div className="relative z-[1] aspect-[3/4] w-[62%] overflow-hidden rounded-hz border-[5px] border-white shadow-lg">
          <img
            src={primary?.url ?? imageUrl}
            alt={primary?.alt ?? `${title} — interior`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-[18%] right-0 z-[2] aspect-[3/4] w-[52%] overflow-hidden rounded-hz border-[5px] border-white shadow-lg">
          <img
            src={secondary?.url ?? imageUrl}
            alt={secondary?.alt ?? `${title} — detail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute bottom-4 left-[8%] z-0 hidden h-32 w-32 rounded-hz border border-hz-border bg-white/60 lg:block"
          aria-hidden="true"
        />
      </div>

      <div className="lg:py-4">
        <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
          Interior &amp; Lifestyle
        </p>
        <h2
          id="property-showcase-heading"
          className="mt-3 font-poppins text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark text-balance"
        >
          Designed for everyday luxury
        </h2>
        <p className="mt-5 max-w-lg font-poppins text-base leading-[1.7] text-hz-body text-pretty md:text-[17px]">
          {tagline}. Every room is arranged to maximize light, flow, and comfort.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={onScheduleViewing}
          className="mt-8 h-auto rounded-hz border-hz-dark bg-white/70 px-8 py-3 font-poppins text-sm font-semibold text-hz-dark backdrop-blur-sm hover:border-hz-primary hover:bg-white/80 hover:text-hz-primary"
        >
          Schedule a Viewing
        </Button>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="relative pb-16 md:pb-20" aria-labelledby="property-showcase-heading">
        {content}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="property-showcase-heading"
      className="relative overflow-hidden bg-[#F8F8F8] py-20 md:py-28"
    >
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-[10%] bottom-0 h-[80%] w-[55%] object-cover opacity-[0.06]"
      />
      {content}
    </section>
  );
}
