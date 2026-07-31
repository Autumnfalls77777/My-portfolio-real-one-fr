import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.js';
import { authLimiter } from '../../middleware/rateLimiter.js';
import { validateBody } from '../../middleware/validate.js';
import { adminLogin, csrf, login, logout, me, refresh, register } from './auth.controller.js';
import { adminLoginSchema, loginSchema, registerSchema } from './auth.schema.js';

export const authRouter = Router();

authRouter.post('/register', authLimiter, validateBody(registerSchema), register);
authRouter.post('/login', authLimiter, validateBody(loginSchema), login);
authRouter.post('/admin/login', authLimiter, validateBody(adminLoginSchema), adminLogin);
authRouter.post('/refresh', authLimiter, refresh);
authRouter.post('/logout', logout);
authRouter.get('/me', requireAuth, me);
authRouter.get('/csrf', csrf);
