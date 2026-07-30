import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormField, MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { useContactPageQuery } from '@/hooks/queries';
import { useSubmitContactMutation } from '@/hooks/mutations';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';
import type { FieldErrors } from '@/services/api-client';

const INQUIRY_TYPES = [
  'General Inquiry',
  'Buy a Property',
  'Sell a Property',
  'Rent a Property',
  'Schedule a Viewing',
  'Partnership',
] as const;

interface ContactInfoCardProps {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}

function ContactInfoCard({ icon: Icon, title, children }: ContactInfoCardProps) {
  return (
    <div className="rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-hz bg-hz-sunken">
        <Icon size={20} strokeWidth={1.75} className="text-hz-primary" aria-hidden="true" />
      </div>
      <h3 className="font-poppins text-base font-semibold text-hz-dark">{title}</h3>
      <div className="mt-2 font-poppins text-sm leading-relaxed text-hz-muted">{children}</div>
    </div>
  );
}

export function ContactUsPage() {
  const { data: page, isLoading } = useContactPageQuery();
  const { data: siteConfig } = useSiteConfig();
  const brand = siteConfig?.brand ?? 'Homzen';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  const contactMutation = useSubmitContactMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setFieldErrors({});

    contactMutation.mutate(
      {
        name,
        email,
        phone: phone || undefined,
        inquiry_type: inquiryType,
        message,
        turnstileToken,
      },
      {
        onSuccess: (responseMessage) => {
          setNotice(responseMessage);
          setName('');
          setEmail('');
          setPhone('');
          setMessage('');
          setInquiryType(INQUIRY_TYPES[0]);
          setTurnstileToken('');
          setFieldErrors({});
        },
        onError: (error) => {
          setNotice('');
          setFieldErrors(getApiFieldErrors(error));
          setSubmitError(apiErrorMessage(error, 'Something went wrong. Please try again.'));
        },
      },
    );
  };

  if (isLoading || !page) {
    return (
      <main id="main-content" className="section-container py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 rounded-hz bg-hz-bg-soft" />
          <div className="h-40 rounded-hz bg-hz-bg-soft" />
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
        <SectionAtmosphere tone="soft" intensity="quiet" variant="ambient" side="right" image="aerial" />
        <div className="section-container relative z-10">
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              {page.eyebrow}
            </p>
            <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[40px]">
              {page.headline}
            </h1>
            <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">{page.tagline}</p>
          </header>
        </div>
      </section>

      <section className="relative overflow-hidden bg-hz-sunken pb-12 pt-0 md:pb-16" aria-label="Contact information">
        <SectionAtmosphere tone="light" intensity="quiet" variant="edge" side="left" image="interior-light" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ContactInfoCard icon={MapPin} title="Visit Us">
              <address className="not-italic">{page.address}</address>
            </ContactInfoCard>

            <ContactInfoCard icon={Phone} title="Call Us">
              <a
                href={page.phoneHref}
                className="text-hz-body no-underline transition-colors hover:text-hz-primary"
              >
                {page.phone}
              </a>
            </ContactInfoCard>

            <ContactInfoCard icon={Mail} title="Email Us">
              <a
                href={`mailto:${page.email}`}
                className="text-hz-body no-underline transition-colors hover:text-hz-primary"
              >
                {page.email}
              </a>
            </ContactInfoCard>

            <ContactInfoCard icon={Clock} title="Office Hours">
              <ul className="space-y-1">
                {page.officeHours.map(({ day, hours }) => (
                  <li key={day}>
                    <span className="font-medium text-hz-dark">{day}:</span> {hours}
                  </li>
                ))}
              </ul>
            </ContactInfoCard>
          </div>
        </div>
      </section>

      <section className="bg-hz-sunken pb-16 md:pb-20" aria-labelledby="contact-form-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2
                id="contact-form-heading"
                className="mb-6 font-poppins text-xl font-semibold text-hz-dark"
              >
                Send Us a Message
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-5 rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm md:p-8"
              >
                <HoneypotInput />
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="contact-name"
                    label="Full name"
                    value={name}
                    onChange={(value) => {
                      setName(value);
                      setFieldErrors((prev) => clearFieldError(prev, 'name'));
                    }}
                    autoComplete="name"
                    error={fieldErrors.name?.[0]}
                  />
                  <FormField
                    id="contact-email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(value) => {
                      setEmail(value);
                      setFieldErrors((prev) => clearFieldError(prev, 'email'));
                    }}
                    autoComplete="email"
                    error={fieldErrors.email?.[0]}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="contact-phone"
                    label="Phone number"
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
                      htmlFor="contact-inquiry"
                      className="font-poppins text-sm font-medium text-hz-dark"
                    >
                      Inquiry type
                    </label>
                    <select
                      id="contact-inquiry"
                      value={inquiryType}
                      onChange={(e) => {
                        setInquiryType(e.target.value);
                        setFieldErrors((prev) => clearFieldError(prev, 'inquiry_type'));
                      }}
                      aria-invalid={fieldErrors.inquiry_type ? true : undefined}
                      className={cn(
                        'h-11 w-full rounded-hz border bg-hz-elevated px-3',
                        'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
                        fieldErrors.inquiry_type ? 'border-hz-primary/70' : 'border-hz-border'
                      )}
                    >
                      {INQUIRY_TYPES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.inquiry_type?.[0] ? (
                      <p className="font-poppins text-xs text-hz-primary" role="alert">
                        {fieldErrors.inquiry_type[0]}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="font-poppins text-sm font-medium text-hz-dark"
                  >
                    Your message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setFieldErrors((prev) => clearFieldError(prev, 'message'));
                    }}
                    rows={5}
                    placeholder="Tell us how we can help you..."
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

                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-hz bg-hz-primary px-6 py-3',
                    'font-poppins text-sm font-semibold text-white',
                    'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60'
                  )}
                >
                  <Send size={16} strokeWidth={1.75} aria-hidden="true" />
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </button>

                {notice && <MockSubmitNotice message={notice} />}
                {submitError && Object.keys(fieldErrors).length === 0 && (
                  <p className="font-poppins text-sm text-hz-primary" role="alert">
                    {submitError}
                  </p>
                )}
              </form>
            </div>

            <div className="flex flex-col">
              <h2 className="mb-6 font-poppins text-xl font-semibold text-hz-dark">Find Our Office</h2>
              <div className="flex flex-1 flex-col overflow-hidden rounded-hz border border-hz-border bg-hz-elevated shadow-sm">
                <div className="relative min-h-[280px] flex-1 bg-hz-bg-soft lg:min-h-0">
                  <iframe
                    title={`${brand} office location`}
                    src={page.mapEmbedUrl}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-hz-border p-5">
                  <p className="font-poppins text-sm font-semibold text-hz-dark">{brand} Headquarters</p>
                  <p className="mt-1 font-poppins text-sm text-hz-muted">{page.address}</p>
                  <Link
                    to={routes.about}
                    className="mt-4 inline-flex font-poppins text-sm font-medium text-hz-primary no-underline transition-colors hover:underline"
                  >
                    Learn more about us →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 text-center">
            <Link
              to={routes.home}
              className="font-poppins text-sm font-medium text-hz-body no-underline transition-colors hover:text-hz-primary"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
