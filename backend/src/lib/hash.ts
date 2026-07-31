import bcrypt from 'bcryptjs';

const COST = 12;

export function hashValue(value: string) {
  return bcrypt.hash(value, COST);
}

export function verifyHash(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}
