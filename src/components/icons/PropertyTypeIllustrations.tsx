import { cn } from '@/lib/utils';
import { publicAsset } from '@/lib/public-asset';

interface IllustrationProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Raster line icons are authored in black for light surfaces.
 * Plain img — no skeleton (tiny static assets, skeleton reads as a grey bug).
 */
function iconBase(iconClassName?: string) {
  return cn(
    'h-22 w-20 translate-y-7 object-contain object-center',
    iconClassName
  );
}

function IllustrationImage({ src, className, iconClassName }: { src: string } & IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img src={src} alt="" className={iconBase(iconClassName)} loading="lazy" decoding="async" />
    </div>
  );
}

export function ApartmentIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('apartment-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}

export function VillaIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('villa-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}

export function StudioIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('studio-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}

export function OfficeIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('office-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}

export function TownhouseIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('townhouse-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}

export function CommercialIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <IllustrationImage
      src={publicAsset('commercial-icon.webp')}
      className={className}
      iconClassName={iconClassName}
    />
  );
}
