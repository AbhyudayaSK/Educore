import { Router } from 'express';
import { getSubjectProgress, getVideoProgress, updateVideoProgress, getEnrolledSubjects, deleteSubjectProgress } from './progress.controller';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

router.get('/enrolled', requireAuth, getEnrolledSubjects);
router.delete('/subjects/:subjectId', requireAuth, deleteSubjectProgress);
router.get('/subjects/:subjectId', requireAuth, getSubjectProgress);
router.get('/videos/:videoId', requireAuth, getVideoProgress);
router.post('/videos/:videoId', requireAuth, updateVideoProgress);

export default router;
