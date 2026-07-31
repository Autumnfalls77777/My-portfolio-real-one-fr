import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { ApiError } from '../lib/apiError.js';

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      next(new ApiError(400, 'VALIDATION_ERROR', 'Invalid request body', parsed.error.flatten()));
      return;
    }
    req.body = parsed.data;
    next();
  };
}

export function validateQuery(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      next(new ApiError(400, 'VALIDATION_ERROR', 'Invalid query string', parsed.error.flatten()));
      return;
    }
    req.query = parsed.data;
    next();
  };
}
