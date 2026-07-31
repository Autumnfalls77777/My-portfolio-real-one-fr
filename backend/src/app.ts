import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import { pinoHttp } from 'pino-http';
import { env, isProduction } from './config/env.js';
import { logger } from './config/logger.js';
import { issueCsrfToken, requireCsrf } from './middleware/csrf.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { prisma } from './config/database.js';
import { authRouter } from './modules/auth/auth.router.js';
import { softwareRouter } from './modules/software/software.router.js';
import { designRouter } from './modules/design/design.router.js';
import { careerRouter } from './modules/career/career.router.js';
import { certificatesRouter } from './modules/certificates/certificates.router.js';
import { offerLettersRouter, resumesRouter } from './modules/resumes/resumes.router.js';
import { contactRouter } from './modules/contact/contact.router.js';
import { mediaRouter } from './modules/media/media.router.js';
import { achievements, languages, showcaseItems, techTools, testimonials, brandCards, brandWorks, designCollections } from './modules/content/content.router.js';
import { adminRouter } from './modules/admin/admin.router.js';
import { settingsRouter } from './modules/settings/settings.router.js';
import { steamRouter } from './modules/steam/steam.router.js';

const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean);
const apiPrefix = `/api/${env.API_VERSION}`;

export const app = express();

app.set('trust proxy', 1);
app.use(pinoHttp({
  logger,
  customLogLevel(req, res, err) {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'silent';
  },
  autoLogging: {
    ignore: (req) => req.url === '/health'
  }
}));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:', 'res.cloudinary.com', '*.cloudinary.com', '*.githubusercontent.com', 'cdn.discordapp.com', 'avatars.steamstatic.com', 'media.steampowered.com', 'cdn.cloudflare.steamstatic.com'],
      mediaSrc: ['res.cloudinary.com', '*.cloudinary.com'],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", 'https://api.cloudinary.com', 'https://api.github.com', 'https://api.lanyard.rest', 'https://api.steampowered.com', ...allowedOrigins],
      frameAncestors: ["'none'"]
    }
  },
  hsts: isProduction ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xFrameOptions: { action: 'deny' }
}));
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
      return;
    }
    callback(new Error('CORS: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'Authorization', 'X-Admin-Token'],
  maxAge: 86400
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(globalLimiter);
app.use(issueCsrfToken);
app.use(requireCsrf);
app.use((req, res, next) => {
  req.setTimeout(30_000, () => {
    res.status(408).json({ success: false, error: { code: 'TIMEOUT', message: 'Request timed out' } });
  });
  next();
});

app.get('/health', async (_req, res) => {
  let db = 'connected';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = 'disconnected';
  }
  res.json({ status: db === 'connected' ? 'ok' : 'degraded', version: env.APP_VERSION, db, uptime: process.uptime() });
});

app.use(`${apiPrefix}/auth`, authRouter);
app.use(`${apiPrefix}/software`, softwareRouter);
app.use(`${apiPrefix}/designs`, designRouter);
app.use(`${apiPrefix}/career`, careerRouter);
app.use(`${apiPrefix}/certificates`, certificatesRouter);
app.use(`${apiPrefix}/resumes`, resumesRouter);
app.use(`${apiPrefix}/offer-letters`, offerLettersRouter);
app.use(`${apiPrefix}/contact`, contactRouter);
app.use(`${apiPrefix}/media`, mediaRouter);
app.use(`${apiPrefix}/achievements`, achievements.publicRouter);
app.use(`${apiPrefix}/showcase`, showcaseItems.publicRouter);
app.use(`${apiPrefix}/testimonials`, testimonials.publicRouter);
app.use(`${apiPrefix}/languages`, languages.publicRouter);
app.use(`${apiPrefix}/tech-tools`, techTools.publicRouter);
app.use(`${apiPrefix}/brand-cards`, brandCards.publicRouter);
app.use(`${apiPrefix}/brand-works`, brandWorks.publicRouter);
app.use(`${apiPrefix}/design-collections`, designCollections.publicRouter);
app.use(`${apiPrefix}/settings`, settingsRouter);
app.use(`${apiPrefix}/steam`, steamRouter);
app.use(`${apiPrefix}/admin`, adminRouter);

// Serve static compiled frontend assets if dist directory exists
const distPath = path.resolve(process.cwd(), '../dist');
const localDistPath = path.resolve(process.cwd(), 'dist');
const activeDist = fs.existsSync(distPath) ? distPath : (fs.existsSync(localDistPath) ? localDistPath : null);

if (activeDist) {
  app.use(express.static(activeDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') return next();
    res.sendFile(path.resolve(activeDist, 'index.html'));
  });
} else {
  app.use(notFound);
}

app.use(errorHandler);
