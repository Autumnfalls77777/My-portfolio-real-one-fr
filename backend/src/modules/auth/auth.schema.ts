import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
  adminAccessCode: z.string().min(8)
});

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8)
});
