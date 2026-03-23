import e from 'express';
import { createProject } from '../controllers/project.controller.ts';
import { authenticate } from '../middleware/auth.middleware.ts';
import { upload } from '../middleware/uploadMiddleware.ts';

const router = e.Router();

router.route('/projects').post(
  authenticate,
  upload.fields([
    { name: 'productImage', maxCount: 1 },
    { name: 'modelImage', maxCount: 1 },
  ]),
  createProject,
);

export const projectRouter = router;
