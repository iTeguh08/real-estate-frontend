import { CalendarBlank, ChatsCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { formatPropertyLocation } from '@/lib/format-property';
import type { PropertyDetail } from '@/types';

export interface PropertyContactStripProps {
  property: Pick<PropertyDetail, 'title' | 'location' | 'street' | 'city' | 'countryCode'>;
  onContactAgent?: () => void;
  onScheduleViewing?: () => void;
}

/**
 * Mid-page action strip — Schedule + Ask parity with Layout 2 entry points.
 */
export function PropertyContactStrip({
  property,
  onContactAgent,
  onScheduleViewing,
}: PropertyContactStripProps) {
  const locationLabel = formatPropertyLocation(property);

  return (
    <section aria-label="Contact an agent" className="bg-hz-elevated">
      <div className="section-container flex flex-col items-start gap-5 py-8 sm:flex-row sm:items-center sm:justify-between md:py-10">
        <div className="flex items-center gap-4">
          <span
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-hz-primary/10 text-hz-primary"
            aria-hidden="true"
          >
            <ChatsCircle size={22} weight="fill" />
          </span>
          <div>
            <p className="font-poppins text-[15px] font-semibold text-hz-dark md:text-base">
              Ready to take the next step?
            </p>
            <p className="mt-0.5 font-poppins text-sm text-hz-muted">{locationLabel}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:shrink-0">
          {onScheduleViewing ? (
            <Button
              type="button"
              onClick={onScheduleViewing}
              className="h-auto w-full gap-2 rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover sm:w-auto"
            >
              <CalendarBlank size={17} weight="fill" aria-hidden="true" />
              Schedule a Viewing
            </Button>
          ) : null}
          {onContactAgent ? (
            <Button
              type="button"
              variant="outline"
              onClick={onContactAgent}
              className="h-auto w-full gap-2 rounded-hz border-hz-border px-6 py-3 font-poppins text-sm font-medium text-hz-dark hover:border-hz-primary hover:text-hz-primary sm:w-auto"
            >
              <ChatsCircle size={17} weight="fill" aria-hidden="true" />
              Ask an Agent
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
