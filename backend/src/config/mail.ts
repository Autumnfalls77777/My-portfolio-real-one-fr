import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { env } from './env.js';

export const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

const isGmail = process.env.SMTP_HOST?.includes('gmail') || (!process.env.SMTP_HOST && process.env.SMTP_USER?.endsWith('@gmail.com')) || process.env.SMTP_USER?.endsWith('@gmail.com');

export const transporter = nodemailer.createTransport(
  isGmail
    ? {
        service: 'gmail',
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
        tls: { rejectUnauthorized: false }
      }
    : {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        } : undefined,
        tls: { rejectUnauthorized: false }
      }
);

