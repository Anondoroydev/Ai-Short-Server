import type { Request, Response } from 'express';
import {
  loginCallbackService,
  loginService,
  logoutService,
} from '../services/auth.service.ts';
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from '../utils/cookies.ts';

async function loginController(req: Request, res: Response) {
  const url = await loginService();
  res.redirect(url);
}
async function loginCallbackController(req: Request, res: Response) {
  const code = req.query.code as string;
  const { accessToken, refreshToken } = await loginCallbackService(code);
  setRefreshTokenCookie(res, refreshToken);
  res.json({ accessToken });
}

const logoutController = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken as string;
  const result = await logoutService(token);
  if (result) {
    clearRefreshTokenCookie(res);
  }
  res.json({ message: 'logout done' });
};

export { loginCallbackController, loginController, logoutController };
