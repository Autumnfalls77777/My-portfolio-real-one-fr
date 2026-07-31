import type { Response } from 'express';
import { env, isProduction } from '../config/env.js';

const baseCookie = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' as const : 'lax' as const,
  domain: env.COOKIE_DOMAIN || undefined
};

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string, adminAccessToken?: string) {
  res.cookie('access_token', accessToken, {
    ...baseCookie,
    maxAge: 15 * 60 * 1000
  });
  res.cookie('refresh_token', refreshToken, {
    ...baseCookie,
    path: '/api/v1/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  if (adminAccessToken) {
    res.cookie('admin_access_token', adminAccessToken, {
      ...baseCookie,
      maxAge: 24 * 60 * 60 * 1000
    });
  }
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('access_token', baseCookie);
  res.clearCookie('admin_access_token', baseCookie);
  res.clearCookie('refresh_token', { ...baseCookie, path: '/api/v1/auth' });
}
