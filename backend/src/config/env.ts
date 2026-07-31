import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env first, then fallback to backend/.env or cwd
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const emptyStringToUndefined = (value: unknown) => (value === '' ? undefined : value);
const optionalEmail = z.preprocess(emptyStringToUndefined, z.string().email().optional());
const optionalUrl = z.preprocess(emptyStringToUndefined, z.string().url().optional());

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  API_VERSION: z.string().default('v1'),
  APP_VERSION: z.string().default('1.0.0'),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().optional(),
  CORS_ORIGIN: z.string().min(1),
  COOKIE_DOMAIN: z.string().optional(),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ADMIN_JWT_SECRET: z.string().min(32),
  JWT_ISSUER: z.string().default('prabal-portfolio-api'),
  JWT_AUDIENCE: z.string().default('prabal-portfolio-client'),
  ADMIN_ACCESS_CODE: z.string().min(8),
  CSRF_SECRET: z.string().min(32),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  ADMIN_EMAIL: optionalEmail,
  FROM_EMAIL: z.string().default('Portfolio <onboarding@resend.dev>'),
  DISCORD_WEBHOOK_URL: optionalUrl,
  RATE_LIMIT_REDIS_URL: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  STEAM_API_KEY: z.string().optional(),
  STEAM_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
export const isProduction = env.NODE_ENV === 'production';
