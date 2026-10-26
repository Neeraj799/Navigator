import { z } from "zod";

export const passwordSchema = z
  .string()
  .refine((value) => value.trim().length > 0, "Please enter your password.")
  .pipe(
    z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[0-9]/, "Include at least one number.")
      .regex(/[^A-Za-z0-9\s]/, "Include at least one special character."),
  );

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .pipe(z.email({ error: "Please enter a valid email address." })),

  password: passwordSchema,
});
