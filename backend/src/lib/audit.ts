import type { Request } from 'express';
import { prisma } from '../config/database.js';

export async function audit(req: Request, action: string, entityType: string, entityId?: string, before?: unknown, after?: unknown) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: req.user?.id,
        action,
        entityType,
        entityId,
        before: before === undefined || before === null ? null : JSON.stringify(before),
        after: after === undefined || after === null ? null : JSON.stringify(after),
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      }
    });
  } catch (err) {
    console.error('[audit error]', err);
  }
}
