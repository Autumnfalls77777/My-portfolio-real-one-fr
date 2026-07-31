import { z } from 'zod';

export const contactCreateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().email().transform((v) => v.toLowerCase()),
  company: z.string().trim().max(160).optional().nullable(),
  reason: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().min(1).max(5000),
  website: z.string().max(0).optional()
});

export const contactUpdateSchema = z.object({
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isSpam: z.boolean().optional(),
  repliedAt: z.coerce.date().optional().nullable()
});
