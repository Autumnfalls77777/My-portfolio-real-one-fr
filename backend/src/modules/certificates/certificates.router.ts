import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { createCrudController } from '../../lib/crudFactory.js';

const certificateSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(1),
  issuer: z.string().trim().optional().nullable(),
  issuedAt: z.coerce.date().optional().nullable(),
  displayDate: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  credentialUrl: z.string().url().optional().nullable(),
  mediaId: z.string().uuid().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  order: z.number().int().default(0)
});

const controller = createCrudController({
  modelName: 'certificate',
  entityType: 'Certificate',
  delegate: prisma.certificate,
  createSchema: certificateSchema,
  updateSchema: certificateSchema.partial(),
  allowedSorts: ['order', 'createdAt', 'issuedAt', 'title'],
  searchFields: ['title', 'category', 'issuer', 'description'],
  defaultInclude: { media: true }
});

export const certificatesRouter = Router();
certificatesRouter.get('/', controller.listPublic);
certificatesRouter.get('/:slug', controller.getPublic);

export const adminCertificatesRouter = Router();
adminCertificatesRouter.use(requireAdmin, adminLimiter);
adminCertificatesRouter.get('/', controller.listAdmin);
adminCertificatesRouter.post('/', controller.create);
adminCertificatesRouter.patch('/:id', controller.update);
adminCertificatesRouter.delete('/:id', controller.softDelete);
adminCertificatesRouter.post('/:id/publish', controller.publish);
adminCertificatesRouter.post('/:id/archive', controller.archive);
adminCertificatesRouter.post('/:id/restore', controller.restore);
