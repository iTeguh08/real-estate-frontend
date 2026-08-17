import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  AuthFooterLink,
  AuthFormShell,
  AuthSubmitButton,
  FormField,
  MockSubmitNotice,
} from '@/components/auth/AuthFormShell';
import { useAuth } from '@/hooks/useAuth';
import { AppLink } from '@/lib/app-link';
import { useAppNavigate, useAppSearchParams } from '@/lib/app-router';
import { applyApiFieldErrors } from '@/lib/apply-api-field-errors';
import { apiErrorMessage } from '@/lib/form-errors';
import {
  liveFormOptions,
  loginSchema,
  type LoginFormValues,
} from '@/lib/form-schemas';
import { routes } from '@/lib/routes';

function postLoginPath(from: unknown): string {
  if (typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')) {
    return from;
  }
  return routes.dashboard;
}

export function LoginPage() {
  const navigate = useAppNavigate();
  const [searchParams] = useAppSearchParams();
  const { login, isAuthenticated } = useAuth();
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');
  const redirectTo = postLoginPath(searchParams.get('from'));

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    ...liveFormOptions,
    defaultValues: { email: '', password: '' },
  });

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
        <AppLink
          href={routes.dashboard}
          className="inline-flex w-full items-center justify-center rounded-hz bg-hz-primary px-6 py-3 font-poppins text-sm font-semibold text-white no-underline hover:bg-hz-primary-hover"
        >
          Go to dashboard
        </AppLink>
      </AuthFormShell>
    );
  }

  const onSubmit = handleSubmit(async (values) => {
    setFormError('');
    setNotice('');
    try {
      const message = await login(values.email, values.password);
      setNotice(message);
      navigate(redirectTo);
    } catch (err) {
      applyApiFieldErrors(err, setError);
      setFormError(apiErrorMessage(err, 'Couldn’t sign in. Please try again.'));
    }
  });

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
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormField
              id="login-email"
              label="Email"
              type="email"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              autoComplete="email"
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormField
              id="login-password"
              label="Password"
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              autoComplete="current-password"
              error={errors.password?.message}
            />
          )}
        />
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </AuthSubmitButton>
        {notice && <MockSubmitNotice message={notice} />}
        {formError && !errors.email && !errors.password && (
          <p className="font-poppins text-sm text-hz-primary" role="alert">
            {formError}
          </p>
        )}
      </form>
    </AuthFormShell>
  );
}
