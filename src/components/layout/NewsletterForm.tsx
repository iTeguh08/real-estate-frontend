import { useCallback, useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { useSubscribeNewsletterMutation } from '@/hooks/mutations';
import { apiErrorMessage, getApiFieldErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';

interface NewsletterFormProps {
  /** Match footer surface — light footer needs dark ink on elevated field. */
  tone?: 'dark' | 'light';
}

export function NewsletterForm({ tone = 'dark' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const isLight = tone === 'light';

  const subscribeMutation = useSubscribeNewsletterMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setStatus('idle');

    subscribeMutation.mutate(
      { email: email.trim(), turnstileToken },
      {
        onSuccess: () => {
          setStatus('success');
          setMessage('Thanks for subscribing!');
          setEmail('');
          setTurnstileToken('');
        },
        onError: (error) => {
          setStatus('error');
          const fieldMessage = getApiFieldErrors(error).email?.[0];
          setMessage(fieldMessage || apiErrorMessage(error, 'Something went wrong. Please try again.'));
        },
      }
    );
  };

  const isLoading = subscribeMutation.isPending;

  return (
    <div>
      <form className="relative space-y-3" onSubmit={handleSubmit} noValidate>
        <HoneypotInput />
        <div className="relative">
          <label htmlFor="footer-newsletter" className="sr-only">
            Email for newsletter
          </label>
          <input
            id="footer-newsletter"
            type="email"
            placeholder="Your e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            disabled={isLoading}
            aria-invalid={status === 'error'}
            aria-describedby={message ? 'newsletter-status' : undefined}
            className={cn(
              'h-12 w-full rounded-hz border pr-14 pl-4 font-poppins text-[14px] font-medium outline-none transition-colors duration-200',
              isLight
                ? cn(
                    'bg-hz-sunken text-hz-ink placeholder:text-hz-muted shadow-hz-sm',
                    'focus:border-hz-primary/50 focus:bg-hz-elevated',
                    status === 'error' ? 'border-hz-primary/70' : 'border-hz-border'
                  )
                : cn(
                    'bg-hz-elevated/10 text-hz-footer-fg placeholder:text-hz-footer-fg/45',
                    'focus:border-hz-primary/60 focus:bg-hz-elevated/14',
                    status === 'error' ? 'border-hz-primary/70' : 'border-hz-footer-fg/25'
                  )
            )}
          />
          <button
            type="submit"
            disabled={isLoading}
            aria-label="Subscribe to newsletter"
            className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-hz bg-hz-primary text-white transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60"
          >
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
        <TurnstileWidget onTokenChange={onTurnstileToken} />
      </form>

      {message && (
        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={cn(
            'mt-3 font-poppins text-xs',
            status === 'success'
              ? isLight
                ? 'text-hz-body'
                : 'text-hz-footer-fg/80'
              : 'text-hz-primary'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
