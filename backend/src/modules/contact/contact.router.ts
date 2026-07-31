import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter, contactLimiter } from '../../middleware/rateLimiter.js';
import { validateBody } from '../../middleware/validate.js';
import { audit } from '../../lib/audit.js';
import { ok } from '../../lib/response.js';
import { listQuerySchema, pageMeta, pagination } from '../../lib/queryBuilder.js';
import { createContactMessage } from './contact.service.js';
import { contactCreateSchema, contactUpdateSchema } from './contact.schema.js';

export const contactRouter = Router();

contactRouter.post('/', contactLimiter, validateBody(contactCreateSchema), asyncHandler(async (req, res) => {
  if (req.body.website) {
    ok(res, { received: true });
    return;
  }
  const message = await createContactMessage(req.body, { ip: req.ip, userAgent: req.get('user-agent') });
  ok(res, { id: message.id, received: true }, undefined, 201);
}));

export const adminContactRouter = Router();

adminContactRouter.use(requireAdmin, adminLimiter);
adminContactRouter.get('/', asyncHandler(async (req, res) => {
  const query = listQuerySchema.parse(req.query);
  const where = query.search
    ? { OR: [{ name: { contains: query.search, mode: 'insensitive' as const } }, { email: { contains: query.search, mode: 'insensitive' as const } }, { message: { contains: query.search, mode: 'insensitive' as const } }] }
    : {};
  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, ...pagination(query), orderBy: { createdAt: 'desc' } }),
    prisma.contactMessage.count({ where })
  ]);
  ok(res, items, pageMeta(total, query));
}));
adminContactRouter.patch('/:id', validateBody(contactUpdateSchema), asyncHandler(async (req, res) => {
  const id = String(req.params.id);
  const before = await prisma.contactMessage.findUniqueOrThrow({ where: { id } });
  const item = await prisma.contactMessage.update({ where: { id }, data: req.body });
  await audit(req, 'contactMessage.updated', 'ContactMessage', id, before, item);
  ok(res, item);
}));
