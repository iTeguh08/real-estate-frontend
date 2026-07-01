import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubscribeNewsletterMutation } from '@/hooks/mutations';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const subscribeMutation = useSubscribeNewsletterMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setMessage('');
    subscribeMutation.mutate(email.trim(), {
      onSuccess: () => {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      },
      onError: () => {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      },
    });
  };

  const isLoading = subscribeMutation.isPending;

  return (
    <div>
      <form className="relative" onSubmit={handleSubmit} noValidate>
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
            'h-12 w-full rounded-hz border bg-white/5',
            'pr-14 pl-4 font-poppins text-sm text-white placeholder:text-white/40',
            'outline-none transition-colors duration-200',
            'focus:border-hz-primary/60 focus:bg-white/8',
            status === 'error' ? 'border-hz-primary/70' : 'border-white/15'
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
      </form>

      {message && (
        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={cn(
            'mt-3 font-poppins text-xs',
            status === 'success' ? 'text-white/80' : 'text-hz-primary'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
