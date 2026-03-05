import type { Environment } from './env/ts';

type Config = {
  GOOGLE_SCOPES;
};

type ConfigAndEnv = Environment & Config;
