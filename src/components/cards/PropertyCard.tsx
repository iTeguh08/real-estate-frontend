import type { VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { ArrowLeftRight, ArrowRight, Eye, Heart, MapPin } from 'lucide-react';
import { ImageActionButton } from '@/components/ui/image-action-button';
import { useCompare } from '@/hooks/useCompare';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPropertyPrice, statusLabel } from '@/lib/format-property';
import { propertyCard } from '@/lib/cva';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import type { Property } from '@/types';

interface SpecPillProps {
  icon: React.ReactNode;
  value: string | number;
  suffix?: string;
}

function SpecPill({ icon, value, suffix }: SpecPillProps) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${value}${suffix ?? ''}`}>
      <span className="text-hz-dark/80" aria-hidden="true">
        {icon}
      </span>
      <span className="font-poppins text-xs text-hz-dark">
        {value}
        {suffix && <span className="text-hz-muted">{suffix}</span>}
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
}

export function PropertyCard({
  property,
  variant,
  size,
  className,
  uniformHeight = false,
  onSelect,
}: PropertyCardProps) {
  const { id, title, location, status, type, specs, imageUrl, isFeatured } = property;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const saved = isWishlisted(id);
  const compared = isCompared(id);
  const isListVariant = variant === 'list';
  const isInteractive = Boolean(onSelect);

  const handleActivate = () => {
    onSelect?.(property);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <article
      className={cn(
        propertyCard({ variant, size }),
        'border border-hz-border',
        uniformHeight && 'flex h-full flex-col',
        isInteractive &&
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary/30 focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}, ${status}, ${formatPropertyPrice(property)}`}
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
      {/* ── Image ── */}
      <div
        className={cn(
          'relative shrink-0 overflow-hidden bg-hz-bg-soft',
          isListVariant ? 'w-[180px] shrink-0 rounded-l-hz' : 'rounded-t-hz',
          !isListVariant && 'aspect-[16/10]'
        )}
      >
        <img
          src={imageUrl}
          alt={`${title} — ${location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />

        {/* Top-left — stacked status badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {isFeatured && (
            <span className="rounded-hz bg-emerald-600 px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
          <span
            className={cn(
              'rounded-hz px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white',
              status === 'For Rent' ? 'bg-[#3D5A80]' : 'bg-[#2F4B7C]'
            )}
          >
            {statusLabel(status)}
          </span>
        </div>

        {/* Top-right — action icons */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <ImageActionButton
            label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
            onClick={(e) => {
              stopPropagation(e);
              toggleWishlist(id);
            }}
          >
            <Heart
              size={16}
              strokeWidth={1.75}
              className={cn(saved && 'fill-hz-primary text-hz-primary')}
            />
          </ImageActionButton>
          <ImageActionButton
            label={compared ? `Remove ${title} from compare` : `Compare ${title}`}
            active={compared}
            onClick={(e) => {
              stopPropagation(e);
              toggleCompare(id);
            }}
          >
            <ArrowLeftRight size={16} strokeWidth={1.75} />
          </ImageActionButton>
          <ImageActionButton
            label={`Quick view ${title}`}
            onClick={(e) => {
              stopPropagation(e);
              handleActivate();
            }}
          >
            <Eye size={16} strokeWidth={1.75} />
          </ImageActionButton>
        </div>

        {/* Bottom-left — property type */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="rounded-hz bg-white px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-hz-dark shadow-sm">
            {type}
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className={cn(
          'flex flex-col gap-3 p-4',
          uniformHeight && 'min-h-[156px] flex-1'
        )}
      >
        <div className="min-w-0 space-y-1.5">
          <h3
            className={cn(
              'font-poppins text-[15px] font-semibold leading-snug text-hz-dark',
              uniformHeight ? 'line-clamp-2' : 'truncate'
            )}
            title={title}
          >
            {title}
          </h3>
          <p
            className={cn(
              'flex items-start gap-1 font-poppins text-xs leading-relaxed text-hz-muted',
              uniformHeight ? 'line-clamp-2' : 'truncate'
            )}
            title={location}
          >
            <MapPin size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{location}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <SpecPill
            icon={<Bed size={18} weight="fill" />}
            value={specs.beds}
          />
          <SpecPill
            icon={<Bathtub size={18} weight="fill" />}
            value={specs.baths}
          />
          <SpecPill
            icon={<ArrowsOut size={18} weight="fill" />}
            value={specs.sqft.toLocaleString()}
            suffix=" SqFt"
          />
        </div>

        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t border-hz-border pt-3',
            uniformHeight && 'mt-auto'
          )}
        >
          <Link
            to={routes.property(property.slug)}
            onClick={stopPropagation}
            className="inline-flex shrink-0 items-center gap-1.5 font-poppins text-[13px] text-hz-body no-underline transition-all duration-200 hover:text-hz-primary hover:underline hover:underline-offset-4 hover:decoration-hz-primary hover:decoration-1"
          >
            Learn More
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
          <p
            className="shrink-0 text-right font-poppins text-sm font-semibold text-hz-dark"
            aria-label={`Price: ${formatPropertyPrice(property)}`}
          >
            {formatPropertyPrice(property)}
          </p>
        </div>
      </div>
    </article>
  );
}
