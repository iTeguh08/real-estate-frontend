import type { VariantProps } from 'class-variance-authority';
import { Bed, Bathtub, ArrowsOut, Car } from '@phosphor-icons/react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { propertyCard, statusBadge, newBadge } from '@/lib/cva';
import type { Property } from '@/types';

// ─── Spec pill component ──────────────────────────────────────────────────

interface SpecPillProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

function SpecPill({ icon, value, label }: SpecPillProps) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${value} ${label}`}>
      <span className="text-luxury-muted" aria-hidden="true">
        {icon}
      </span>
      <span className="font-sans text-xs text-luxury-dark/70">
        {value}
        <span className="ml-0.5 text-luxury-muted">{label}</span>
      </span>
    </div>
  );
}

// ─── PropertyCard ─────────────────────────────────────────────────────────

type CardVariants = VariantProps<typeof propertyCard>;

interface PropertyCardProps extends CardVariants {
  property: Property;
  className?: string;
  uniformHeight?: boolean;
  onSelect?: (property: Property) => void;
  onWishlist?: (id: string) => void;
}

export function PropertyCard({
  property,
  variant,
  size,
  className,
  uniformHeight = false,
  onSelect,
  onWishlist,
}: PropertyCardProps) {
  const { id, title, location, price, currency, status, specs, imageUrl, isNew } = property;
  const isListVariant = variant === 'list';
  const isInteractive = Boolean(onSelect);

  const handleActivate = () => {
    onSelect?.(property);
  };

  return (
    <article
      className={cn(
        propertyCard({ variant, size }),
        uniformHeight && 'flex h-full flex-col',
        isInteractive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-crimson/40 focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}, ${status}, ${currency}${price.toLocaleString()}`}
      onClick={isInteractive ? handleActivate : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleActivate();
              }
            }
          : undefined
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* ── Image wrapper ── */}
      <div
        className={cn(
          'relative shrink-0 overflow-hidden bg-luxury-cream',
          isListVariant ? 'w-[180px] shrink-0 rounded-l-xl' : 'rounded-t-xl',
          !isListVariant && (uniformHeight ? 'aspect-[4/3]' : 'aspect-[4/3]')
        )}
      >
        <img
          src={imageUrl}
          alt={`${title} — ${location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />

        {/* Status badge */}
        <span className={cn(statusBadge({ status, position: 'overlay' }))}>
          {status}
        </span>

        {/* Top-right — new label + wishlist */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {isNew && (
            <span className={cn(newBadge())}>New</span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWishlist?.(id);
            }}
            aria-label={`Save ${title} to wishlist`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-luxury-dark/50 transition-colors duration-200 hover:bg-white hover:text-luxury-crimson"
          >
            <Heart size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className={cn(
          'flex flex-col gap-2 p-4',
          uniformHeight && 'min-h-[148px] flex-1 overflow-hidden'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                'font-sans text-sm font-medium text-luxury-dark',
                uniformHeight ? 'line-clamp-2' : 'truncate'
              )}
              title={title}
            >
              {title}
            </h3>
            <p
              className={cn(
                'mt-0.5 font-sans text-xs text-luxury-muted',
                uniformHeight ? 'line-clamp-1' : 'truncate'
              )}
              title={location}
            >
              {location}
            </p>
          </div>
          <p
            className="shrink-0 whitespace-nowrap font-sans text-sm font-semibold text-luxury-crimson"
            aria-label={`Price: ${currency}${price.toLocaleString()}`}
          >
            {currency}{price.toLocaleString()}
          </p>
        </div>

        <div className="my-1 h-px bg-luxury-border" aria-hidden="true" />

        {/* Specs — wrap within fixed height, clip overflow until card is opened */}
        <div
          className={cn(
            'flex flex-wrap items-center gap-x-4 gap-y-1.5',
            uniformHeight && 'max-h-[3.25rem] overflow-hidden'
          )}
        >
          <SpecPill
            icon={<Bed size={13} weight="light" />}
            value={specs.beds}
            label=" Beds"
          />
          <SpecPill
            icon={<Bathtub size={13} weight="light" />}
            value={specs.baths}
            label=" Baths"
          />
          <SpecPill
            icon={<ArrowsOut size={13} weight="light" />}
            value={specs.sqft.toLocaleString()}
            label=" sqft"
          />
          {specs.garage !== undefined && (
            <SpecPill
              icon={<Car size={13} weight="light" />}
              value={specs.garage}
              label=" Garage"
            />
          )}
        </div>
      </div>
    </article>
  );
}
