import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget, useSecurityConfig } from '@/components/forms/GuestSpamFields';
import { useSubscribeNewsletterMutation } from '@/hooks/mutations';
import { applyApiFieldErrors } from '@/lib/apply-api-field-errors';
import { apiErrorMessage } from '@/lib/form-errors';
import { newsletterSchema, type NewsletterFormValues } from '@/lib/form-schemas';
import { isMockDataEnabled } from '@/services/api-client';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  /** Match footer surface — light footer needs dark ink on elevated field. */
  tone?: 'dark' | 'light';
}

export function NewsletterForm({ tone = 'dark' }: NewsletterFormProps) {
  const [notice, setNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const isLight = tone === 'light';

  const security = useSecurityConfig();
  const mock = isMockDataEnabled();
  const turnstileRequired = !mock && Boolean(security?.turnstile.enabled && security.turnstile.siteKey);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const subscribeMutation = useSubscribeNewsletterMutation();

  const onSubmit = handleSubmit((values) => {
    setSubmitError('');
    setNotice('');

    if (turnstileRequired && !turnstileToken) {
      setSubmitError('Please complete the security check before subscribing.');
      return;
    }

    subscribeMutation.mutate(
      { email: values.email, turnstileToken },
      {
        onSuccess: (responseMessage) => {
          setNotice(responseMessage);
          reset({ email: '' });
          setTurnstileToken('');
        },
        onError: (error) => {
          setNotice('');
          applyApiFieldErrors(error, setError);
          setSubmitError(apiErrorMessage(error, 'Something went wrong. Please try again.'));
        },
      },
    );
  });

  const pending = subscribeMutation.isPending || isSubmitting;
  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <div>
      <form className="relative space-y-3" onSubmit={onSubmit} noValidate>
        <HoneypotInput />
        <div className="relative">
          <label htmlFor="footer-newsletter" className="sr-only">
            Email for newsletter
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Your e-mail"
                value={field.value}
                onChange={field.onChange}
                disabled={pending}
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={notice || submitError ? 'newsletter-status' : undefined}
                className={cn(
                  'h-12 w-full rounded-hz border pr-14 pl-4 font-poppins text-[14px] font-medium outline-none transition-colors duration-200',
                  isLight
                    ? cn(
                        'bg-hz-sunken text-hz-ink placeholder:text-hz-muted shadow-hz-sm',
                        'focus:border-hz-primary/50 focus:bg-hz-elevated',
                        errors.email ? 'border-hz-primary/70' : 'border-hz-border',
                      )
                    : cn(
                        'bg-hz-elevated/10 text-hz-footer-fg placeholder:text-hz-footer-fg/45',
                        'focus:border-hz-primary/60 focus:bg-hz-elevated/14',
                        errors.email ? 'border-hz-primary/70' : 'border-hz-footer-fg/25',
                      ),
                )}
              />
            )}
          />
          <button
            type="submit"
            disabled={pending || (turnstileRequired && !turnstileToken)}
            aria-label="Subscribe to newsletter"
            className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-hz bg-hz-primary text-white transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        {errors.email?.message ? (
          <p className="font-poppins text-xs text-hz-primary" role="alert">
            {errors.email.message}
          </p>
        ) : null}

        <TurnstileWidget onTokenChange={onTurnstileToken} />
      </form>

      {notice ? (
        <div className="mt-3">
          <MockSubmitNotice message={notice} />
        </div>
      ) : null}
      {submitError && !hasFieldErrors ? (
        <p
          id="newsletter-status"
          className="mt-3 font-poppins text-xs text-hz-primary"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}
    </div>
  );
}
