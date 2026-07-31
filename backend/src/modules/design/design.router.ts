import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { ok } from '../../lib/response.js';
import { createCrudController } from '../../lib/crudFactory.js';
import { designProjectSchema, updateDesignProjectSchema } from './design.schema.js';

const controller = createCrudController({
  modelName: 'designProject',
  entityType: 'DesignProject',
  delegate: prisma.designProject,
  createSchema: designProjectSchema,
  updateSchema: updateDesignProjectSchema,
  allowedSorts: ['createdAt', 'updatedAt', 'publishedAt', 'title', 'order', 'viewCount'],
  searchFields: ['title', 'description', 'shortDescription', 'category', 'client'],
  defaultInclude: {
    thumbnail: true,
    ogImage: true,
    media: { include: { media: true }, orderBy: { order: 'asc' } }
  }
});

export const designRouter = Router();

designRouter.get('/', controller.listPublic);
designRouter.get('/:slug', controller.getPublic);
designRouter.post('/:slug/view', asyncHandler(async (req, res) => {
  const slug = String(req.params.slug);
  const project = await prisma.designProject.update({
    where: { slug },
    data: { viewCount: { increment: 1 } },
    select: { slug: true, viewCount: true }
  });
  ok(res, project);
}));

export const adminDesignRouter = Router();

adminDesignRouter.use(requireAdmin, adminLimiter);
adminDesignRouter.get('/', controller.listAdmin);
adminDesignRouter.post('/', controller.create);
adminDesignRouter.get('/:id', controller.getAdmin);
adminDesignRouter.patch('/:id', controller.update);
adminDesignRouter.delete('/:id', controller.softDelete);
adminDesignRouter.post('/:id/publish', controller.publish);
adminDesignRouter.post('/:id/archive', controller.archive);
adminDesignRouter.post('/:id/restore', controller.restore);
