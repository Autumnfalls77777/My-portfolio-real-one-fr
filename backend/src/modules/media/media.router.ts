import { Router } from 'express';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { prisma } from '../../config/database.js';
import { cloudinary } from '../../config/cloudinary.js';
import { requireAdmin } from '../../middleware/auth.js';
import { adminLimiter } from '../../middleware/rateLimiter.js';
import { validateBody } from '../../middleware/validate.js';
import { created, ok } from '../../lib/response.js';
import { ApiError } from '../../lib/apiError.js';
import { mediaCreateSchema, uploadSignatureSchema } from './media.schema.js';

export const mediaRouter = Router();

mediaRouter.use(requireAdmin, adminLimiter);
mediaRouter.post('/signature', validateBody(uploadSignatureSchema), (req, res) => {
  const config = cloudinary.config();
  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    throw new ApiError(503, 'MEDIA_NOT_CONFIGURED', 'Image uploads are not configured on the server');
  }
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: req.body.folder },
    config.api_secret
  );
  ok(res, {
    timestamp,
    signature,
    folder: req.body.folder,
    cloudName: config.cloud_name,
    apiKey: config.api_key,
    resourceType: req.body.resourceType
  });
});
mediaRouter.post('/', validateBody(mediaCreateSchema), asyncHandler(async (req, res) => {
  const media = await prisma.media.create({ data: { ...req.body, uploadedById: req.user?.id } });
  created(res, media);
}));
mediaRouter.get('/', asyncHandler(async (_req, res) => {
  const media = await prisma.media.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  ok(res, media);
}));
