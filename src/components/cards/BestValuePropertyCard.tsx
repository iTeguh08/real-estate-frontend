import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { statusBadge } from '@/lib/cva';
import type { PropertyWithAgent } from '@/types';

interface BestValuePropertyCardProps {
  property: PropertyWithAgent;
  className?: string;
  onSelect?: (property: PropertyWithAgent) => void;
}

function formatPricePerSqft(currency: string, price: number, sqft: number) {
  const perSqft = price / sqft;
  return `${currency}${perSqft.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/sqft`;
}

export function BestValuePropertyCard({
  property,
  className,
  onSelect,
}: BestValuePropertyCardProps) {
  const {
    title,
    location,
    price,
    currency,
    status,
    type,
    specs,
    imageUrl,
    agent,
    isFeatured,
  } = property;
  const isInteractive = Boolean(onSelect);

  return (
    <article
      className={cn(
        'group flex h-full overflow-hidden rounded-xl border border-luxury-border bg-white shadow-sm',
        'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'hover:border-luxury-crimson/15 hover:shadow-md',
        isInteractive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-crimson/40 focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}, ${location}, ${formatPricePerSqft(currency, price, specs.sqft)}`}
      onClick={isInteractive ? () => onSelect?.(property) : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect?.(property);
              }
            }
          : undefined
      }
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* Image — fixed 3:2 aspect ratio */}
      <div className="relative aspect-3/2 w-[148px] shrink-0 overflow-hidden bg-luxury-cream sm:w-[168px]">
        <img
          src={imageUrl}
          alt={`${title} — ${location}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        />

        {/* Soft bottom fade — keeps type readable without a heavy badge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent"
          aria-hidden="true"
        />

        {/* Single status badge — top-left only */}
        <span
          className={cn(
            statusBadge({ status, position: 'inline' }),
            'absolute top-2.5 left-2.5 z-10 text-[9px] px-2 py-0.5'
          )}
        >
          {status}
        </span>

        {/* Wishlist — one quiet control, top-right */}
        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-luxury-dark/55 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-luxury-crimson"
        >
          <Heart size={12} strokeWidth={1.75} />
        </button>

        {/* Property type — bottom strip, not a floating box */}
        <span className="absolute bottom-2.5 left-2.5 z-10 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-white/90">
          {type}
        </span>
      </div>

      {/* Content — fixed rhythm so every card matches height */}
      <div className="flex min-h-[168px] min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="min-h-[5.75rem] space-y-1.5">
          <p
            className={cn(
              'font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-600',
              !isFeatured && 'invisible'
            )}
            aria-hidden={!isFeatured}
          >
            Featured
          </p>
          <h3
            className="line-clamp-2 min-h-[2.5rem] font-sans text-sm font-semibold leading-snug text-luxury-dark sm:text-[15px]"
            title={title}
          >
            {title}
          </h3>
          <p
            className="flex min-h-[2.5rem] items-start gap-1.5 font-sans text-xs leading-relaxed text-luxury-muted"
            title={location}
          >
            <MapPin size={11} strokeWidth={1.5} className="mt-0.5 shrink-0" />
            <span className="line-clamp-2">{location}</span>
          </p>
        </div>

        <div className="mt-4 flex min-h-[1.25rem] flex-wrap items-center gap-x-5 gap-y-2 pb-5">
          <span className="flex items-center gap-1.5 font-sans text-xs text-luxury-dark/75">
            <Bed size={13} weight="light" className="text-luxury-muted" aria-hidden="true" />
            {specs.beds}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-xs text-luxury-dark/75">
            <Bathtub size={13} weight="light" className="text-luxury-muted" aria-hidden="true" />
            {specs.baths}
          </span>
          <span className="flex items-center gap-1.5 font-sans text-xs text-luxury-dark/75">
            <ArrowsOut size={13} weight="light" className="text-luxury-muted" aria-hidden="true" />
            {specs.sqft.toLocaleString()} SqFt
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-luxury-border pt-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-luxury-border"
            />
            <span className="truncate font-sans text-xs font-medium text-luxury-dark">
              {agent.name}
            </span>
          </div>
          <p className="shrink-0 text-right font-sans text-xs font-semibold leading-tight text-luxury-crimson sm:text-sm">
            {formatPricePerSqft(currency, price, specs.sqft)}
          </p>
        </div>
      </div>
    </article>
  );
}
