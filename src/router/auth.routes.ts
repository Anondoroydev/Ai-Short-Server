import express, { Router } from 'express';
import {
  loginCallbackController,
  loginController,
} from '../controllers/auth.controller.ts';

const router = express.Router();

router.get('/auth/google/login', loginController);
router.get('/auth/google/callback', loginCallbackController);

export const authRouter: Router = router;
