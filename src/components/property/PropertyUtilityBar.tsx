import { Blueprint, ChatsCircle, MapPin } from '@phosphor-icons/react';
import { formatPropertyLocation } from '@/lib/format-property';
import { cn } from '@/lib/utils';
import type { PropertyDetail } from '@/types';

const UTILITIES = [
  {
    id: 'plan',
    label: 'Floor Plan',
    icon: Blueprint,
  },
  {
    id: 'inquire',
    label: 'Ask an Agent',
    icon: ChatsCircle,
  },
  {
    id: 'location',
    label: 'View Location',
    icon: MapPin,
  },
] as const;

export interface PropertyUtilityBarProps {
  property: Pick<PropertyDetail, 'title' | 'location'>;
  onUtilityAction?: (actionId: (typeof UTILITIES)[number]['id']) => void;
  variant?: 'inline' | 'floating';
}

export function PropertyUtilityBar({
  property,
  onUtilityAction,
  variant = 'inline',
}: PropertyUtilityBarProps) {
  const isFloating = variant === 'floating';

  return (
    <div
      className={
        isFloating
          ? 'absolute bottom-0 left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 translate-y-[62%] px-5 md:translate-y-[73%]'
          : 'border-y border-hz-border bg-hz-elevated py-8 md:py-10'
      }
      aria-label="Property quick actions"
    >
      <ul
        className={
          isFloating
            ? 'flex items-start justify-center gap-3 md:gap-6'
            : 'mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-8 md:gap-14'
        }
      >
        {UTILITIES.map(({ id, label, icon: Icon }) => (
          <li key={id} className={isFloating ? 'w-[90px] shrink-0 md:w-auto md:max-w-[100px] md:flex-1' : undefined}>
            <button
              type="button"
              onClick={() => onUtilityAction?.(id)}
              className="group flex w-full flex-col items-center gap-2 text-center md:gap-3"
              aria-label={`${label} for ${property.title}`}
            >
              <span
                className={
                  isFloating
                    ? 'flex size-[78px] items-center justify-center rounded-hz border border-hz-border bg-hz-elevated text-hz-dark shadow-md transition-colors duration-200 group-hover:border-hz-primary group-hover:text-hz-primary group-hover:shadow-lg md:aspect-square md:size-auto md:w-full md:transition-all md:group-hover:-translate-y-0.5'
                    : 'flex size-14 items-center justify-center rounded-full border border-hz-border bg-hz-sunken text-hz-dark transition-colors duration-200 group-hover:border-hz-primary group-hover:text-hz-primary'
                }
              >
                <Icon
                  weight="fill"
                  aria-hidden="true"
                  className={cn(isFloating ? 'size-[22px] md:size-7' : 'size-6')}
                />
              </span>
              <span className="font-poppins text-[11px] font-medium leading-tight text-hz-body group-hover:text-hz-primary md:text-xs">
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!isFloating && (
        <p className="mt-6 text-center font-poppins text-xs text-hz-muted">
          {formatPropertyLocation(property)}
        </p>
      )}
    </div>
  );
}
