import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { ok } from '../../lib/response.js';
import { createCrudController } from '../../lib/crudFactory.js';
import { softwareProjectSchema, updateSoftwareProjectSchema } from './software.schema.js';

const controller = createCrudController({
  modelName: 'softwareProject',
  entityType: 'SoftwareProject',
  delegate: prisma.softwareProject,
  createSchema: softwareProjectSchema,
  updateSchema: updateSoftwareProjectSchema,
  allowedSorts: ['createdAt', 'updatedAt', 'publishedAt', 'title', 'order', 'viewCount'],
  searchFields: ['title', 'description', 'shortDescription', 'category'],
  defaultInclude: {
    thumbnail: true,
    ogImage: true,
    tags: { include: { tag: true } },
    media: { include: { media: true }, orderBy: { order: 'asc' } }
  }
});

export const softwareRouter = Router();

softwareRouter.get('/', controller.listPublic);
softwareRouter.get('/:slug', controller.getPublic);
softwareRouter.post('/:slug/view', asyncHandler(async (req, res) => {
  const slug = String(req.params.slug);
  const project = await prisma.softwareProject.update({
    where: { slug },
    data: { viewCount: { increment: 1 } },
    select: { slug: true, viewCount: true }
  });
  ok(res, project);
}));

export const adminSoftwareRouter = Router();

adminSoftwareRouter.use(requireAdmin, adminLimiter);
adminSoftwareRouter.get('/', controller.listAdmin);
adminSoftwareRouter.post('/', controller.create);
adminSoftwareRouter.get('/:id', controller.getAdmin);
adminSoftwareRouter.patch('/:id', controller.update);
adminSoftwareRouter.delete('/:id', controller.softDelete);
adminSoftwareRouter.post('/:id/publish', controller.publish);
adminSoftwareRouter.post('/:id/archive', controller.archive);
adminSoftwareRouter.post('/:id/restore', controller.restore);
