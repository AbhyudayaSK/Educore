import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { z } from 'zod';
import { AuthRequest } from '../../middleware/authMiddleware';

const service = new AuthService();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body);
    const user = await service.register(email, password, name);
    res.status(201).json({ message: 'Registered successfully', user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    res.status(400).json({ error: { message: err.message } });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await service.login(email, password);
    
    // Set HTTP-only cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({ user, accessToken });
  } catch (err: any) {
    res.status(401).json({ error: { message: err.message } });
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
       res.status(401).json({ error: { message: 'No refresh token provided' } });
       return;
    }
    const { accessToken } = await service.refresh(refreshToken);
    res.json({ accessToken });
  } catch (err: any) {
    res.clearCookie('refreshToken');
    res.status(401).json({ error: { message: err.message } });
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken && req.user) {
      await service.logout(req.user.userId, refreshToken);
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out' });
  } catch (err: any) {
    next(err);
  }
};
