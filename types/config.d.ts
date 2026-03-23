import type { Environment } from './env.ts';
type Config = {
  GOOGLE_SCOPES;
  WINSTON_LEVEL;
};

type ConfigAndEnv = Environment & Config;
