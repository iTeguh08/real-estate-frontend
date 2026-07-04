import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PropertyDetail } from '@/types';

export interface PropertyInquiryDialogsProps {
  property: Pick<PropertyDetail, 'title' | 'location'>;
  scheduleOpen: boolean;
  onScheduleOpenChange: (open: boolean) => void;
  contactOpen: boolean;
  onContactOpenChange: (open: boolean) => void;
}

/**
 * Schedule-a-viewing / contact-an-agent modals shared by every property
 * detail layout, so the inquiry flow stays identical regardless of which
 * custom layout a listing uses.
 */
export function PropertyInquiryDialogs({
  property,
  scheduleOpen,
  onScheduleOpenChange,
  contactOpen,
  onContactOpenChange,
}: PropertyInquiryDialogsProps) {
  return (
    <>
      <Dialog open={scheduleOpen} onOpenChange={onScheduleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins text-hz-dark">Schedule a Viewing</DialogTitle>
            <DialogDescription className="font-poppins text-hz-muted">
              Request a private tour for {property.title}. Our team will confirm your preferred date
              and time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => onScheduleOpenChange(false)}
              className="h-auto rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={contactOpen} onOpenChange={onContactOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-poppins text-hz-dark">Contact an Agent</DialogTitle>
            <DialogDescription className="font-poppins text-hz-muted">
              Get in touch about {property.title} at {property.location}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => onContactOpenChange(false)}
              className="h-auto rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover"
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
