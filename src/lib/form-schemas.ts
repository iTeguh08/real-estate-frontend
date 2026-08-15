import { z } from 'zod';

/** Align with Laravel Password::defaults() base (min 10, mixed case, numbers). */
const passwordRule = z
  .string()
  .min(1, 'Please choose a password.')
  .min(10, 'Use at least 10 characters.')
  .regex(/[a-z]/, 'Include a lowercase letter.')
  .regex(/[A-Z]/, 'Include an uppercase letter.')
  .regex(/[0-9]/, 'Include at least one number.');

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('That doesn’t look like a valid email.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Please enter your full name.')
      .max(255, 'Name is too long.'),
    email: z
      .string()
      .trim()
      .min(1, 'Please enter your email.')
      .email('That doesn’t look like a valid email.')
      .max(255, 'Email is too long.'),
    password: passwordRule,
    password_confirmation: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords don’t match.',
    path: ['password_confirmation'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const CONTACT_INQUIRY_TYPES = [
  'General Inquiry',
  'Buy a Property',
  'Sell a Property',
  'Rent a Property',
  'Schedule a Viewing',
  'Partnership',
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(255, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('That doesn’t look like a valid email.')
    .max(255, 'Email is too long.'),
  phone: z.string().trim().max(50, 'Phone number is too long.'),
  inquiry_type: z.enum(CONTACT_INQUIRY_TYPES, {
    message: 'Please choose an inquiry type.',
  }),
  message: z
    .string()
    .trim()
    .min(1, 'Please write a short message.')
    .max(5000, 'Message is too long (max 5,000 characters).'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/** Property inquiry modal — message may be composed from schedule fields. */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(255, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('That doesn’t look like a valid email.')
    .max(255, 'Email is too long.'),
  phone: z.string().trim().max(50, 'Phone number is too long.'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(5000, 'Message is too long (max 5,000 characters).'),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .email('That doesn’t look like a valid email.')
    .max(255, 'Email is too long.'),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

/** Shared RHF options: show errors after blur/submit, recheck while editing. */
export const liveFormOptions = {
  mode: 'onTouched' as const,
  reValidateMode: 'onChange' as const,
};
