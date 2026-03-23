import type { ConfigAndEnv } from '../../types/config.js';
import { env } from './env.ts';
const _config: ConfigAndEnv = {
  ...env,
  APP_URL: env.APP_URL || `http://localhost:${env.PORT}`,
  GOOGLE_SCOPES: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ],
  WINSTON_LEVEL: 'info',
};

export const config: ConfigAndEnv = Object.freeze(_config);
