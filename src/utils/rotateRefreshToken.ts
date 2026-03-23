import { prisma } from '../lib/prisma.ts';
import { createSession } from '../services/auth.service.ts';
import { hashToken } from './token.ts';

export const rotateRefreshToken = async (token: string) => {
  const hashed = hashToken(token);

  const session = await prisma.session.findFirst({
    where: { refreshToken: hashed },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new Error('Invalid refresh token');
  }

  // Delete old token (rotation)
  await prisma.session.delete({
    where: { id: session.id },
  });

  return createSession(session.userId);
};
