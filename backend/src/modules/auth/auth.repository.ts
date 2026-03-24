import { pool } from '../../config/db';
import { User } from '../../types';

export class AuthRepository {
  async createUser(email: string, passwordHash: string, name: string): Promise<User> {
    const [result]: any = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)',
      [email, passwordHash, name]
    );
    const [rows]: any = await pool.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
    return rows[0];
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }

  async storeRefreshToken(userId: number, tokenHash: string, expiresAt: Date) {
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES (?, ?, ?)',
      [userId, tokenHash, expiresAt]
    );
  }

  async getRefreshToken(userId: number, tokenHash: string) {
    const [rows]: any = await pool.query(
      'SELECT * FROM refresh_tokens WHERE user_id = ? AND token_hash = ? AND revoked_at IS NULL AND expires_at > NOW()',
      [userId, tokenHash]
    );
    return rows[0] || null;
  }

  async revokeRefreshToken(userId: number, tokenHash: string) {
    await pool.query(
      'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_id = ? AND token_hash = ?',
      [userId, tokenHash]
    );
  }
}
