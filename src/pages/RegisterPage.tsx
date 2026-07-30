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

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  if (isAuthenticated) {
    return (
      <AuthFormShell
        eyebrow="Account"
        title="You’re already signed in"
        description="Head to your dashboard to continue."
        footer={
          <>
            <AuthFooterLink to={routes.login}>Back to sign-in</AuthFooterLink>
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
      const message = await register(name, email, password, passwordConfirm);
      setNotice(message);
      navigate(routes.dashboard);
    } catch (err) {
      setFieldErrors(getApiFieldErrors(err));
      setError(apiErrorMessage(err, 'Registration failed. Please try again.'));
    } finally {
      setPending(false);
    }
  };

  return (
    <AuthFormShell
      eyebrow="Account"
      title="Create your account"
      description="Join Homzen to save favorites, compare listings, and track your activity."
      footer={
        <>
          Already have an account? <AuthFooterLink to={routes.login}>Sign in</AuthFooterLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="register-name"
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
          id="register-email"
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
          id="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setFieldErrors((prev) => clearFieldError(prev, 'password'));
          }}
          autoComplete="new-password"
          error={fieldErrors.password?.[0]}
        />
        <FormField
          id="register-password-confirm"
          label="Confirm password"
          type="password"
          value={passwordConfirm}
          onChange={(value) => {
            setPasswordConfirm(value);
            setFieldErrors((prev) => clearFieldError(prev, 'password_confirmation'));
          }}
          autoComplete="new-password"
          error={fieldErrors.password_confirmation?.[0]}
        />
        <AuthSubmitButton disabled={pending}>
          {pending ? 'Creating…' : 'Create Account'}
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
