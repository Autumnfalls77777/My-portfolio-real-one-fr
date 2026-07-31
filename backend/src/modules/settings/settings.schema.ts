import { z } from 'zod';

export const siteSettingsSchema = z.object({
  heroImageUrl: z.string().url().optional().nullable(),
  heroAltText: z.string().trim().max(250).optional().nullable()
});
