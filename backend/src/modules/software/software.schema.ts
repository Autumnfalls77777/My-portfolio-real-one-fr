import { z } from 'zod';

export const softwareProjectSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(220).optional(),
  description: z.string().trim().min(1).max(5000),
  shortDescription: z.string().trim().max(500).optional().nullable(),
  category: z.string().trim().max(80).optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
  complexity: z.string().trim().max(80).optional().nullable(),
  githubUrl: z.string().url().optional().nullable(),
  liveDemoUrl: z.string().url().optional().nullable(),
  problemStatement: z.string().trim().max(5000).optional().nullable(),
  solution: z.string().trim().max(5000).optional().nullable(),
  features: z.array(z.string().trim()).default([]),
  challenges: z.array(z.string().trim()).default([]),
  futureImprovements: z.array(z.string().trim()).default([]),
  techStack: z.array(z.string().trim()).default([]),
  thumbnailUrl: z.string().url().optional().nullable(),
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

export const updateSoftwareProjectSchema = softwareProjectSchema.partial();
