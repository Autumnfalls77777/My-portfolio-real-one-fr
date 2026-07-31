import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { createCrudController } from '../../lib/crudFactory.js';

const statusOrder = {
  status: z.string().default('PUBLISHED'),
  order: z.number().int().default(0)
};

const achievement = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional().nullable(),
  type: z.string().trim().optional().nullable(),
  year: z.string().trim().optional().nullable(),
  ...statusOrder
});

const showcase = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  description: z.string().trim().optional().nullable(),
  linkUrl: z.string().url().optional().nullable(),
  mediaId: z.string().optional().nullable(),
  ...statusOrder
});

const testimonial = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  role: z.string().trim().optional().nullable(),
  company: z.string().trim().optional().nullable(),
  quote: z.string().trim().min(1),
  avatarUrl: z.string().url().optional().nullable(),
  ...statusOrder
});

const language = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  level: z.string().trim().optional().nullable(),
  icon: z.string().trim().optional().nullable(),
  category: z.string().trim().optional().nullable(),
  ...statusOrder
});

const techTool = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(1),
  icon: z.string().trim().optional().nullable(),
  color: z.string().trim().optional().nullable(),
  ...statusOrder
});

const brandCard = z.object({
  name: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  collectionId: z.string().trim().default('01'),
  year: z.string().trim().optional().nullable(),
  worksCount: z.number().int().default(0),
  brandType: z.string().trim().optional().nullable(),
  role: z.string().trim().optional().nullable(),
  overview: z.string().trim().optional().nullable(),
  isHot: z.boolean().default(false),
  ...statusOrder
});

const brandWork = z.object({
  brandSlug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().optional().nullable(),
  category: z.string().trim().optional().nullable(),
  year: z.string().trim().optional().nullable(),
  imageUrl: z.string().trim().optional().nullable(),
  ...statusOrder
});

const designCollection = z.object({
  code: z.string().trim().min(1),
  label: z.string().trim().min(1),
  ...statusOrder
});

function makeRouters(name: string, entityType: string, delegate: never, schema: any, searchFields: string[], include?: Record<string, unknown>) {
  const controller = createCrudController({
    modelName: name,
    entityType,
    delegate,
    createSchema: schema,
    updateSchema: schema.partial(),
    allowedSorts: ['order', 'createdAt', 'title', 'name', 'code', 'label'],
    searchFields,
    defaultInclude: include
  });

  const publicRouter = Router();
  publicRouter.get('/', controller.listPublic);
  publicRouter.get('/:slug', controller.getPublic);

  const adminRouter = Router();
  adminRouter.use(requireAdmin, adminLimiter);
  adminRouter.get('/', controller.listAdmin);
  adminRouter.post('/', controller.create);
  adminRouter.patch('/:id', controller.update);
  adminRouter.delete('/:id', controller.softDelete);
  adminRouter.post('/:id/publish', controller.publish);
  adminRouter.post('/:id/archive', controller.archive);
  adminRouter.post('/:id/restore', controller.restore);

  return { publicRouter, adminRouter };
}

export const achievements = makeRouters('achievement', 'Achievement', prisma.achievement as never, achievement, ['title', 'description', 'type']);
export const showcaseItems = makeRouters('showcaseItem', 'ShowcaseItem', prisma.showcaseItem as never, showcase, ['title', 'description'], { media: true });
export const testimonials = makeRouters('testimonial', 'Testimonial', prisma.testimonial as never, testimonial, ['name', 'role', 'company', 'quote']);
export const languages = makeRouters('language', 'Language', prisma.language as never, language, ['name', 'level', 'category']);
export const techTools = makeRouters('techTool', 'TechTool', prisma.techTool as never, techTool, ['name', 'category']);
export const brandCards = makeRouters('brandCard', 'BrandCard', prisma.brandCard as never, brandCard, ['name', 'slug', 'overview']);
export const brandWorks = makeRouters('brandWork', 'BrandWork', prisma.brandWork as never, brandWork, ['title', 'brandSlug', 'description']);
export const designCollections = makeRouters('designCollection', 'DesignCollection', prisma.designCollection as never, designCollection, ['code', 'label']);
