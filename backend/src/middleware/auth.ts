import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../lib/apiError.js';
import { verifyToken } from '../lib/tokens.js';

type UserRole = 'ADMIN' | 'USER';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = req.cookies?.access_token || bearerToken;

  if (!token) {
    next(new ApiError(401, 'UNAUTHENTICATED', 'Authentication required'));
    return;
  }

  try {
    const payload = verifyToken(token, 'user');
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as UserRole,
      scope: 'user'
    };
    next();
  } catch {
    next(new ApiError(401, 'INVALID_TOKEN', 'Invalid or expired access token'));
  }
}

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const headerToken = (req.headers['x-admin-token'] as string) || bearerToken;
  const token = req.cookies?.admin_access_token || req.cookies?.access_token || headerToken;

  if (!token) {
    next(new ApiError(401, 'ADMIN_AUTH_REQUIRED', 'Admin authentication required. Please sign in to the Admin Panel.'));
    return;
  }

  try {
    const payload = verifyToken(token, 'admin');
    if (payload.role !== 'ADMIN' || payload.scope !== 'admin') {
      throw new Error('Invalid admin scope');
    }
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: 'ADMIN',
      scope: 'admin'
    };
    next();
  } catch (err: any) {
    next(new ApiError(403, 'FORBIDDEN', `Admin session invalid or expired: ${err.message || 'Access denied'}`));
  }
}
