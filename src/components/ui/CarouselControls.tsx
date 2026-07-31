import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselControlsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  /** e.g. "location slide" → "Go to location slide 2" */
  itemLabel: string;
  tone?: 'light' | 'dark';
  className?: string;
}

const TONE_STYLES = {
  light: {
    arrow: 'border-hz-border bg-transparent text-hz-muted hover:border-hz-primary hover:text-hz-primary',
    dotInactive: 'bg-hz-line hover:bg-hz-muted/50',
  },
  dark: {
    arrow:
      'border-hz-footer-fg/30 bg-transparent text-hz-footer-fg hover:border-hz-primary hover:text-hz-primary',
    dotInactive: 'bg-hz-footer-fg/25 hover:bg-hz-footer-fg/45',
  },
} as const;

export function CarouselControls({
  count,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  itemLabel,
  tone = 'light',
  className,
}: CarouselControlsProps) {
  if (count <= 1) return null;

  const styles = TONE_STYLES[tone];
  const arrowClass = cn(
    'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-hz border transition-colors duration-200',
    styles.arrow
  );

  return (
    <nav
      className={cn('flex items-center justify-center gap-2', className)}
      aria-label={`${itemLabel} carousel`}
    >
      <button type="button" onClick={onPrev} aria-label={`Previous ${itemLabel}`} className={arrowClass}>
        <ChevronLeft size={16} strokeWidth={1.85} aria-hidden="true" />
      </button>

      <div className="flex items-center gap-2 px-1" role="tablist" aria-label={`${itemLabel} pages`}>
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            onClick={() => onSelect(index)}
            aria-label={`Go to ${itemLabel} ${index + 1}`}
            aria-selected={activeIndex === index}
            className={cn(
              'h-2 w-2 rounded-full transition-colors duration-200',
              activeIndex === index ? 'bg-hz-primary' : styles.dotInactive
            )}
          />
        ))}
      </div>

      <button type="button" onClick={onNext} aria-label={`Next ${itemLabel}`} className={arrowClass}>
        <ChevronRight size={16} strokeWidth={1.85} aria-hidden="true" />
      </button>
    </nav>
  );
}
