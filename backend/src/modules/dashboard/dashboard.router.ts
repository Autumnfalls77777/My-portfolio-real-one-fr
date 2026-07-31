import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { ok } from '../../lib/response.js';

let cache: { expiresAt: number; data: unknown } | null = null;

export const dashboardRouter = Router();

dashboardRouter.use(requireAdmin, adminLimiter);
dashboardRouter.get('/stats', asyncHandler(async (_req, res) => {
  if (cache && cache.expiresAt > Date.now()) {
    ok(res, cache.data, { cached: true });
    return;
  }

  const [
    softwareProjects,
    designProjects,
    contactMessages,
    unreadMessages,
    certificates,
    totalSoftwareViews,
    totalDesignViews
  ] = await Promise.all([
    prisma.softwareProject.count({ where: { deletedAt: null } }),
    prisma.designProject.count({ where: { deletedAt: null } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false, isArchived: false } }),
    prisma.certificate.count({ where: { deletedAt: null } }),
    prisma.softwareProject.aggregate({ _sum: { viewCount: true } }),
    prisma.designProject.aggregate({ _sum: { viewCount: true } })
  ]);

  const data = {
    softwareProjects,
    designProjects,
    contactMessages,
    unreadMessages,
    certificates,
    totalViews: (totalSoftwareViews._sum.viewCount ?? 0) + (totalDesignViews._sum.viewCount ?? 0)
  };
  cache = { expiresAt: Date.now() + 5 * 60 * 1000, data };
  ok(res, data, { cached: false });
}));

dashboardRouter.get('/audit-logs', asyncHandler(async (_req, res) => {
  const logs = await prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100, include: { user: { select: { id: true, email: true, name: true } } } });
  ok(res, logs);
}));
