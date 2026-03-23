import type z from 'zod';
import type { envSchema } from '../src/zodSchema/env.validation.ts';

export type Environment = z.infer<typeof envSchema>;
