import { Blueprint, ChatsCircle, MapPin } from '@phosphor-icons/react';
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
          ? 'absolute bottom-0 left-1/2 z-20 w-full max-w-3xl -translate-x-1/2 translate-y-[38%] px-5 md:translate-y-[73%]'
          : 'border-y border-hz-border bg-white py-8 md:py-10'
      }
      aria-label="Property quick actions"
    >
      <ul
        className={
          isFloating
            ? 'flex items-stretch justify-center gap-4 md:gap-6'
            : 'mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-8 md:gap-14'
        }
      >
        {UTILITIES.map(({ id, label, icon: Icon }) => (
          <li key={id} className={isFloating ? 'flex-1 max-w-[100px]' : undefined}>
            <button
              type="button"
              onClick={() => onUtilityAction?.(id)}
              className="group flex w-full flex-col items-center gap-3 text-center"
              aria-label={`${label} for ${property.title}`}
            >
              <span
                className={
                  isFloating
                    ? 'flex aspect-square w-full items-center justify-center rounded-hz border border-hz-border bg-white text-hz-dark shadow-md transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-hz-primary group-hover:text-hz-primary group-hover:shadow-lg'
                    : 'flex size-14 items-center justify-center rounded-full border border-hz-border bg-[#F8F8F8] text-hz-dark transition-colors duration-200 group-hover:border-hz-primary group-hover:text-hz-primary'
                }
              >
                <Icon size={isFloating ? 28 : 24} weight="fill" aria-hidden="true" />
              </span>
              <span className="font-poppins text-xs font-medium text-hz-body group-hover:text-hz-primary">
                {label}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {!isFloating && (
        <p className="mt-6 text-center font-poppins text-xs text-hz-muted">{property.location}</p>
      )}
    </div>
  );
}
