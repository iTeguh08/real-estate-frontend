import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { ArrowLeftRight, Eye, Heart, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PropertyWithAgent } from '@/types';

interface BestValuePropertyCardProps {
  property: PropertyWithAgent;
  className?: string;
  onSelect?: (property: PropertyWithAgent) => void;
}

function statusLabel(status: PropertyWithAgent['status']) {
  return status.toUpperCase();
}

function formatCardPrice(property: PropertyWithAgent) {
  const { price, currency, status, specs } = property;

  if (status === 'For Rent') {
    return `${currency}${price.toLocaleString('en-US')} /month`;
  }

  const perSqft = price / specs.sqft;
  return `${currency}${perSqft.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} /sqft`;
}

function ImageActionButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-[2px] transition-colors duration-200 hover:bg-black/65"
    >
      {children}
    </button>
  );
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
  onSelect,
}: BestValuePropertyCardProps) {
  const {
    title,
    location,
    status,
    type,
    specs,
    imageUrl,
    agent,
    isFeatured,
  } = property;
  const isInteractive = Boolean(onSelect);

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <article
      className={cn(
        'group flex h-full overflow-hidden rounded-[3px] border border-hz-border bg-white shadow-sm',
        'transition-all duration-300 hover:border-hz-primary/20 hover:shadow-md',
        isInteractive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary/30 focus-visible:ring-offset-2',
        className
      )}
      aria-label={`${title}, ${location}, ${formatCardPrice(property)}`}
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
      <div className="relative w-[168px] shrink-0 self-stretch overflow-hidden bg-hz-bg-soft sm:w-[200px]">
        <img
          src={imageUrl}
          alt={`${title} — ${location}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
        />

        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col items-start gap-1">
          {isFeatured && (
            <span className="rounded-[3px] bg-emerald-600 px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
          <span
            className={cn(
              'rounded-[3px] px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-white',
              status === 'For Rent' ? 'bg-[#3D5A80]' : 'bg-[#2F4B7C]'
            )}
          >
            {statusLabel(status)}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1">
          <ImageActionButton label={`Save ${title} to wishlist`} onClick={stopPropagation}>
            <Heart size={14} strokeWidth={1.75} />
          </ImageActionButton>
          <ImageActionButton label={`Compare ${title}`} onClick={stopPropagation}>
            <ArrowLeftRight size={14} strokeWidth={1.75} />
          </ImageActionButton>
          <ImageActionButton
            label={`Quick view ${title}`}
            onClick={(e) => {
              stopPropagation(e);
              onSelect?.(property);
            }}
          >
            <Eye size={14} strokeWidth={1.75} />
          </ImageActionButton>
        </div>

        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="rounded-[3px] bg-white px-2 py-0.5 font-poppins text-[9px] font-semibold uppercase tracking-wider text-hz-dark shadow-sm">
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
            className="flex items-start gap-1 font-poppins text-xs leading-relaxed text-hz-muted sm:text-[13px]"
            title={location}
          >
            <MapPin size={12} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span className="line-clamp-2">{location}</span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <SpecItem icon={<Bed size={16} weight="fill" />} value={specs.beds} />
          <SpecItem icon={<Bathtub size={16} weight="fill" />} value={specs.baths} />
          <SpecItem
            icon={<ArrowsOut size={16} weight="fill" />}
            value={specs.sqft.toLocaleString()}
            suffix=" SqFt"
          />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-hz-border pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-hz-border"
            />
            <span className="truncate font-poppins text-xs font-medium text-hz-dark sm:text-[13px]">
              {agent.name}
            </span>
          </div>
          <p className="shrink-0 text-right font-poppins text-sm font-semibold text-hz-dark">
            {formatCardPrice(property)}
          </p>
        </div>
      </div>
    </article>
  );
}
