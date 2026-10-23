import { z } from 'zod';

// A schema describes the rules for both fields in one place.
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, 'Please enter your email.')
    .pipe(z.email({ error: 'Please enter a valid email address.' })),
  // Check for blank input without changing the user's password.
  password: z.string().refine((value) => value.trim().length > 0, {
    error: 'Please enter your password.',
  }),
});
