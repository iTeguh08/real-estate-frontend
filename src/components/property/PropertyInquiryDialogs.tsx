import { MapPin, UserRound } from 'lucide-react';
import { InquiryDialog } from '@/components/forms/InquiryDialog';
import { formatPropertyLocation } from '@/lib/format-property';
import { agentFirstName, resolveListingAgent } from '@/lib/listing-agent';
import type { PropertyDetail } from '@/types';

export interface PropertyInquiryDialogsProps {
  property: Pick<
    PropertyDetail,
    'id' | 'slug' | 'title' | 'location' | 'street' | 'city' | 'countryCode' | 'agent'
  >;
  scheduleOpen: boolean;
  onScheduleOpenChange: (open: boolean) => void;
  contactOpen: boolean;
  onContactOpenChange: (open: boolean) => void;
}

/**
 * Schedule-a-viewing / contact-an-agent modals — posts to `/contact` with listing + agent context.
 */
export function PropertyInquiryDialogs({
  property,
  scheduleOpen,
  onScheduleOpenChange,
  contactOpen,
  onContactOpenChange,
}: PropertyInquiryDialogsProps) {
  const locationLabel = formatPropertyLocation(property);
  const agent = property.agent ?? resolveListingAgent(property);
  const agentName = agent.name;
  const agentFirst = agentFirstName(agentName);

  const contextBlocks = [
    {
      title: property.title,
      subtitle: locationLabel || undefined,
      icon: MapPin,
    },
    {
      title: agentName,
      subtitle: agent.role || 'Listing Agent',
      icon: UserRound,
    },
  ];

  const contextMeta = [
    `Listing: ${property.title}`,
    `Slug: ${property.slug}`,
    locationLabel ? `Location: ${locationLabel}` : '',
    `Agent: ${agentName}`,
    agent.slug ? `Agent slug: ${agent.slug}` : '',
    agent.role ? `Role: ${agent.role}` : '',
  ].filter(Boolean);

  return (
    <>
      <InquiryDialog
        open={scheduleOpen}
        onOpenChange={onScheduleOpenChange}
        mode="schedule"
        inquiryType="Schedule a Viewing"
        title="Schedule a Viewing"
        description={`Request a private tour of ${property.title}. ${agentFirst} will confirm your preferred date and time.`}
        messagePlaceholder="Any notes for the agent (access instructions, questions…)"
        submitLabel="Submit Request"
        successFallback="Your viewing request has been sent. We’ll reply within 24 hours."
        contextTitle={property.title}
        contextSubtitle={locationLabel || undefined}
        contextBlocks={contextBlocks}
        contextMeta={contextMeta}
        idPrefix="prop-schedule"
      />

      <InquiryDialog
        open={contactOpen}
        onOpenChange={onContactOpenChange}
        mode="contact"
        inquiryType="Buy a Property"
        title={`Contact ${agentName}`}
        description={`Ask ${agentFirst} about this listing — they'll get back to you shortly.`}
        messagePlaceholder={`What would you like to know about ${property.title}?`}
        submitLabel="Send Message"
        successFallback="Your message has been sent. We’ll reply within 24 hours."
        contextTitle={property.title}
        contextSubtitle={locationLabel || undefined}
        contextBlocks={contextBlocks}
        contextMeta={contextMeta}
        idPrefix="prop-contact"
      />
    </>
  );
}
