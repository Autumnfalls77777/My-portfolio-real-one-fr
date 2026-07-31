import { z } from 'zod';

export const designProjectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(220).optional(),
  description: z.string().trim().min(1).max(5000),
  shortDescription: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().max(80).optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  client: z.string().trim().max(160).optional().nullable(),
  designProcess: z.array(z.string().trim()).default([]),
  softwareUsed: z.array(z.string().trim()).default([]),
  colorPalette: z.array(z.string().trim()).default([]),
  typographySpecs: z.string().trim().max(2000).optional().nullable(),
  learnings: z.array(z.string().trim()).default([]),
  tags: z.array(z.string().trim()).default([]),
  thumbnailUrl: z.string().url().optional().nullable(),
  caseStudyUrl: z.string().url().optional().nullable(),
  completionDate: z.coerce.date().optional().nullable(),
  displayDate: z.string().trim().max(80).optional().nullable(),
  order: z.number().int().default(0),
  seoTitle: z.string().trim().max(200).optional().nullable(),
  seoDescription: z.string().trim().max(300).optional().nullable(),
  seoKeywords: z.array(z.string().trim()).default([]),
  canonicalUrl: z.string().url().optional().nullable(),
  thumbnailId: z.string().uuid().optional().nullable(),
  ogImageId: z.string().uuid().optional().nullable()
});

export const updateDesignProjectSchema = designProjectSchema.partial();
