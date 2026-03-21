import type { Environment } from './env';

type Config = {
  GOOGLE_SCOPES: string[];
};

type ConfigAndEnv = Environment & Config;
