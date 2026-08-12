import { describe, expect, it } from 'vitest';
import {
  contactSchema,
  loginSchema,
  newsletterSchema,
  registerSchema,
} from '@/lib/form-schemas';

describe('form-schemas', () => {
  it('rejects empty login fields', () => {
    const result = loginSchema.safeParse({ email: '', password: '' });
    expect(result.success).toBe(false);
  });

  it('accepts a valid login payload', () => {
    expect(
      loginSchema.safeParse({ email: 'a@b.com', password: 'secret' }).success,
    ).toBe(true);
  });

  it('requires matching register passwords', () => {
    const mismatch = registerSchema.safeParse({
      name: 'Ayu',
      email: 'ayu@test.com',
      password: 'password1',
      password_confirmation: 'password2',
    });
    expect(mismatch.success).toBe(false);

    const ok = registerSchema.safeParse({
      name: 'Ayu',
      email: 'ayu@test.com',
      password: 'password1',
      password_confirmation: 'password1',
    });
    expect(ok.success).toBe(true);
  });

  it('validates contact inquiry types', () => {
    expect(
      contactSchema.safeParse({
        name: 'Jane',
        email: 'jane@test.com',
        phone: '',
        inquiry_type: 'Buy a Property',
        message: 'Hello',
      }).success,
    ).toBe(true);

    expect(
      contactSchema.safeParse({
        name: 'Jane',
        email: 'jane@test.com',
        phone: '',
        inquiry_type: 'Not Real',
        message: 'Hello',
      }).success,
    ).toBe(false);
  });

  it('validates newsletter email', () => {
    expect(newsletterSchema.safeParse({ email: 'sub@test.com' }).success).toBe(true);
    expect(newsletterSchema.safeParse({ email: '' }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: 'not-an-email' }).success).toBe(false);
  });
});
