import type { Request, Response } from 'express';
import { clearAuthCookies, setAuthCookies } from '../../lib/cookies.js';
import { created, ok } from '../../lib/response.js';
import { loginUser, registerUser, revokeRefreshToken, rotateRefreshToken } from './auth.service.js';
import { asyncHandler } from '../../lib/asyncHandler.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  created(res, user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body.email, req.body.password, false, undefined, { ip: req.ip, userAgent: req.get('user-agent') });
  setAuthCookies(res, result.accessToken, result.refreshToken);
  ok(res, { user: result.user });
});

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUser(req.body.email, req.body.password, true, req.body.adminAccessCode, { ip: req.ip, userAgent: req.get('user-agent') });
  setAuthCookies(res, result.accessToken, result.refreshToken, result.adminAccessToken);
  ok(res, { user: result.user });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const result = await rotateRefreshToken(req.cookies?.refresh_token, { ip: req.ip, userAgent: req.get('user-agent') });
  setAuthCookies(res, result.accessToken, result.refreshToken, result.adminAccessToken);
  ok(res, { user: result.user });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await revokeRefreshToken(req.cookies?.refresh_token);
  clearAuthCookies(res);
  ok(res, { loggedOut: true });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  ok(res, { user: req.user });
});

export const csrf = asyncHandler(async (req: Request, res: Response) => {
  ok(res, { csrfToken: req.csrfToken ?? req.cookies?.csrf_token });
});
