import { Request, Response, NextFunction } from 'express';
import { SubjectService } from './subject.service';
import { AuthRequest } from '../../middleware/authMiddleware';

const service = new SubjectService();

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await service.getSubjects();
    res.json(subjects);
  } catch (err) {
    next(err);
  }
};

export const getSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjectId = req.params.subjectId as string;
    const subject = await service.getSubject(parseInt(subjectId));
    res.json(subject);
  } catch (err: any) {
    res.status(404).json({ error: { message: err.message } });
  }
};

export const getSubjectTree = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId || null;
    const subjectId = req.params.subjectId as string;
    const tree = await service.getSubjectTree(parseInt(subjectId), userId);
    res.json(tree);
  } catch (err: any) {
    res.status(404).json({ error: { message: err.message } });
  }
};

export const getFirstVideo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjectId = req.params.subjectId as string;
    const video = await service.getFirstVideo(parseInt(subjectId));
    res.json(video);
  } catch (err: any) {
    res.status(404).json({ error: { message: err.message } });
  }
};
