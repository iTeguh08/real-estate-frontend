import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'Full name is required.').max(255),
    email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    password_confirmation: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
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
  name: z.string().trim().min(1, 'Full name is required.').max(255),
  email: z.string().trim().min(1, 'Email is required.').email('Enter a valid email.'),
  phone: z.string().trim().max(50),
  inquiry_type: z.enum(CONTACT_INQUIRY_TYPES, {
    message: 'Select an inquiry type.',
  }),
  message: z.string().trim().min(1, 'Message is required.').max(5000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
