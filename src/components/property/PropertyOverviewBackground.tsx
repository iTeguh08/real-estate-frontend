import type { PropertyDetail } from '@/types';

export interface PropertyOverviewBackgroundProps {
  imageUrl: string;
}

export function PropertyOverviewBackground({ imageUrl }: PropertyOverviewBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-[0.11] md:opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,transparent_14%,rgba(0,0,0,0.35)_26%,black_40%,black_100%)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white from-0% via-white/90 via-[16%] via-white/45 via-[32%] to-transparent to-[52%]" />
    </div>
  );
}

export function getPropertyOverviewBackgroundImage(
  property: Pick<PropertyDetail, 'imageUrl' | 'showcaseImages'>
): string {
  return property.showcaseImages[0]?.url ?? property.imageUrl;
}
