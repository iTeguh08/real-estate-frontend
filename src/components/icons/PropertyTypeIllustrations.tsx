import { cn } from '@/lib/utils';
import { publicAsset } from '@/lib/public-asset';

interface IllustrationProps {
  className?: string;
  iconClassName?: string;
}

function iconBase(iconClassName?: string) {
  return cn('text-hz-dark', iconClassName);
}

export function ApartmentIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('apartment-icon.webp')}
        alt="Apartment"
        className={cn('h-22 w-20 translate-y-7', iconBase(iconClassName))}
      />
    </div>
  );
}

export function VillaIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('villa-icon.webp')}
        alt="Villa"
        className={cn('h-22 w-20 translate-y-7 brightness-75 contrast-150', iconBase(iconClassName))}
      />
    </div>
  );
}

export function StudioIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('studio-icon.webp')}
        alt="Studio"
        className={cn('h-22 w-20 translate-y-7 brightness-75 contrast-150', iconBase(iconClassName))}
      />
    </div>
  );
}

export function OfficeIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('office-icon.webp')}
        alt="Office"
        className={cn('h-22 w-20 translate-y-7 brightness-75 contrast-150', iconBase(iconClassName))}
      />
    </div>
  );
}

export function TownhouseIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('townhouse-icon.webp')}
        alt="Townhouse"
        className={cn('h-22 w-20 translate-y-7 brightness-75 contrast-150', iconBase(iconClassName))}
      />
    </div>
  );
}

export function CommercialIllustration({ className, iconClassName }: IllustrationProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
      <img
        src={publicAsset('commercial-icon.webp')}
        alt="Commercial"
        className={cn('h-22 w-20 translate-y-7', iconBase(iconClassName))}
      />
    </div>
  );
}
