import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';

export function NotFoundPage() {
  return (
    <main id="main-content" className="section-container py-24 text-center">
      <h1 className="font-poppins text-6xl font-bold text-hz-dark">404</h1>
      <p className="mt-4 font-poppins text-lg text-hz-muted">Page not found</p>
      <Link
        to={routes.home}
        className="mt-8 inline-block rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline transition-colors hover:bg-hz-primary-hover"
      >
        Go Home
      </Link>
    </main>
  );
}
