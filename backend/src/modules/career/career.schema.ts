import { z } from 'zod';

export const careerSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  company: z.string().trim().min(1),
  companyLogoUrl: z.string().url().optional().nullable(),
  employmentType: z.enum(['INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'FREELANCE', 'CONTRACT']),
  isInternship: z.boolean().default(false),
  duration: z.string().trim().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().trim().optional().nullable(),
  description: z.string().trim().min(1),
  learnings: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  recommended: z.boolean().default(false),
  recommendationText: z.string().optional().nullable(),
  recommendationAuthor: z.string().optional().nullable(),
  recommendationRole: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  order: z.number().int().default(0)
});

export const updateCareerSchema = careerSchema.partial();
