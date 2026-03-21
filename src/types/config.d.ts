import type { Environment } from './env';

type Config = {
  GOOGLE_SCOPES;
  WINSTION_LEVEL;
};

type ConfigAndEnv = Environment & Config;
