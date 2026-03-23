import { google } from 'googleapis';
import { config } from '../config/index.ts';
import { prisma } from '../lib/prisma.ts';
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from '../utils/token.ts';

const oauth2Client = new google.auth.OAuth2(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.GOOGLE_REDIRECT_URL,
);

const loginService = async () => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: config.GOOGLE_SCOPES,
  });
  return url;
};
const loginCallbackService = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2',
  });
  const { data: userInfo } = await oauth2.userinfo.get();
  if (!userInfo.email) {
    throw new Error('Google account has no email');
  }

  const user = await prisma.user.upsert({
    where: { email: userInfo.email },
    update: {
      name: userInfo.name!,
      picture: userInfo.picture!,
      googleId: userInfo.id!,
    },
    create: {
      name: userInfo.name!,
      email: userInfo.email!,
      picture: userInfo.picture!,
      googleId: userInfo.id!,
    },
  });
  const { accessToken, refreshToken } = await createSession(user.id);

  return { accessToken, refreshToken };
};

const createSession = async (userId: string) => {
  const refreshToken = generateRefreshToken();
  const hashedToken = hashToken(refreshToken);

  await prisma.session.create({
    data: {
      userId,
      refreshToken: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const accessToken = generateAccessToken(userId);

  return { accessToken, refreshToken };
};

const logoutService = async (token: string) => {
  const hashed = hashToken(token);
  const result = await prisma.session.deleteMany({
    where: { refreshToken: hashed },
  });
  return result.count;
};

export { createSession, loginCallbackService, loginService, logoutService };
