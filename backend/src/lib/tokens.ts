import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

type TokenScope = 'user' | 'admin' | 'refresh';

export type TokenPayload = {
  sub: string;
  email: string;
  role: string;
  scope: TokenScope;
};

function secretFor(scope: TokenScope) {
  if (scope === 'admin') return env.ADMIN_JWT_SECRET;
  if (scope === 'refresh') return env.JWT_REFRESH_SECRET;
  return env.JWT_SECRET;
}

export function signToken(payload: TokenPayload, expiresIn: SignOptions['expiresIn']) {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn,
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE
  };
  return jwt.sign(payload, secretFor(payload.scope), options);
}

export function verifyToken(token: string, scope: TokenScope) {
  return jwt.verify(token, secretFor(scope), {
    algorithms: ['HS256'],
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE
  }) as TokenPayload & jwt.JwtPayload;
}
