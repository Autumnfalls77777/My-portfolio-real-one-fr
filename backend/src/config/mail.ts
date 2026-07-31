import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { env } from './env.js';

export const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(process.env.SMTP_SECURE === 'true'),
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});
