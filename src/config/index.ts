import type { ConfigAndEnv } from '../types/config.js';
import { env } from './env.js';

const _config: ConfigAndEnv = {
  ...env,
  APP_URL: env.APP_URL || `http://localhost:${env.PORT}`,
  GOOGLE_SCOPES: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ],
  WINSTION_LEVEL: 'info',
  SENTRY_DSN: env.SENTRY_DSN,
};

export const config: ConfigAndEnv = Object.freeze(_config);
