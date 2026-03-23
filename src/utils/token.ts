import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';
import crypto from 'crypto';
export const generateAccessToken = (userID: string) => {
  return jwt.sign({ userID }, config.JWT_SECRET, { expiresIn: '1d' });
};

export const generateRefreshToken = () =>
  crypto.randomBytes(64).toString('hex');

export const hashToken = (token: string) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};
