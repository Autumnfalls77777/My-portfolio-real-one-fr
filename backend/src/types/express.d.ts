import type { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      role: UserRole;
      scope: 'user' | 'admin';
    }

    interface Request {
      user?: User;
      csrfToken?: string;
    }
  }
}

export {};
