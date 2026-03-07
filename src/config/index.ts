import type { ConfigAndEnv } from '../types/config.ts';
import type { Environment } from '../types/env';
import { env } from './env.ts';

// TODO: Add more env variables

const _config: Environment = {
  ...env,
  APP_URL: env.APP_URL || `http://localhost:${env.PORT}`,
  GOOGLE_SCOPES: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ],
};

export const config: ConfigAndEnv = Object.freeze(_config);
