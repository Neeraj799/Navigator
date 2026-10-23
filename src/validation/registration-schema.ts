import { z } from 'zod';

import { loginSchema } from '@/validation/login-schema';

export const registrationSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your full name.'),
  email: loginSchema.shape.email,
  password: z.string().min(8, 'Use at least 8 characters.').refine((value) => value.trim().length > 0, {
    error: 'Please enter a password.',
  }),
  confirmPassword: z.string().min(1, 'Please confirm your password.'),
}).refine((values) => values.password === values.confirmPassword, {
  error: 'Passwords do not match.',
  path: ['confirmPassword'],
});
