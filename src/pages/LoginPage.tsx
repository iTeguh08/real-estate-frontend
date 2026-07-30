import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthFooterLink,
  AuthFormShell,
  AuthSubmitButton,
  FormField,
  MockSubmitNotice,
} from '@/components/auth/AuthFormShell';
import { useAuth } from '@/hooks/useAuth';
import { apiErrorMessage, clearFieldError, getApiFieldErrors } from '@/lib/form-errors';
import { routes } from '@/lib/routes';
import type { FieldErrors } from '@/services/api-client';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  if (isAuthenticated) {
    return (
      <AuthFormShell
        eyebrow="Account"
        title="You’re signed in"
        description="Continue to your dashboard or browse listings."
        footer={
          <>
            Looking for a different account?{' '}
            <AuthFooterLink to={routes.register}>Create one</AuthFooterLink>
          </>
        }
      >
        <Link
          to={routes.dashboard}
          className="inline-flex w-full items-center justify-center rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
        >
          Go to dashboard
        </Link>
      </AuthFormShell>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setNotice('');
    setPending(true);
    try {
      const message = await login(email, password);
      setNotice(message);
      navigate(routes.dashboard);
    } catch (err) {
      setFieldErrors(getApiFieldErrors(err));
      setError(apiErrorMessage(err, 'Sign-in failed. Please try again.'));
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthFormShell
      eyebrow="Account"
      title="Welcome back"
      description="Sign in to manage your Homzen member profile, wishlist, and saved searches."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <AuthFooterLink to={routes.register}>Create one</AuthFooterLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            setFieldErrors((prev) => clearFieldError(prev, 'email'));
          }}
          autoComplete="email"
          error={fieldErrors.email?.[0]}
        />
        <FormField
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setFieldErrors((prev) => clearFieldError(prev, 'password'));
          }}
          autoComplete="current-password"
          error={fieldErrors.password?.[0]}
        />
        <AuthSubmitButton disabled={pending}>
          {pending ? 'Signing in…' : 'Sign In'}
        </AuthSubmitButton>
        {notice && <MockSubmitNotice message={notice} />}
        {error && Object.keys(fieldErrors).length === 0 && (
          <p className="font-poppins text-sm text-hz-primary" role="alert">
            {error}
          </p>
        )}
      </form>
    </AuthFormShell>
  );
}
