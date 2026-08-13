import { useNavigate } from 'react-router-dom';
import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { ArrowLeftRight, Eye, Heart, MapPin } from 'lucide-react';
import { ImageActionButton } from '@/components/ui/image-action-button';
import { MediaImage } from '@/components/ui/media-image';
import { useCompare } from '@/hooks/useCompare';
import { useWishlist } from '@/hooks/useWishlist';
import { formatPerSqftPrice, formatPropertyLocation, statusLabel } from '@/lib/format-property';
import { productThumbUrl } from '@/lib/image-url';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import type { PropertyWithAgent } from '@/types';

interface BestValuePropertyCardProps {
  property: PropertyWithAgent;
  className?: string;
  outerBorderClassName?: string;
  /** Opens quick-view dialog (Eye icon only). Card click navigates to the full listing. */
  onSelect?: (property: PropertyWithAgent) => void;
}

function SpecItem({
  icon,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  value: string | number;
  suffix?: string;
}) {
  return (
    <span className="flex items-center gap-1.5 font-poppins text-xs text-hz-dark">
      <span className="text-hz-dark/80" aria-hidden="true">
        {icon}
      </span>
      {value}
      {suffix && <span className="text-hz-muted">{suffix}</span>}
    </span>
  );
}

export function BestValuePropertyCard({
  property,
  className,
  outerBorderClassName = 'border-hz-border',
  onSelect,
}: BestValuePropertyCardProps) {
  const navigate = useNavigate();
  const {
    id,
    slug,
    title,
    status,
    type,
    specs,
    imageUrl,
    agent,
    isFeatured,
  } = property;
  const locationLabel = formatPropertyLocation(property);
  const { isWishlisted, toggleWishlist, isTogglingId: wishlistTogglingId } = useWishlist();
  const { isCompared, toggleCompare, isTogglingId: compareTogglingId } = useCompare();
  const saved = isWishlisted(id);
  const compared = isCompared(id);
  const detailPath = routes.property(slug);

  const goToDetail = () => {
    navigate(detailPath);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <article
      className={cn(
        'group flex h-full cursor-pointer overflow-hidden rounded-hz bg-hz-elevated shadow-hz-sm',
        outerBorderClassName,
        'transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'hover:-translate-y-0.5 hover:shadow-hz-elevated',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary/30 focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}, ${locationLabel}, ${formatPerSqftPrice(property)}`}
      onClick={goToDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToDetail();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div className="relative aspect-square w-[168px] shrink-0 overflow-hidden bg-hz-bg-soft sm:w-[200px]">
        <MediaImage
          mediaUrl={productThumbUrl(imageUrl)}
          fitCover
          coverEstimate={{ width: 200, height: 200 }}
          coverMaxWidth={400}
          alt={`${title} — ${locationLabel}`}
          loading="lazy"
          decoding="async"
          className="object-cover transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />

        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1">
          {isFeatured && (
            <span className="rounded-hz bg-emerald-600 px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
          <span className="rounded-hz bg-hz-inverse px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-hz-inverse-fg">
            {statusLabel(status)}
          </span>
        </div>

        {/* Narrow thumbnail — stack actions below badges to avoid overlap */}
        <div className="absolute top-14 right-2.5 z-10 flex flex-col items-center gap-1">
          <ImageActionButton
            size="sm"
            label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
            active={saved}
            loading={wishlistTogglingId === id}
            onClick={(e) => {
              stopPropagation(e);
              toggleWishlist(id);
            }}
          >
            <Heart
              size={14}
              strokeWidth={1.75}
              className={cn(saved && 'fill-hz-primary text-hz-primary')}
            />
          </ImageActionButton>
          <ImageActionButton
            size="sm"
            label={compared ? `Remove ${title} from compare` : `Compare ${title}`}
            active={compared}
            loading={compareTogglingId === id}
            onClick={(e) => {
              stopPropagation(e);
              toggleCompare(id);
            }}
          >
            <ArrowLeftRight
              size={14}
              strokeWidth={1.75}
              className={cn(compared && 'text-hz-primary')}
            />
          </ImageActionButton>
          {onSelect && (
            <div className="hidden sm:contents">
              <ImageActionButton
                size="sm"
                label={`Quick view ${title}`}
                onClick={(e) => {
                  stopPropagation(e);
                  onSelect(property);
                }}
              >
                <Eye size={14} strokeWidth={1.75} />
              </ImageActionButton>
            </div>
          )}
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="rounded-hz bg-hz-elevated px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-hz-dark shadow-sm">
            {type}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="min-w-0 space-y-1.5">
          <h3
            className="line-clamp-2 font-poppins text-[15px] font-semibold leading-snug text-hz-dark sm:text-base"
            title={title}
          >
            {title}
          </h3>
          <p
            className="flex items-start gap-1 font-poppins text-xs leading-relaxed text-hz-body sm:text-[13px]"
            title={locationLabel}
          >
            <MapPin size={12} strokeWidth={1.75} className="mt-0.5 shrink-0 text-hz-muted" aria-hidden="true" />
            <span className="line-clamp-2">{locationLabel}</span>
          </p>
        </div>

        <div className="my-3.5 h-[0.5px] w-full bg-hz-line/50" aria-hidden="true" />

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <SpecItem icon={<Bed size={16} weight="regular" />} value={specs.beds} />
          <SpecItem icon={<Bathtub size={16} weight="regular" />} value={specs.baths} />
          <SpecItem
            icon={<ArrowsOut size={16} weight="regular" />}
            value={specs.sqft.toLocaleString()}
            suffix=" SqFt"
          />
        </div>

        <div className="my-3.5 h-[0.5px] w-full bg-hz-line/50" aria-hidden="true" />

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-hz-border">
            <MediaImage
              mediaUrl={productThumbUrl(agent.avatarUrl)}
              fitCover
              coverEstimate={{ width: 32, height: 32 }}
              coverMaxWidth={96}
              alt={agent.name}
              loading="lazy"
              decoding="async"
              className="object-cover"
            />
          </div>
            <span className="truncate font-poppins text-xs font-medium text-hz-dark sm:text-[13px]">
              {agent.name}
            </span>
          </div>
          <p className="shrink-0 text-right font-poppins text-sm font-semibold text-hz-dark">
            {formatPerSqftPrice(property)}
          </p>
        </div>
      </div>
    </article>
  );
}
