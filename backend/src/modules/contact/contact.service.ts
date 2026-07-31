import nodemailer from 'nodemailer';
import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';
import { logger } from '../../config/logger.js';
import { resend, transporter } from '../../config/mail.js';
import { sha256 } from '../../lib/crypto.js';

export async function createContactMessage(input: { name: string; email: string; company?: string | null; reason?: string | null; message: string }, context: { ip?: string; userAgent?: string }) {
  const submissionHash = sha256(`${input.email}:${input.message}:${Math.floor(Date.now() / 300000)}`);
  const existing = await prisma.contactMessage.findFirst({
    where: { submissionHash, createdAt: { gt: new Date(Date.now() - 5 * 60 * 1000) } }
  });
  if (existing) return existing;

  const message = await prisma.contactMessage.create({
    data: {
      ...input,
      reason: input.reason as never,
      ipAddress: context.ip,
      userAgent: context.userAgent,
      submissionHash
    }
  });

  setImmediate(() => {
    void notifyContact(message).catch((error) => logger.error({ err: error }, 'Contact notification failed'));
  });

  return message;
}

async function notifyContact(message: { name: string; email: string; company?: string | null; reason?: string | null; message: string }) {
  const adminTargetEmail = env.ADMIN_EMAIL || 'prabaljaiswal69420@gmail.com';

  // 1. Notification Email to Prabal
  const adminSubject = `📬 New Portfolio Inquiry from ${message.name} (${message.reason || 'General'})`;
  const adminBody = `
New Project Inquiry Received:

Name: ${message.name}
Email: ${message.email}
Company: ${message.company || 'N/A'}
Inquiry Reason: ${message.reason || 'General'}

Message:
${message.message}
  `.trim();

  // 2. Automated Confirmation Email to Recipient
  const recipientSubject = `Thank you for reaching out, ${message.name}!`;
  const recipientBody = `
Hi ${message.name},

Thanks for reaching out!

Your message has been successfully received, and I've been notified. I really appreciate you taking the time to get in touch.

Whether it's a collaboration, freelance project, internship, full-time opportunity, or simply a conversation about technology or design, I'll personally review your message and get back to you as soon as possible.

⏱ Typical response time: 24–48 hours.

In the meantime, feel free to explore more of my work:

• GitHub: https://github.com/Autumnfalls77777

Thanks again for reaching out, I look forward to connecting with you!

Best regards,

Prabal Jaiswal
Graphic Designer • Full-Stack Developer

-----

This is an automated confirmation email to let you know your message has been delivered successfully and Prabal has been notified. No further action is required from your side.
  `.trim();

  const fromAddress = env.FROM_EMAIL || `"Prabal Jaiswal" <prabaljaiswal69420@gmail.com>`;

  // ── A. Send via Nodemailer SMTP if configured ──
  if (transporter && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      await transporter.sendMail({
        from: fromAddress,
        to: adminTargetEmail,
        subject: adminSubject,
        text: adminBody,
      });
      logger.info(`Sent inquiry alert to ${adminTargetEmail} via SMTP`);

      await transporter.sendMail({
        from: fromAddress,
        to: message.email,
        subject: recipientSubject,
        text: recipientBody,
      });
      logger.info(`Sent confirmation email to ${message.email} via SMTP`);
      return;
    } catch (err) {
      logger.error({ err }, 'SMTP email dispatch failed');
    }
  }

  // ── B. Send via Resend API if key is set ──
  if (resend && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: env.FROM_EMAIL,
        to: adminTargetEmail,
        subject: adminSubject,
        text: adminBody,
      });

      await resend.emails.send({
        from: env.FROM_EMAIL,
        to: message.email,
        subject: recipientSubject,
        text: recipientBody,
      });
      logger.info(`Sent emails via Resend to ${adminTargetEmail} and ${message.email}`);
      return;
    } catch (err) {
      logger.error({ err }, 'Resend email dispatch failed');
    }
  }

  // ── C. Test Fallback via Ethereal Mail ──
  try {
    const testAccount = await nodemailer.createTestAccount();
    const testTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info1 = await testTransporter.sendMail({
      from: `"Portfolio Inquiry" <${testAccount.user}>`,
      to: adminTargetEmail,
      subject: adminSubject,
      text: adminBody,
    });

    const info2 = await testTransporter.sendMail({
      from: `"Prabal Jaiswal" <${testAccount.user}>`,
      to: message.email,
      subject: recipientSubject,
      text: recipientBody,
    });

    const previewUrl1 = nodemailer.getTestMessageUrl(info1);
    const previewUrl2 = nodemailer.getTestMessageUrl(info2);

    logger.info(`[Ethereal Test Mailer] Admin Alert Preview: ${previewUrl1}`);
    logger.info(`[Ethereal Test Mailer] Recipient Confirmation Preview: ${previewUrl2}`);
  } catch (err) {
    logger.error({ err }, 'Ethereal test mailer fallback failed');
  }

  // Discord Webhook Notification
  if (env.DISCORD_WEBHOOK_URL) {
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `📬 **New Portfolio Inquiry**\n**From:** ${message.name} (${message.email})\n**Company:** ${message.company || 'N/A'}\n**Reason:** ${message.reason || 'General'}\n**Message:** ${message.message}`
      })
    }).catch(() => {});
  }
}
