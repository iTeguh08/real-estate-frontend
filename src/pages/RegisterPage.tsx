import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { applyApiFieldErrors } from '@/lib/apply-api-field-errors';
import { apiErrorMessage } from '@/lib/form-errors';
import { registerSchema, type RegisterFormValues } from '@/lib/form-schemas';
import { routes } from '@/lib/routes';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerMember, isAuthenticated } = useAuth();
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

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

  const onSubmit = handleSubmit(async (values) => {
    setFormError('');
    setNotice('');
    try {
      const message = await registerMember(
        values.name,
        values.email,
        values.password,
        values.password_confirmation,
      );
      setNotice(message);
      navigate(routes.dashboard);
    } catch (err) {
      applyApiFieldErrors(err, setError);
      setFormError(apiErrorMessage(err, 'Registration failed. Please try again.'));
    }
  });

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
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              id="register-name"
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
              id="register-email"
              label="Email"
              type="email"
              value={field.value}
              onChange={field.onChange}
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
              id="register-password"
              label="Password"
              type="password"
              value={field.value}
              onChange={field.onChange}
              autoComplete="new-password"
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <FormField
              id="register-password-confirm"
              label="Confirm password"
              type="password"
              value={field.value}
              onChange={field.onChange}
              autoComplete="new-password"
              error={errors.password_confirmation?.message}
            />
          )}
        />
        <AuthSubmitButton disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Create Account'}
        </AuthSubmitButton>
        {notice && <MockSubmitNotice message={notice} />}
        {formError &&
          !errors.name &&
          !errors.email &&
          !errors.password &&
          !errors.password_confirmation && (
            <p className="font-poppins text-sm text-hz-primary" role="alert">
              {formError}
            </p>
          )}
      </form>
    </AuthFormShell>
  );
}
