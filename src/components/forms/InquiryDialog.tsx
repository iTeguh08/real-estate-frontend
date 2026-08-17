import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { MapPin } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { useSecurityConfig } from '@/hooks/useSecurityConfig';
import { useSubmitContactMutation } from '@/hooks/mutations';
import { isMockDataEnabled } from '@/services/api-client';
import { applyApiFieldErrors } from '@/lib/apply-api-field-errors';
import { apiErrorMessage } from '@/lib/form-errors';
import {
  inquirySchema,
  liveFormOptions,
  type InquiryFormValues,
} from '@/lib/form-schemas';
import { cn } from '@/lib/utils';

type ContextIcon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}>;

export interface InquiryContextBlock {
  title: string;
  subtitle?: string;
  icon?: ContextIcon;
}

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
  /** When set, renders stacked context chips (e.g. listing + listing agent). */
  contextBlocks?: InquiryContextBlock[];
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
  contextBlocks,
}: InquiryDialogProps) {
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const mutation = useSubmitContactMutation();
  const security = useSecurityConfig();
  const mock = isMockDataEnabled();
  const turnstileRequired = !mock && Boolean(security?.turnstile.enabled && security.turnstile.siteKey);
  const fieldId = (field: string) => `${idPrefix}-${field}-${mode}`;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    ...liveFormOptions,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    },
  });

  // Every open/close transition invalidates the challenge: a Turnstile token is
  // single-use, so it must never survive into the next dialog session.
  const [tokenEpochOpen, setTokenEpochOpen] = useState(open);
  if (tokenEpochOpen !== open) {
    setTokenEpochOpen(open);
    setTurnstileToken('');
  }

  useEffect(() => {
    if (!open) {
      reset();
      clearErrors();
    }
  }, [open, reset, clearErrors]);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset();
      setTurnstileToken('');
      clearErrors();
    }
    onOpenChange(next);
  };

  const onSubmit = handleSubmit((values) => {
    clearErrors('root');

    if (turnstileRequired && !turnstileToken) {
      setError('root', {
        message: 'Please complete the security check before sending.',
      });
      return;
    }

    const composedMessage = [
      values.message.trim() || null,
      mode === 'schedule' && (values.preferredDate || values.preferredTime)
        ? `Preferred visit: ${[values.preferredDate, values.preferredTime].filter(Boolean).join(' · ')}`
        : null,
      '',
      `---`,
      ...contextMeta.filter(Boolean),
    ]
      .filter((line) => line !== null)
      .join('\n');

    if (!composedMessage.replace(/[-=\s]/g, '').length) {
      setError('message', {
        type: 'manual',
        message:
          mode === 'schedule'
            ? 'Add a preferred date/time or a short message.'
            : 'Please write a short message.',
      });
      return;
    }

    mutation.mutate(
      {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
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
          applyApiFieldErrors(err, setError);
          setError('root', {
            message: apiErrorMessage(err, 'Couldn’t send your message. Please try again.'),
          });
        },
      },
    );
  });

  const submitDisabled = mutation.isPending || isSubmitting || (turnstileRequired && !turnstileToken);
  const hasFieldErrors = Boolean(
    errors.name || errors.email || errors.phone || errors.message,
  );

  const resolvedContextBlocks: InquiryContextBlock[] = contextBlocks?.length
    ? contextBlocks
    : [{ title: contextTitle, subtitle: contextSubtitle, icon: ContextIcon }];

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

          <div className="space-y-2">
            {resolvedContextBlocks.map((block, index) => {
              const BlockIcon = block.icon ?? MapPin;
              return (
                <div
                  key={`${block.title}-${index}`}
                  className="flex items-start gap-2.5 rounded-hz bg-hz-sunken px-3 py-2.5"
                >
                  <BlockIcon
                    size={15}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-hz-primary"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-poppins text-sm font-semibold text-hz-ink">{block.title}</p>
                    {block.subtitle ? (
                      <p className="mt-0.5 truncate font-poppins text-xs text-hz-muted">{block.subtitle}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </DialogHeader>

        <form onSubmit={onSubmit} className="relative space-y-4 px-5 py-5" noValidate>
          <HoneypotInput />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormField
                id={fieldId('name')}
                label="Full name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="name"
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormField
                id={fieldId('email')}
                label="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="email"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <FormField
                id={fieldId('phone')}
                label="Phone (optional)"
                type="tel"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                autoComplete="tel"
                inputMode="tel"
                error={errors.phone?.message}
              />
            )}
          />

          {mode === 'schedule' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="preferredDate"
                control={control}
                render={({ field }) => (
                  <FormField
                    id={fieldId('date')}
                    label="Preferred date"
                    type="date"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              <Controller
                name="preferredTime"
                control={control}
                render={({ field }) => (
                  <FormField
                    id={fieldId('time')}
                    label="Preferred time"
                    type="time"
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          ) : null}

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <div className="space-y-1.5">
                <label
                  htmlFor={fieldId('message')}
                  className="font-poppins text-sm font-medium text-hz-dark"
                >
                  Message{mode === 'schedule' ? ' (optional)' : ''}
                </label>
                <textarea
                  id={fieldId('message')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  rows={mode === 'schedule' ? 3 : 4}
                  placeholder={messagePlaceholder}
                  aria-invalid={errors.message ? true : undefined}
                  className={cn(
                    'w-full resize-y rounded-hz border bg-hz-elevated px-3 py-2.5',
                    'font-poppins text-sm text-hz-dark outline-none transition-colors',
                    'placeholder:text-hz-muted/60 focus:border-hz-primary/60',
                    errors.message ? 'border-hz-primary/70' : 'border-hz-border',
                  )}
                />
                {errors.message?.message ? (
                  <p className="font-poppins text-xs text-hz-primary" role="alert">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>
            )}
          />

          <TurnstileWidget onTokenChange={onTurnstileToken} />

          {errors.root?.message && !hasFieldErrors ? (
            <p className="font-poppins text-sm text-hz-primary" role="alert">
              {errors.root.message}
            </p>
          ) : null}

          <div className="pt-1">
            <Button
              type="submit"
              disabled={submitDisabled}
              className="h-auto w-full rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white hover:bg-hz-primary-hover disabled:opacity-60"
            >
              {mutation.isPending || isSubmitting ? 'Sending…' : submitLabel}
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
