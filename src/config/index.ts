import type { Environment } from '../types/env.ts';
import { env } from './env.ts';

// TODO: Add more env variabless

const _config: Environment = {
  ...env,
  APP_URL: env.APP_URL || `http://localhost:${env.PORT}`,
};

export const config = Object.freeze(_config);
