import { Bed, Bathtub, ArrowsOut, Car } from '@phosphor-icons/react';
import { MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { luxuryButton, statusBadge, sectionEyebrow } from '@/lib/cva';
import type { Property } from '@/types';

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
    <div className="flex items-center gap-2 rounded-sm border border-luxury-border bg-luxury-cream/60 px-3 py-2">
      <span className="text-luxury-muted" aria-hidden="true">
        {icon}
      </span>
      <span className="font-sans text-sm text-luxury-dark">
        <span className="font-medium">{value}</span>
        <span className="text-luxury-muted">{label}</span>
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
        <DialogContent className="max-h-[min(92vh,820px)] overflow-y-auto p-0 sm:max-w-lg">
          <PropertyDetailBody property={property} />
        </DialogContent>
      )}
    </Dialog>
  );
}

function PropertyDetailBody({ property }: { property: Property }) {
  const { title, location, price, currency, status, type, specs, imageUrl } = property;

  return (
    <>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-luxury-cream">
          <img
            src={imageUrl}
            alt={`${title} — ${location}`}
            className="h-full w-full object-cover"
          />
          <span className={cn(statusBadge({ status, position: 'overlay' }), 'top-4 left-4')}>
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <DialogHeader className="gap-3 text-left">
            <p className={sectionEyebrow()}>
              {type}
            </p>
            <DialogTitle
              className="text-xl font-medium leading-snug text-luxury-dark sm:text-2xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </DialogTitle>
            <DialogDescription asChild>
              <p className="flex items-start gap-1.5 font-sans text-sm leading-relaxed text-luxury-muted">
                <MapPin size={14} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                {location}
              </p>
            </DialogDescription>
          </DialogHeader>

          <p className="font-sans text-2xl font-semibold text-luxury-crimson">
            {currency}{price.toLocaleString()}
          </p>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
            <DetailSpec icon={<Bed size={16} weight="light" />} value={specs.beds} label=" Beds" />
            <DetailSpec icon={<Bathtub size={16} weight="light" />} value={specs.baths} label=" Baths" />
            <DetailSpec
              icon={<ArrowsOut size={16} weight="light" />}
              value={specs.sqft.toLocaleString()}
              label=" sqft"
            />
            {specs.garage !== undefined && (
              <DetailSpec
                icon={<Car size={16} weight="light" />}
                value={specs.garage}
                label=" Garage"
              />
            )}
          </div>

          <Button
            variant="ghost"
            className={cn(luxuryButton({ variant: 'crimson', size: 'lg' }), 'w-full justify-center')}
          >
            View Full Listing
          </Button>
        </div>
      </>
  );
}
