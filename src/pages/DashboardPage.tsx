import { Link } from 'react-router-dom';
import { routes } from '@/lib/routes';

export function DashboardPage() {
  return (
    <main id="main-content" className="section-container py-20 text-center">
      <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
        Coming Soon
      </p>
      <h1 className="font-poppins text-3xl font-semibold text-hz-dark">Agent Dashboard</h1>
      <p className="mx-auto mt-4 max-w-md font-poppins text-sm leading-relaxed text-hz-muted">
        Login, listing management, and lead tracking will live here once the backend is connected.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to={routes.login}
          className="inline-block rounded-hz border border-hz-border px-6 py-2.5 font-poppins text-sm font-medium text-hz-dark no-underline transition-colors hover:border-hz-primary hover:text-hz-primary"
        >
          Sign In
        </Link>
        <Link
          to={routes.home}
          className="inline-block rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline transition-colors hover:bg-hz-primary-hover"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
