import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { validateBody } from '../../middleware/validate.js';
import { ok } from '../../lib/response.js';
import { siteSettingsSchema } from './settings.schema.js';

const SETTINGS_KEY = 'global';

async function getSettings() {
  return prisma.siteSettings.findUnique({ where: { key: SETTINGS_KEY } });
}

export const settingsRouter = Router();

settingsRouter.get('/', asyncHandler(async (_req, res) => {
  const settings = await getSettings();
  ok(res, settings ?? { key: SETTINGS_KEY, heroImageUrl: null, heroAltText: null });
}));

export const adminSettingsRouter = Router();

adminSettingsRouter.use(requireAdmin, adminLimiter);
adminSettingsRouter.get('/', asyncHandler(async (_req, res) => {
  const settings = await getSettings();
  ok(res, settings ?? { key: SETTINGS_KEY, heroImageUrl: null, heroAltText: null });
}));

adminSettingsRouter.patch('/', validateBody(siteSettingsSchema), asyncHandler(async (req, res) => {
  const settings = await prisma.siteSettings.upsert({
    where: { key: SETTINGS_KEY },
    create: { key: SETTINGS_KEY, ...req.body },
    update: req.body
  });
  ok(res, settings);
}));
