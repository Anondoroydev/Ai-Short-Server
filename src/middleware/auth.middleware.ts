import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthPayload } from '../../types/auth.js';
import { config } from '../config/index.ts';
import { logger } from '../config/winstonLogger.ts';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const payload = decoded as AuthPayload;

    if (!payload.userID) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.user = { id: payload.userID };

    next();
  } catch (err) {
    logger.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
