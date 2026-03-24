import { Router } from 'express';
import { getVideo } from './video.controller';
import { requireAuth } from '../../middleware/authMiddleware';

const router = Router();

router.get('/:videoId', requireAuth, getVideo);

export default router;
