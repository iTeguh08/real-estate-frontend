import { Bed, Bathtub, ArrowsOut, CalendarBlank, MapPin } from '@phosphor-icons/react';
import { MediaImage } from '@/components/ui/media-image';
import { formatPropertyLocation } from '@/lib/format-property';
import type { PropertyDetail } from '@/types';
import type { PropertyVillaUtilityAction } from '@/components/property/PropertyVillaHighlights';

export interface PropertyVillaEditorialSectionProps {
  property: Pick<
    PropertyDetail,
    | 'title'
    | 'description'
    | 'tagline'
    | 'specs'
    | 'type'
    | 'layout2Media'
    | 'imageUrl'
    | 'imageUrlOriginal'
    | 'location'
    | 'street'
    | 'city'
    | 'countryCode'
  >;
  onUtilityAction?: (actionId: PropertyVillaUtilityAction) => void;
}

function UtilityPillButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-hz border border-hz-border bg-hz-elevated px-5 py-2.5 font-poppins text-sm font-medium text-hz-dark transition-colors duration-200 hover:border-hz-primary hover:text-hz-primary sm:w-auto"
    >
      {icon}
      {label}
    </button>
  );
}

function PortraitImage({ mediaUrl, title }: { mediaUrl: string; title: string }) {
  return (
    <div className="relative w-[min(78vw,240px)] shrink-0 sm:w-[260px] md:w-[290px] lg:w-[320px]">
      <div
        className="absolute -top-3 -left-3 hidden h-[48%] w-[70%] bg-hz-sunken lg:block"
        aria-hidden="true"
      />
      <div className="relative aspect-[3/4] overflow-hidden">
        <MediaImage
          mediaUrl={mediaUrl}
          fitCover
          coverEstimate={{ width: 320, height: 427 }}
          coverMaxWidth={640}
          alt={`${title} — property overview`}
          loading="lazy"
          decoding="async"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function OverviewCopy({
  property,
}: {
  property: Pick<PropertyDetail, 'title' | 'description' | 'specs' | 'type'>;
}) {
  const { title, description, specs, type } = property;

  return (
    <div>
      <h2
        id="property-villa-overview-heading"
        className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary"
      >
        Property Overview
      </h2>
      <p className="mt-4 font-poppins text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase leading-[1.15] tracking-[-0.02em] text-hz-dark text-balance">
        {title}
      </p>
      <p className="mt-4 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
        {description}
      </p>

      <div className="relative z-10 mt-8 mb-4 grid grid-cols-2 gap-px overflow-hidden border border-hz-border bg-hz-border sm:grid-cols-4 lg:mb-8">
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-4 text-center">
          <Bed size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">{specs.beds}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Beds</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-4 text-center">
          <Bathtub size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">{specs.baths}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Baths</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-4 text-center">
          <ArrowsOut size={20} weight="fill" className="text-hz-dark" aria-hidden="true" />
          <span className="font-poppins text-base font-semibold text-hz-dark">
            {specs.sqft.toLocaleString()}
          </span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Sq Ft</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-hz-elevated px-3 py-4 text-center">
          <span className="font-poppins text-base font-semibold text-hz-dark">{type}</span>
          <span className="font-poppins text-[10px] uppercase tracking-wider text-hz-muted">Type</span>
        </div>
      </div>
    </div>
  );
}

function InteriorCopy({
  property,
  onUtilityAction,
}: {
  property: Pick<PropertyDetail, 'tagline' | 'location' | 'street' | 'city' | 'countryCode'>;
  onUtilityAction?: (actionId: PropertyVillaUtilityAction) => void;
}) {
  const { tagline } = property;
  const canViewLocation = Boolean(formatPropertyLocation(property));

  return (
    <div className="relative z-10 flex max-w-md flex-col justify-center bg-hz-elevated pb-2 lg:pt-8 lg:pb-8">
      <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
        Interior &amp; Lifestyle
      </p>
      <h2
        id="property-villa-highlights-heading"
        className="mt-3 font-poppins text-[clamp(1.5rem,3vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark text-balance"
      >
        Designed for everyday luxury
      </h2>
      <p className="mt-4 max-w-lg font-poppins text-sm leading-[1.7] text-hz-body text-pretty md:text-base">
        {tagline}. Every room is arranged to maximize light, flow, and comfort.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <UtilityPillButton
          icon={<CalendarBlank size={16} weight="fill" aria-hidden="true" />}
          label="Schedule a Viewing"
          onClick={() => onUtilityAction?.('schedule')}
        />
        {canViewLocation ? (
          <UtilityPillButton
            icon={<MapPin size={16} weight="fill" aria-hidden="true" />}
            label="View Location"
            onClick={() => onUtilityAction?.('location')}
          />
        ) : null}
      </div>
    </div>
  );
}

function LandscapeImage({ mediaUrl, title }: { mediaUrl: string; title: string }) {
  return (
    <div className="relative z-0 aspect-video w-full overflow-hidden lg:-mt-[6.5rem] lg:min-h-[300px] lg:w-full xl:-mt-[8rem] xl:min-h-[340px]">
      <MediaImage
        mediaUrl={mediaUrl}
        fitCover
        coverEstimate={{ width: 720, height: 405 }}
        coverMaxWidth={1200}
        alt={`${title} — landscape view`}
        loading="lazy"
        decoding="async"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Unified editorial block for images 1 & 2 — mobile stacks normally; desktop
 * uses one 2×2 grid so columns align and image 2 can pull up flexibly.
 */
export function PropertyVillaEditorialSection({
  property,
  onUtilityAction,
}: PropertyVillaEditorialSectionProps) {
  const { title, layout2Media } = property;
  const portraitMedia = layout2Media.splitVerticalUrl || property.imageUrl;
  const wideMedia = layout2Media.splitLandscapeUrl || property.imageUrl;

  return (
    <section
      aria-labelledby="property-villa-overview-heading"
      className="overflow-visible bg-hz-elevated pt-12 md:pt-16 lg:pb-8"
    >
      <div className="section-container">
        <div className="flex flex-col gap-12 lg:hidden">
          <PortraitImage mediaUrl={portraitMedia} title={title} />
          <OverviewCopy property={property} />
          <InteriorCopy property={property} onUtilityAction={onUtilityAction} />
          <LandscapeImage mediaUrl={wideMedia} title={title} />
        </div>

        <div className="hidden lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-x-16 lg:gap-y-10 xl:gap-x-20">
          <PortraitImage mediaUrl={portraitMedia} title={title} />
          <OverviewCopy property={property} />
          <InteriorCopy property={property} onUtilityAction={onUtilityAction} />
          <LandscapeImage mediaUrl={wideMedia} title={title} />
        </div>
      </div>
    </section>
  );
}
