import { Link } from 'react-router-dom';
import { Bed, Bathtub, ArrowsOut, Car } from '@phosphor-icons/react';
import { MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { MediaImage } from '@/components/ui/media-image';
import { propertyOriginalUrl } from '@/lib/image-url';
import { formatPropertyLocation, formatPropertyPrice } from '@/lib/format-property';
import type { Property } from '@/types';
import { routes } from '@/lib/routes';

interface PropertyDetailDialogProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DetailSpec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-hz border border-hz-border bg-hz-sunken px-3 py-2">
      <span className="text-hz-dark/80" aria-hidden="true">
        {icon}
      </span>
      <span className="font-poppins text-sm text-hz-dark">
        <span className="font-medium">{value}</span>
        <span className="text-hz-muted">{label}</span>
      </span>
    </div>
  );
}

export function PropertyDetailDialog({
  property,
  open,
  onOpenChange,
}: PropertyDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {property && (
        <DialogContent className="flex max-h-[min(92vh,820px)] flex-col overflow-hidden p-0 sm:max-w-lg">
          <PropertyDetailBody property={property} />
        </DialogContent>
      )}
    </Dialog>
  );
}

function PropertyDetailBody({ property }: { property: Property }) {
  const { title, status, type, specs } = property;
  const locationLabel = formatPropertyLocation(property);

  return (
    <>
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-hz bg-hz-bg-soft">
        <MediaImage
          src={propertyOriginalUrl(property)}
          alt={`${title} — ${locationLabel}`}
          decoding="async"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 z-10 rounded-hz bg-hz-primary px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white">
          {status}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6">
        <DialogHeader className="gap-3 text-left">
          <p className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-hz-primary">
            {type}
          </p>
          <DialogTitle className="font-poppins text-xl font-semibold leading-snug text-hz-dark sm:text-2xl">
            {title}
          </DialogTitle>
          <DialogDescription asChild>
            <p className="flex items-start gap-1.5 font-poppins text-sm leading-relaxed text-hz-muted">
              <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              {locationLabel}
            </p>
          </DialogDescription>
        </DialogHeader>

        <p className="font-poppins text-2xl font-semibold text-hz-dark">
          {formatPropertyPrice(property)}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <DetailSpec icon={<Bed size={18} weight="fill" />} value={specs.beds} label=" Beds" />
          <DetailSpec icon={<Bathtub size={18} weight="fill" />} value={specs.baths} label=" Baths" />
          <DetailSpec
            icon={<ArrowsOut size={18} weight="fill" />}
            value={specs.sqft.toLocaleString()}
            label=" sqft"
          />
          {specs.garage !== undefined && (
            <DetailSpec icon={<Car size={18} weight="fill" />} value={specs.garage} label=" Garage" />
          )}
        </div>

          <Link
            to={routes.propertyById(property.id)}
            className={cn(
              'flex w-full items-center justify-center rounded-hz bg-hz-primary px-6 py-3',
              'font-poppins text-sm font-semibold text-white no-underline',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
          >
            View Full Listing
          </Link>
      </div>
    </>
  );
}
