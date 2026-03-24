import { Request, Response, NextFunction } from 'express';
import { ProgressService } from './progress.service';
import { AuthRequest } from '../../middleware/authMiddleware';
import { z } from 'zod';

const service = new ProgressService();

export const getSubjectProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const subjectId = req.params.subjectId as string;
    const data = await service.getSubjectProgress(req.user!.userId, parseInt(subjectId));
    res.json(data);
  } catch (err: any) {
    next(err);
  }
};

export const getVideoProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const videoId = req.params.videoId as string;
    const data = await service.getVideoProgress(req.user!.userId, parseInt(videoId));
    res.json(data || { last_position_seconds: 0, is_completed: false });
  } catch (err) {
    next(err);
  }
};

const updateSchema = z.object({
  last_position_seconds: z.number().nonnegative(),
  is_completed: z.boolean()
});

export const updateVideoProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { last_position_seconds, is_completed } = updateSchema.parse(req.body);
    const videoId = req.params.videoId as string;
    await service.updateVideoProgress(req.user!.userId, parseInt(videoId), last_position_seconds, is_completed);
    res.json({ success: true });
  } catch (err: any) {
    res.status(400).json({ error: { message: err.message } });
  }
};

export const deleteSubjectProgress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const subjectId = req.params.subjectId as string;
    await service.deleteSubjectProgress(userId, parseInt(subjectId));
    res.json({ message: 'Progress cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear progress' });
  }
};

export const getEnrolledSubjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await service.getEnrolledSubjects(req.user!.userId);
    res.json(data);
  } catch (err: any) {
    next(err);
  }
};
