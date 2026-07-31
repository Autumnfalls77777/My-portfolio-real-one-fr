import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { z } from 'zod';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { ok } from '../../lib/response.js';
import { createCrudController } from '../../lib/crudFactory.js';

const resumeSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  type: z.enum(['RESUME', 'CV']),
  version: z.string().trim().optional().nullable(),
  mediaId: z.string().uuid().optional().nullable(),
  isActive: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED')
});

const resumeController = createCrudController({
  modelName: 'resumeDocument',
  entityType: 'ResumeDocument',
  delegate: prisma.resumeDocument,
  createSchema: resumeSchema,
  updateSchema: resumeSchema.partial(),
  allowedSorts: ['createdAt', 'updatedAt', 'title', 'downloadCount'],
  searchFields: ['title', 'version'],
  defaultInclude: { media: true }
});

const offerSchema = z.object({
  company: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  role: z.string().trim().min(1),
  offeredAt: z.coerce.date().optional().nullable(),
  displayDate: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  mediaId: z.string().uuid().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('PUBLISHED'),
  order: z.number().int().default(0)
});

const offerController = createCrudController({
  modelName: 'offerLetter',
  entityType: 'OfferLetter',
  delegate: prisma.offerLetter,
  createSchema: offerSchema,
  updateSchema: offerSchema.partial(),
  allowedSorts: ['order', 'createdAt', 'offeredAt', 'company'],
  searchFields: ['company', 'role', 'description'],
  defaultInclude: { media: true }
});

export const resumesRouter = Router();
resumesRouter.get('/', resumeController.listPublic);
resumesRouter.get('/:slug', resumeController.getPublic);
resumesRouter.post('/:slug/download', asyncHandler(async (req, res) => {
  const slug = String(req.params.slug);
  const item = await prisma.resumeDocument.update({
    where: { slug },
    data: { downloadCount: { increment: 1 } },
    include: { media: true }
  });
  ok(res, item);
}));

export const offerLettersRouter = Router();
offerLettersRouter.get('/', offerController.listPublic);
offerLettersRouter.get('/:slug', offerController.getPublic);

export const adminResumesRouter = Router();
adminResumesRouter.use(requireAdmin, adminLimiter);
adminResumesRouter.get('/', resumeController.listAdmin);
adminResumesRouter.post('/', resumeController.create);
adminResumesRouter.patch('/:id', resumeController.update);
adminResumesRouter.delete('/:id', resumeController.softDelete);
adminResumesRouter.post('/:id/publish', resumeController.publish);
adminResumesRouter.post('/:id/archive', resumeController.archive);
adminResumesRouter.post('/:id/restore', resumeController.restore);

export const adminOfferLettersRouter = Router();
adminOfferLettersRouter.use(requireAdmin, adminLimiter);
adminOfferLettersRouter.get('/', offerController.listAdmin);
adminOfferLettersRouter.post('/', offerController.create);
adminOfferLettersRouter.patch('/:id', offerController.update);
adminOfferLettersRouter.delete('/:id', offerController.softDelete);
adminOfferLettersRouter.post('/:id/publish', offerController.publish);
adminOfferLettersRouter.post('/:id/archive', offerController.archive);
adminOfferLettersRouter.post('/:id/restore', offerController.restore);
