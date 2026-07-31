import { Router } from 'express';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { createCrudController } from '../../lib/crudFactory.js';
import { careerSchema, updateCareerSchema } from './career.schema.js';

const controller = createCrudController({
  modelName: 'careerExperience',
  entityType: 'CareerExperience',
  delegate: prisma.careerExperience,
  createSchema: careerSchema,
  updateSchema: updateCareerSchema,
  allowedSorts: ['order', 'createdAt', 'startDate', 'title'],
  searchFields: ['title', 'company', 'description', 'location']
});

export const careerRouter = Router();
careerRouter.get('/', controller.listPublic);
careerRouter.get('/:slug', controller.getPublic);

export const adminCareerRouter = Router();
adminCareerRouter.use(requireAdmin, adminLimiter);
adminCareerRouter.get('/', controller.listAdmin);
adminCareerRouter.post('/', controller.create);
adminCareerRouter.patch('/:id', controller.update);
adminCareerRouter.delete('/:id', controller.softDelete);
adminCareerRouter.post('/:id/publish', controller.publish);
adminCareerRouter.post('/:id/archive', controller.archive);
adminCareerRouter.post('/:id/restore', controller.restore);
