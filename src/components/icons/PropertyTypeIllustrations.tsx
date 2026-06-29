import {
  BuildingApartment,
  BuildingOffice,
  Buildings,
  House,
  Storefront,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

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
        src="/apartment-icon.webp"
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
        src="/villa-icon.webp"
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
        src="/studio-icon.webp"
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
        src="/office-icon.webp"
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
        src="/townhouse-icon.webp"
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
        src="/commercial-icon.webp"
        alt="Commercial"
        className={cn('h-22 w-20 translate-y-7', iconBase(iconClassName))}
      />
    </div>
  );
}
