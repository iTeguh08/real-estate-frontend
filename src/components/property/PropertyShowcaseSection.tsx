import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { MediaImage } from '@/components/ui/media-image';
import { Skeleton } from '@/components/ui/skeleton';
import { mediaOriginalUrl } from '@/lib/image-url';
import type { PropertyDetail } from '@/types';

export interface PropertyShowcaseSectionProps {
  property: Pick<PropertyDetail, 'title' | 'layout1Media' | 'description' | 'features'>;
  embedded?: boolean;
}

/**
 * Single visual essay for Layout 1 — collage + CMS-backed copy, no mid-scroll CTA.
 */
export function PropertyShowcaseSection({
  property,
  embedded = false,
}: PropertyShowcaseSectionProps) {
  const { title, layout1Media, description, features } = property;
  const verticalUrl = layout1Media.featureVerticalUrl
    ? mediaOriginalUrl(layout1Media.featureVerticalUrl, layout1Media.featureVerticalUrlOriginal)
    : null;
  const squareUrl = layout1Media.featureSquareUrl
    ? mediaOriginalUrl(layout1Media.featureSquareUrl, layout1Media.featureSquareUrlOriginal)
    : null;
  const hasCollage = Boolean(verticalUrl && squareUrl && verticalUrl !== squareUrl);
  const singleUrl = verticalUrl ?? squareUrl ?? null;

  const lifestyleBody =
    features.length > 0
      ? features.slice(0, 3).join(' · ')
      : description.length > 160
        ? `${description.slice(0, 157).trim()}…`
        : description;

  const content = (
    <div className="section-container relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 xl:gap-20">
      <div className="relative mx-auto min-h-[320px] w-full max-w-lg lg:mx-0 lg:min-h-[440px] lg:max-w-none">
        {hasCollage ? (
          <>
            <div className="relative z-[1] aspect-[3/4] w-[62%] overflow-hidden border-[5px] border-hz-elevated shadow-hz-md">
              <MediaImage
                src={verticalUrl!}
                alt={`${title} — interior`}
                loading="lazy"
                decoding="async"
                className="object-cover"
                skeletonDelayMs={0}
              />
            </div>
            <div className="absolute top-[18%] right-0 z-[2] aspect-[4/5] w-[52%] overflow-hidden border-[5px] border-hz-elevated shadow-hz-md">
              <MediaImage
                src={squareUrl!}
                alt={`${title} — detail`}
                loading="lazy"
                decoding="async"
                className="object-cover"
                skeletonDelayMs={120}
              />
            </div>
          </>
        ) : singleUrl ? (
          <div className="aspect-[4/5] w-full max-w-md overflow-hidden rounded-hz shadow-hz-md lg:max-w-none">
            <MediaImage
              src={singleUrl}
              alt={`${title} — interior`}
              loading="lazy"
              decoding="async"
              className="object-cover"
            />
          </div>
        ) : (
          <Skeleton className="aspect-[4/5] w-full max-w-md rounded-hz lg:max-w-none" delayMs={0} />
        )}
      </div>

      <div className="lg:py-4">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          Interior &amp; Lifestyle
        </p>
        <h2
          id="property-showcase-heading"
          className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark text-balance md:text-[36px]"
        >
          A closer look inside
        </h2>
        {lifestyleBody ? (
          <p className="mt-5 max-w-lg font-poppins text-sm leading-[1.65] text-hz-body text-pretty md:text-base">
            {lifestyleBody}
          </p>
        ) : null}
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
      className="relative overflow-hidden bg-hz-sunken py-16 md:py-20"
    >
      <SectionAtmosphere
        tone="light"
        surface="sunken"
        intensity="quiet"
        variant="dual"
        side="right"
        image="interior-light"
        className="max-md:hidden"
      />
      <div className="relative z-10">{content}</div>
    </section>
  );
}
