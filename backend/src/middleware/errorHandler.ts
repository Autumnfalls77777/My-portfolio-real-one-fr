import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { ApiError } from '../lib/apiError.js';
import { logger } from '../config/logger.js';
import { env, isProduction } from '../config/env.js';

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, 'NOT_FOUND', `Route ${req.method} ${req.path} not found`));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const error = normalizeError(err);
  
  if (error.statusCode >= 500) {
    logger.error({ err, req: { method: req.method, url: req.originalUrl } }, error.message);
  } else {
    logger.warn({ req: { method: req.method, url: req.originalUrl }, statusCode: error.statusCode, code: error.code }, error.message);
  }

  res.status(error.statusCode).json({
    success: false,
    error: {
      code: error.code,
      message: isProduction && error.statusCode >= 500 ? 'An unexpected error occurred' : error.message,
      ...(error.details && !isProduction ? { details: error.details } : {})
    }
  });
}

function normalizeError(err: unknown) {
  if (err instanceof ApiError) return err;
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') return new ApiError(409, 'CONFLICT', 'A record with this unique value already exists');
    if (err.code === 'P2025') return new ApiError(404, 'NOT_FOUND', 'Record not found');
  }
  if (err instanceof ZodError) {
    return new ApiError(400, 'VALIDATION_ERROR', 'Invalid request body', err.flatten());
  }
  if (env.NODE_ENV === 'development' && err instanceof Error) {
    return new ApiError(500, 'INTERNAL_ERROR', err.message);
  }
  return new ApiError(500, 'INTERNAL_ERROR', 'Internal server error');
}
