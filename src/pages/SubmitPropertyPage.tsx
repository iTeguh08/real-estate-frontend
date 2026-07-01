import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FormField, MockSubmitNotice } from '@/components/auth/AuthFormShell';
import { routes } from '@/lib/routes';
import type { PropertyStatus, PropertyType } from '@/types';

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'Villa',
  'Townhouse',
  'Studio',
  'Office',
  'Commercial',
];

const PROPERTY_STATUSES: PropertyStatus[] = ['For Sale', 'For Rent', 'Off Plan'];

export function SubmitPropertyPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PropertyType>('Apartment');
  const [status, setStatus] = useState<PropertyStatus>('For Sale');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNotice(
      `Thanks! "${title || 'Your property'}" has been saved locally as a draft. Listing submission will connect to the backend later.`
    );
    setTitle('');
    setLocation('');
    setPrice('');
  };

  return (
    <main id="main-content" className="bg-[#F8F8F8] py-10 md:py-16">
      <div className="section-container max-w-2xl">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          List with Homzen
        </p>
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
          Submit Your Property
        </h1>
        <p className="mt-2 max-w-lg font-poppins text-sm leading-relaxed text-hz-muted">
          Fill in the details below. This is a frontend preview — your listing will be published once
          the backend is connected.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-hz border border-hz-border bg-white p-6 shadow-sm md:p-8"
        >
          <FormField id="submit-title" label="Property title" value={title} onChange={setTitle} required />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="submit-type" className="font-poppins text-sm font-medium text-hz-dark">
                Property type
              </label>
              <select
                id="submit-type"
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className={cn(
                  'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
                  'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60'
                )}
              >
                {PROPERTY_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="submit-status" className="font-poppins text-sm font-medium text-hz-dark">
                Listing status
              </label>
              <select
                id="submit-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className={cn(
                  'h-11 w-full rounded-hz border border-hz-border bg-white px-3',
                  'font-poppins text-sm text-hz-dark outline-none focus:border-hz-primary/60'
                )}
              >
                {PROPERTY_STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormField id="submit-location" label="Location" value={location} onChange={setLocation} required />
          <FormField
            id="submit-price"
            label="Price (USD)"
            type="number"
            value={price}
            onChange={setPrice}
            required
          />

          <button
            type="submit"
            className={cn(
              'w-full rounded-hz bg-hz-primary px-6 py-3',
              'font-poppins text-sm font-semibold text-white',
              'transition-colors duration-200 hover:bg-hz-primary-hover'
            )}
          >
            Submit Listing (Preview)
          </button>

          {notice && <MockSubmitNotice message={notice} />}
        </form>

        <p className="mt-6 text-center font-poppins text-sm text-hz-muted">
          <Link to={routes.home} className="text-hz-primary no-underline hover:underline">
            Return to home
          </Link>
        </p>
      </div>
    </main>
  );
}
