import e from 'express';
import {
  loginCallbackController,
  loginController,
  logoutController,
} from '../controllers/auth.controller.ts';
import { authenticate } from '../middleware/auth.middleware.ts';
const router = e.Router();

router.get('/auth/google/login', loginController);
router.get('/auth/google/callback', loginCallbackController);
router.get('/auth/logout', authenticate, logoutController);

export const authRouter = router;
