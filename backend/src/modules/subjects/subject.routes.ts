import { Router } from 'express';
import { getSubjects, getSubject, getSubjectTree, getFirstVideo } from './subject.controller';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

router.get('/', getSubjects);
router.get('/:subjectId', requireAuth, getSubject);
router.get('/:subjectId/tree', requireAuth, getSubjectTree);
router.get('/:subjectId/first-video', requireAuth, getFirstVideo);

export default router;
