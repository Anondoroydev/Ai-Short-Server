import 'dotenv/config';
import { envSchema } from '../zosSchema/env.validation.ts';

const envParser = envSchema.safeParse(process.env);

if (envParser.error) {
  throw new Error(envParser.error.message);
}
// export const {data: env} = envParser;
export const env = envParser.data;
