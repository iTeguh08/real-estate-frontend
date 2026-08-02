import { InquiryDialog } from '@/components/forms/InquiryDialog';
import { formatPropertyLocation } from '@/lib/format-property';
import type { PropertyDetail } from '@/types';

export interface PropertyInquiryDialogsProps {
  property: Pick<PropertyDetail, 'slug' | 'title' | 'location' | 'street' | 'city' | 'countryCode'>;
  scheduleOpen: boolean;
  onScheduleOpenChange: (open: boolean) => void;
  contactOpen: boolean;
  onContactOpenChange: (open: boolean) => void;
}

/**
 * Schedule-a-viewing / contact-an-agent modals — posts to `/contact` with listing context.
 */
export function PropertyInquiryDialogs({
  property,
  scheduleOpen,
  onScheduleOpenChange,
  contactOpen,
  onContactOpenChange,
}: PropertyInquiryDialogsProps) {
  const locationLabel = formatPropertyLocation(property);
  const contextMeta = [
    `Listing: ${property.title}`,
    `Slug: ${property.slug}`,
    locationLabel ? `Location: ${locationLabel}` : '',
  ].filter(Boolean);

  return (
    <>
      <InquiryDialog
        open={scheduleOpen}
        onOpenChange={onScheduleOpenChange}
        mode="schedule"
        inquiryType="Schedule a Viewing"
        title="Schedule a Viewing"
        description="Request a private tour. Our team will confirm your preferred date and time."
        messagePlaceholder="Any notes for the agent (access instructions, questions…)"
        submitLabel="Submit Request"
        successFallback="Your viewing request has been sent. We’ll reply within 24 hours."
        contextTitle={property.title}
        contextSubtitle={locationLabel || undefined}
        contextMeta={contextMeta}
        idPrefix="prop-schedule"
      />

      <InquiryDialog
        open={contactOpen}
        onOpenChange={onContactOpenChange}
        mode="contact"
        inquiryType="Buy a Property"
        title="Contact an Agent"
        description="Ask a question about this listing — an advisor will get back to you."
        messagePlaceholder="Tell us what you’d like to know about this listing…"
        submitLabel="Send Message"
        successFallback="Your message has been sent. We’ll reply within 24 hours."
        contextTitle={property.title}
        contextSubtitle={locationLabel || undefined}
        contextMeta={contextMeta}
        idPrefix="prop-contact"
      />
    </>
  );
}
