import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { useSubmitContactMutation } from '@/hooks/mutations';
import { formatPropertyLocation } from '@/lib/format-property';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/services/api-client';
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
  return (
    <>
      <InquiryDialog
        open={scheduleOpen}
        onOpenChange={onScheduleOpenChange}
        property={property}
        inquiryType="Schedule a Viewing"
        title="Schedule a Viewing"
        description={`Request a private tour for ${property.title}. Our team will confirm your preferred date and time.`}
        messagePlaceholder="Preferred days/times and any notes for the agent…"
        submitLabel="Submit Request"
        successFallback="Your viewing request has been sent."
      />

      <InquiryDialog
        open={contactOpen}
        onOpenChange={onContactOpenChange}
        property={property}
        inquiryType="Buy a Property"
        title="Contact an Agent"
        description={`Get in touch about ${property.title} at ${formatPropertyLocation(property)}.`}
        messagePlaceholder="Tell us what you’d like to know about this listing…"
        submitLabel="Send Message"
        successFallback="Your message has been sent."
      />
    </>
  );
}

interface InquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: PropertyInquiryDialogsProps['property'];
  inquiryType: string;
  title: string;
  description: string;
  messagePlaceholder: string;
  submitLabel: string;
  successFallback: string;
}

function InquiryDialog({
  open,
  onOpenChange,
  property,
  inquiryType,
  title,
  description,
  messagePlaceholder,
  submitLabel,
  successFallback,
}: InquiryDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const mutation = useSubmitContactMutation();

  const reset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTurnstileToken('');
    setError('');
    setFieldErrors({});
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const location = formatPropertyLocation(property);
    const composedMessage = [
      message.trim(),
      '',
      `---`,
      `Listing: ${property.title}`,
      `Slug: ${property.slug}`,
      location ? `Location: ${location}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    mutation.mutate(
      {
        name,
        email,
        phone: phone || undefined,
        inquiry_type: inquiryType,
        message: composedMessage,
        turnstileToken,
      },
      {
        onSuccess: (responseMessage) => {
          toast.success(responseMessage || successFallback);
          handleOpenChange(false);
        },
        onError: (err) => {
          setFieldErrors(getApiFieldErrors(err));
          setError(apiErrorMessage(err, 'Something went wrong. Please try again.'));
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-poppins text-hz-dark">{title}</DialogTitle>
          <DialogDescription className="font-poppins text-hz-muted">{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
          <HoneypotInput />
          <FormField
            id={`inq-name-${inquiryType}`}
            label="Full name"
            value={name}
            onChange={(value) => {
              setName(value);
              setFieldErrors((prev) => clearFieldError(prev, 'name'));
            }}
            error={fieldErrors.name?.[0]}
          />
          <FormField
            id={`inq-email-${inquiryType}`}
            label="Email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setFieldErrors((prev) => clearFieldError(prev, 'email'));
            }}
            autoComplete="email"
            error={fieldErrors.email?.[0]}
          />
          <FormField
            id={`inq-phone-${inquiryType}`}
            label="Phone"
            type="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setFieldErrors((prev) => clearFieldError(prev, 'phone'));
            }}
            autoComplete="tel"
            error={fieldErrors.phone?.[0]}
          />
          <div className="space-y-1.5">
            <label
              htmlFor={`inq-message-${inquiryType}`}
              className="font-poppins text-sm font-medium text-hz-dark"
            >
              Message
            </label>
            <textarea
              id={`inq-message-${inquiryType}`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFieldErrors((prev) => clearFieldError(prev, 'message'));
              }}
              rows={4}
              placeholder={messagePlaceholder}
              aria-invalid={fieldErrors.message ? true : undefined}
              className={cn(
                'w-full resize-y rounded-hz border bg-hz-elevated px-3 py-2.5',
                'font-poppins text-sm text-hz-dark outline-none',
                'placeholder:text-hz-muted/60 focus:border-hz-primary/60',
                fieldErrors.message ? 'border-hz-primary/70' : 'border-hz-border'
              )}
            />
            {fieldErrors.message?.[0] ? (
              <p className="font-poppins text-xs text-hz-primary" role="alert">
                {fieldErrors.message[0]}
              </p>
            ) : null}
          </div>

          <TurnstileWidget onTokenChange={onTurnstileToken} />

          {error && Object.keys(fieldErrors).length === 0 && (
            <p className="font-poppins text-sm text-hz-primary" role="alert">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-auto rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:opacity-60"
            >
              {mutation.isPending ? 'Sending…' : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
