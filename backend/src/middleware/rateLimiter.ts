import rateLimit from 'express-rate-limit';
import { isProduction } from '../config/env.js';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isProduction ? 1000 : 10000,
  standardHeaders: true,
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isProduction ? 50 : 500,
  standardHeaders: true,
  legacyHeaders: false
});

export const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  limit: 5, // Maximum 5 requests per IP per day
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Rate limit exceeded: Maximum 5 contact requests allowed per IP per day. Please try again tomorrow.'
      }
    });
  }
});

export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: isProduction ? 2000 : 20000,
  standardHeaders: true,
  legacyHeaders: false
});
