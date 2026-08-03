import type { PropertyDetail } from '@/types';
import { MediaImage } from '@/components/ui/media-image';
import { sizedImage } from '@/lib/image-url';

export interface PropertyOverviewBackgroundProps {
  imageUrl: string;
}

export function PropertyOverviewBackground({ imageUrl }: PropertyOverviewBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <MediaImage
        src={sizedImage(imageUrl, 720)}
        alt=""
        loading="lazy"
        decoding="async"
        noSkeleton
        className="absolute inset-0 object-cover object-[center_35%] opacity-[0.08] md:opacity-[0.10] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)]"
        wrapperClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-hz-elevated from-0% via-hz-elevated/90 via-[16%] via-hz-elevated/45 via-[32%] to-transparent to-[52%]" />
    </div>
  );
}

/**
 * Soft wash only when a distinct lifestyle vertical exists — never re-decode the cover.
 */
export function getPropertyOverviewBackgroundImage(
  property: Pick<PropertyDetail, 'imageUrl' | 'layout1Media'>
): string | null {
  const vertical = property.layout1Media.featureVerticalUrl;
  if (!vertical || vertical === property.imageUrl) return null;
  return vertical;
}
