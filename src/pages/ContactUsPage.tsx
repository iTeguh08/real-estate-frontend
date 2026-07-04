import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormField, MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { SITE_CONFIG } from '@/data/site-config';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

const OFFICE_HOURS = [
  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
] as const;

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
    <div className="rounded-hz border border-hz-border bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-hz bg-[#F8F8F8]">
        <Icon size={20} strokeWidth={1.75} className="text-hz-primary" aria-hidden="true" />
      </div>
      <h3 className="font-poppins text-base font-semibold text-hz-dark">{title}</h3>
      <div className="mt-2 font-poppins text-sm leading-relaxed text-hz-muted">{children}</div>
    </div>
  );
}

export function ContactUsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(
      `Thank you, ${name || 'there'}! Your message has been received. Our team will get back to you within 1–2 business days.`
    );
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setInquiryType(INQUIRY_TYPES[0]);
  };

  return (
    <main id="main-content">
      {/* Header */}
      <section className="bg-white py-16 md:py-20">
        <div className="section-container">
          <header className="mx-auto max-w-2xl text-center">
            <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
              Contact Us
            </p>
            <h1 className="font-poppins text-[30px] font-semibold leading-[1.2] tracking-[-0.3px] text-hz-dark md:text-[40px]">
              We&apos;d Love to Hear From You
            </h1>
            <p className="mt-5 font-poppins text-sm leading-relaxed text-hz-muted">
              Have a question about a property, need expert advice, or want to schedule a viewing?
              Reach out and our team will respond promptly.
            </p>
          </header>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-[#F8F8F8] pb-12 pt-0 md:pb-16" aria-label="Contact information">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ContactInfoCard icon={MapPin} title="Visit Us">
              <address className="not-italic">{SITE_CONFIG.contact.address}</address>
            </ContactInfoCard>

            <ContactInfoCard icon={Phone} title="Call Us">
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="text-hz-body no-underline transition-colors hover:text-hz-primary"
              >
                {SITE_CONFIG.contact.phone}
              </a>
            </ContactInfoCard>

            <ContactInfoCard icon={Mail} title="Email Us">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-hz-body no-underline transition-colors hover:text-hz-primary"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </ContactInfoCard>

            <ContactInfoCard icon={Clock} title="Office Hours">
              <ul className="space-y-1">
                {OFFICE_HOURS.map(({ day, hours }) => (
                  <li key={day}>
                    <span className="font-medium text-hz-dark">{day}:</span> {hours}
                  </li>
                ))}
              </ul>
            </ContactInfoCard>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="bg-[#F8F8F8] pb-16 md:pb-20" aria-labelledby="contact-form-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Form */}
            <div>
              <h2
                id="contact-form-heading"
                className="mb-6 font-poppins text-xl font-semibold text-hz-dark"
              >
                Send Us a Message
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-hz border border-hz-border bg-white p-6 shadow-sm md:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="contact-name"
                    label="Full name"
                    value={name}
                    onChange={setName}
                    required
                    autoComplete="name"
                  />
                  <FormField
                    id="contact-email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="contact-phone"
                    label="Phone number"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    autoComplete="tel"
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
                      onChange={(e) => setInquiryType(e.target.value)}
                      className={cn(
                        'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
                        'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60'
                      )}
                    >
                      {INQUIRY_TYPES.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={cn(
                      'w-full resize-y rounded-hz border border-hz-border bg-white px-3 py-2.5',
                      'font-poppins text-sm text-hz-dark outline-none transition-colors',
                      'placeholder:text-hz-muted/60 focus:border-hz-primary/60'
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    'flex w-full items-center justify-center gap-2 rounded-hz bg-hz-primary px-6 py-3',
                    'font-poppins text-sm font-semibold text-white',
                    'transition-colors duration-200 hover:bg-hz-primary-hover'
                  )}
                >
                  <Send size={16} strokeWidth={1.75} aria-hidden="true" />
                  Send Message
                </button>

                {notice && <MockSubmitNotice message={notice} />}
              </form>
            </div>

            {/* Map placeholder */}
            <div className="flex flex-col">
              <h2 className="mb-6 font-poppins text-xl font-semibold text-hz-dark">Find Our Office</h2>
              <div className="flex flex-1 flex-col overflow-hidden rounded-hz border border-hz-border bg-white shadow-sm">
                <div className="relative min-h-[280px] flex-1 bg-hz-bg-soft lg:min-h-0">
                  <iframe
                    title={`${SITE_CONFIG.brand} office location`}
                    src="https://maps.google.com/maps?q=101+E+129th+St,+East+Chicago,+IN+46312&output=embed"
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <div className="border-t border-hz-border p-5">
                  <p className="font-poppins text-sm font-semibold text-hz-dark">
                    {SITE_CONFIG.brand} Headquarters
                  </p>
                  <p className="mt-1 font-poppins text-sm text-hz-muted">
                    {SITE_CONFIG.contact.address}
                  </p>
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
