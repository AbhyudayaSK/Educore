import { Request, Response, NextFunction } from 'express';
import { VideoService } from './video.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const service = new VideoService();

export const getVideo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || null;
    const videoId = req.params.videoId as string;
    const data = await service.getVideoDetails(parseInt(videoId), userId);
    res.json(data);
  } catch (err: any) {
    res.status(404).json({ error: { message: err.message } });
  }
};
