import { z } from 'zod';

export const uploadSignatureSchema = z.object({
  folder: z.enum(['portfolio/software', 'portfolio/designs', 'portfolio/reels', 'portfolio/gallery', 'portfolio/certificates', 'portfolio/resumes', 'portfolio/offer-letters', 'portfolio/showcase', 'portfolio/achievements', 'portfolio/og-images', 'portfolio/avatars']),
  resourceType: z.enum(['image', 'video', 'raw', 'auto']).default('auto')
});

export const mediaCreateSchema = z.object({
  cloudinaryId: z.string().trim().min(1),
  url: z.string().url(),
  secureUrl: z.string().url(),
  resourceType: z.enum(['IMAGE', 'VIDEO', 'RAW', 'AUTO']).default('IMAGE'),
  format: z.string().trim().optional().nullable(),
  mimeType: z.string().trim().optional().nullable(),
  width: z.number().int().positive().optional().nullable(),
  height: z.number().int().positive().optional().nullable(),
  bytes: z.coerce.bigint().optional().nullable(),
  duration: z.number().positive().optional().nullable(),
  altText: z.string().trim().max(250).optional().nullable(),
  caption: z.string().trim().max(500).optional().nullable(),
  folder: z.string().trim().min(1)
});
