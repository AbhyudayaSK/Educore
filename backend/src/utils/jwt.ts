import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function signAccessToken(userId: number): string {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
}

export function signRefreshToken(userId: number): string {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
}

export function verifyAccessToken(token: string): { userId: number } {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { userId: number };
}

export function verifyRefreshToken(token: string): { userId: number } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: number };
}
