import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Gallery-matched horizontal slide track for `useDotCarousel`. */
const TRACK_CLASS =
  'flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

type SwipeHandlers = Pick<HTMLAttributes<HTMLDivElement>, 'onTouchStart' | 'onTouchEnd'>;

interface DotCarouselTrackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  activeIndex: number;
  swipeHandlers: SwipeHandlers;
  children: ReactNode;
}

export function DotCarouselTrack({
  activeIndex,
  swipeHandlers,
  className,
  children,
  ...rest
}: DotCarouselTrackProps) {
  return (
    <div
      className={cn('touch-pan-y overflow-hidden', className)}
      {...swipeHandlers}
      {...rest}
    >
      <div
        className={TRACK_CLASS}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
}

interface DotCarouselSlideProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
}

export function DotCarouselSlide({ children, className, ...rest }: DotCarouselSlideProps) {
  return (
    <div className={cn('w-full shrink-0', className)} {...rest}>
      {children}
    </div>
  );
}
