import { useCallback, useState, type FormEvent, type ComponentType } from 'react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget, useSecurityConfig } from '@/components/forms/GuestSpamFields';
import { useSubmitContactMutation } from '@/hooks/mutations';
import { useMockData } from '@/services/api-client';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/services/api-client';

type ContextIcon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

export interface InquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Schedule mode shows preferred date/time and makes message optional. */
  mode?: 'schedule' | 'contact';
  inquiryType: string;
  title: string;
  description: string;
  messagePlaceholder: string;
  submitLabel: string;
  successFallback: string;
  /** Primary line in the context chip (listing title / agent name). */
  contextTitle: string;
  /** Secondary line in the context chip (location / role). */
  contextSubtitle?: string;
  /** Metadata lines appended under --- in the composed message body. */
  contextMeta: string[];
  /** Prefix for field ids when multiple dialogs mount on one page. */
  idPrefix?: string;
  ContextIcon?: ContextIcon;
}

/**
 * Shared contact / schedule inquiry modal — posts to `/contact` with caller-supplied context.
 */
export function InquiryDialog({
  open,
  onOpenChange,
  mode = 'contact',
  inquiryType,
  title,
  description,
  messagePlaceholder,
  submitLabel,
  successFallback,
  contextTitle,
  contextSubtitle,
  contextMeta,
  idPrefix = 'inq',
  ContextIcon = MapPin,
}: InquiryDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const mutation = useSubmitContactMutation();
  const security = useSecurityConfig();
  const mock = useMockData();
  const turnstileRequired = !mock && Boolean(security?.turnstile.enabled && security.turnstile.siteKey);
  const fieldId = (field: string) => `${idPrefix}-${field}-${mode}`;

  const reset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setTurnstileToken('');
    setError('');
    setFieldErrors({});
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (turnstileRequired && !turnstileToken) {
      setError('Please complete the security check before sending.');
      return;
    }

    const composedMessage = [
      message.trim() || null,
      mode === 'schedule' && (preferredDate || preferredTime)
        ? `Preferred visit: ${[preferredDate, preferredTime].filter(Boolean).join(' · ')}`
        : null,
      '',
      `---`,
      ...contextMeta.filter(Boolean),
    ]
      .filter((line) => line !== null)
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

  const submitDisabled = mutation.isPending || (turnstileRequired && !turnstileToken);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-lg"
        overlayClassName="bg-black/50 supports-backdrop-filter:backdrop-blur-sm"
      >
        <DialogHeader className="space-y-3 border-b border-hz-border px-5 pb-4 pt-5 pr-12 text-left">
          <div>
            <DialogTitle className="font-poppins text-xl font-semibold tracking-[-0.3px] text-hz-ink">
              {title}
            </DialogTitle>
            <DialogDescription className="mt-1.5 font-poppins text-sm leading-relaxed text-hz-muted">
              {description}
            </DialogDescription>
          </div>

          <div className="flex items-start gap-2.5 rounded-hz bg-hz-sunken px-3 py-2.5">
            <ContextIcon
              size={15}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-hz-primary"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="truncate font-poppins text-sm font-semibold text-hz-ink">{contextTitle}</p>
              {contextSubtitle ? (
                <p className="mt-0.5 truncate font-poppins text-xs text-hz-muted">{contextSubtitle}</p>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-4 px-5 py-5" noValidate>
          <HoneypotInput />
          <FormField
            id={fieldId('name')}
            label="Full name"
            value={name}
            onChange={(value) => {
              setName(value);
              setFieldErrors((prev) => clearFieldError(prev, 'name'));
            }}
            required
            error={fieldErrors.name?.[0]}
          />
          <FormField
            id={fieldId('email')}
            label="Email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              setFieldErrors((prev) => clearFieldError(prev, 'email'));
            }}
            autoComplete="email"
            required
            error={fieldErrors.email?.[0]}
          />
          <FormField
            id={fieldId('phone')}
            label="Phone (optional)"
            type="tel"
            value={phone}
            onChange={(value) => {
              setPhone(value);
              setFieldErrors((prev) => clearFieldError(prev, 'phone'));
            }}
            autoComplete="tel"
            error={fieldErrors.phone?.[0]}
          />

          {mode === 'schedule' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                id={fieldId('date')}
                label="Preferred date"
                type="date"
                value={preferredDate}
                onChange={setPreferredDate}
              />
              <FormField
                id={fieldId('time')}
                label="Preferred time"
                type="time"
                value={preferredTime}
                onChange={setPreferredTime}
              />
            </div>
          ) : null}

          <div className="space-y-1.5">
            <label
              htmlFor={fieldId('message')}
              className="font-poppins text-sm font-medium text-hz-dark"
            >
              Message{mode === 'schedule' ? ' (optional)' : ''}
            </label>
            <textarea
              id={fieldId('message')}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFieldErrors((prev) => clearFieldError(prev, 'message'));
              }}
              rows={mode === 'schedule' ? 3 : 4}
              placeholder={messagePlaceholder}
              aria-invalid={fieldErrors.message ? true : undefined}
              className={cn(
                'w-full resize-y rounded-hz border bg-hz-elevated px-3 py-2.5',
                'font-poppins text-sm text-hz-dark outline-none transition-colors',
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

          {error && Object.keys(fieldErrors).length === 0 ? (
            <p className="font-poppins text-sm text-hz-primary" role="alert">
              {error}
            </p>
          ) : null}

          <div className="pt-1">
            <Button
              type="submit"
              disabled={submitDisabled}
              className="h-auto w-full rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:opacity-60"
            >
              {mutation.isPending ? 'Sending…' : submitLabel}
            </Button>
            <p className="mt-2.5 text-center font-poppins text-[11px] text-hz-muted">
              We typically respond within 24 hours.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
