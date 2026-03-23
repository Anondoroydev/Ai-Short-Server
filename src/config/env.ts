import { envSchema } from '../zodSchema/env.validation.ts';

const envParser = envSchema.safeParse(process.env);
if (envParser.error) {
  throw new Error(envParser.error.message);
}
export const { data: env } = envParser;
