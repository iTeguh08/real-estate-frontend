import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormField, MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { HoneypotInput, TurnstileWidget } from '@/components/forms/GuestSpamFields';
import { SectionAtmosphere } from '@/components/decor/SectionAtmosphere';
import { CmsPageSkeleton } from '@/components/skeletons';
import { useContactPageQuery } from '@/hooks/queries';
import { useSubmitContactMutation } from '@/hooks/mutations';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { applyApiFieldErrors } from '@/lib/apply-api-field-errors';
import { apiErrorMessage } from '@/lib/form-errors';
import {
  CONTACT_INQUIRY_TYPES,
  contactSchema,
  type ContactFormValues,
} from '@/lib/form-schemas';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

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

  const [notice, setNotice] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiry_type: CONTACT_INQUIRY_TYPES[0],
      message: '',
    },
  });

  const contactMutation = useSubmitContactMutation();

  const onSubmit = handleSubmit((values) => {
    setSubmitError('');
    setNotice('');

    contactMutation.mutate(
      {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        inquiry_type: values.inquiry_type,
        message: values.message,
        turnstileToken,
      },
      {
        onSuccess: (responseMessage) => {
          setNotice(responseMessage);
          reset({
            name: '',
            email: '',
            phone: '',
            inquiry_type: CONTACT_INQUIRY_TYPES[0],
            message: '',
          });
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

  if (isLoading || !page) {
    return <CmsPageSkeleton />;
  }

  const pending = contactMutation.isPending || isSubmitting;
  const hasFieldErrors = Object.keys(errors).length > 0;

  return (
    <main id="main-content">
      <section className="relative overflow-hidden bg-hz-elevated py-16 md:py-20">
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

      <section
        className="relative overflow-hidden bg-hz-sunken pt-12 pb-16 md:pt-16 md:pb-20"
        aria-labelledby="contact-form-heading"
      >
        <SectionAtmosphere
          tone="light"
          surface="sunken"
          intensity="quiet"
          variant="ambient"
          side="right"
          image="contact-topo"
          photoOpacity={0.34}
          photoScrimMix={42}
          photoFade="exit-soft"
          className="max-md:hidden"
        />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Contact information">
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

          <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2
                id="contact-form-heading"
                className="mb-6 font-poppins text-xl font-semibold text-hz-dark"
              >
                Send Us a Message
              </h2>

              <form
                onSubmit={onSubmit}
                noValidate
                className="relative space-y-5 rounded-hz border border-hz-border bg-hz-elevated p-6 shadow-sm md:p-8"
              >
                <HoneypotInput />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        id="contact-name"
                        label="Full name"
                        value={field.value}
                        onChange={field.onChange}
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
                        id="contact-email"
                        label="Email address"
                        type="email"
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="email"
                        error={errors.email?.message}
                      />
                    )}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        id="contact-phone"
                        label="Phone number"
                        type="tel"
                        value={field.value}
                        onChange={field.onChange}
                        autoComplete="tel"
                        error={errors.phone?.message}
                      />
                    )}
                  />

                  <Controller
                    name="inquiry_type"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-inquiry"
                          className="font-poppins text-sm font-medium text-hz-dark"
                        >
                          Inquiry type
                        </label>
                        <select
                          id="contact-inquiry"
                          value={field.value}
                          onChange={field.onChange}
                          aria-invalid={errors.inquiry_type ? true : undefined}
                          className={cn(
                            'h-11 w-full rounded-hz border bg-hz-elevated px-3',
                            'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60',
                            errors.inquiry_type ? 'border-hz-primary/70' : 'border-hz-border',
                          )}
                        >
                          {CONTACT_INQUIRY_TYPES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.inquiry_type?.message ? (
                          <p className="font-poppins text-xs text-hz-primary" role="alert">
                            {errors.inquiry_type.message}
                          </p>
                        ) : null}
                      </div>
                    )}
                  />
                </div>

                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="font-poppins text-sm font-medium text-hz-dark"
                      >
                        Your message
                      </label>
                      <textarea
                        id="contact-message"
                        value={field.value}
                        onChange={field.onChange}
                        rows={5}
                        placeholder="Tell us how we can help you..."
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

                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-hz bg-hz-primary px-6 py-3',
                    'font-poppins text-sm font-semibold text-white',
                    'transition-colors duration-200 hover:bg-hz-primary-hover disabled:opacity-60',
                  )}
                >
                  <Send size={16} strokeWidth={1.75} aria-hidden="true" />
                  {pending ? 'Sending...' : 'Send Message'}
                </button>

                {notice && <MockSubmitNotice message={notice} />}
                {submitError && !hasFieldErrors && (
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
