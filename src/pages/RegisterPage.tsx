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

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <AuthFormShell
      eyebrow="Account"
      title="Create your account"
      description="Join Homzen to save favorites, compare listings, and get updates on new properties."
      footer={
        <>
          Already have an account? <AuthFooterLink to={routes.login}>Sign in</AuthFooterLink>
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
          id="register-name"
          label="Full name"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
        />
        <FormField
          id="register-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoComplete="email"
        />
        <FormField
          id="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="new-password"
        />
        <AuthSubmitButton>Create Account</AuthSubmitButton>
        {notice && <MockSubmitNotice message={notice} />}
      </form>
    </AuthFormShell>
  );
}
