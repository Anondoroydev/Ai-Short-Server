import type { Request, Response } from 'express';
import {
  loginService,
  loginCallbackService,
  oauth2Client,
  google,
} from '../services/auth.services.ts';

async function loginController(req: Request, res: Response) {
  const url = await loginService();
  res.redirect(url);
}

async function loginCallbackController(req: Request, res: Response) {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    await loginCallbackService(code);

    const oauth = google.oauth2({
      auth: oauth2Client,
      version: 'v2',
    });

    const userInfo = await oauth.userinfo.get();
    return res.json(userInfo.data);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.error('Login callback error details:', {
      message: err.message,
      stack: err.stack,
      response: err.response?.data,
    });
    return res
      .status(500)
      .json({ error: 'Authentication failed', details: err.message });
  }
}

export { loginController, loginCallbackController };
