import type { NextFunction, Request, Response } from 'express';
import { env, isProduction } from '../config/env.js';
import { ApiError } from '../lib/apiError.js';
import { randomToken, sha256 } from '../lib/crypto.js';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function issueCsrfToken(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies?.csrf_token) {
    const token = randomToken(24);
    res.cookie('csrf_token', token, {
      httpOnly: false,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      domain: env.COOKIE_DOMAIN || undefined,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    req.csrfToken = token;
  } else {
    req.csrfToken = req.cookies.csrf_token;
  }
  next();
}

export function requireCsrf(req: Request, _res: Response, next: NextFunction) {
  if (SAFE_METHODS.has(req.method)) {
    next();
    return;
  }

  const cookieToken = req.cookies?.csrf_token;
  const headerToken = req.get('X-CSRF-Token');
  if (!cookieToken || !headerToken || sha256(cookieToken) !== sha256(headerToken)) {
    next(new ApiError(403, 'CSRF_TOKEN_INVALID', 'Invalid CSRF token'));
    return;
  }

  next();
}
