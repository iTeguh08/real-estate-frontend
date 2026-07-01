import { useState } from 'react';
import {
  AuthFooterLink,
  AuthFormShell,
  AuthSubmitButton,
  FormField,
  MockSubmitNotice,
  handleMockFormSubmit,
} from '@/components/auth/AuthFormShell';
import { routes } from '@/lib/routes';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <AuthFormShell
      eyebrow="Account"
      title="Welcome back"
      description="Sign in to manage saved listings, compare properties, and track inquiries."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <AuthFooterLink to={routes.register}>Create one</AuthFooterLink>
        </>
      }
    >
      <form
        onSubmit={(e) =>
          handleMockFormSubmit(e, (message) => {
            setNotice(message);
          })
        }
        className="space-y-4"
      >
        <FormField
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <FormField
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
        />
        <AuthSubmitButton>Sign In</AuthSubmitButton>
        {notice && <MockSubmitNotice message={notice} />}
      </form>
    </AuthFormShell>
  );
}
