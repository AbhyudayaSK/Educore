import { AuthRepository } from './auth.repository';
import { hashPassword, comparePassword } from '../../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import crypto from 'crypto';

const repository = new AuthRepository();

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export class AuthService {
  async register(email: string, passwordPlain: string, name: string) {
    const existing = await repository.getUserByEmail(email);
    if (existing) throw new Error('Email already registered');

    const mapped = await hashPassword(passwordPlain);
    const user = await repository.createUser(email, mapped, name);
    return user;
  }

  async login(email: string, passwordPlain: string) {
    const user = await repository.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(passwordPlain, user.password_hash);
    if (!isValid) throw new Error('Invalid credentials');

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    
    // Store refresh token
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await repository.storeRefreshToken(user.id, tokenHash, expiresAt);

    return { user: { id: user.id, name: user.name, email: user.email }, accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const tokenHash = hashToken(refreshToken);
      const row = await repository.getRefreshToken(decoded.userId, tokenHash);
      if (!row) throw new Error('Invalid or revoked token');
      
      const newAccessToken = signAccessToken(decoded.userId);
      return { accessToken: newAccessToken };
    } catch {
      throw new Error('Session expired. Please login again.');
    }
  }

  async logout(userId: number, refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    await repository.revokeRefreshToken(userId, tokenHash);
  }
}
