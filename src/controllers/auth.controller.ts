import type { Request, Response } from 'express';
import { loginService } from '../services/auth.services.ts';
async function loginController(req: Request, res: Response) {
  const url = await loginService();
  res.redirect(url);
}

export { loginController };
