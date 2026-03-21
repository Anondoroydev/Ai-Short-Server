import type z from 'zod';
import { envSchema } from '../zodSchema/env.validation';

type Environment = z.infer<typeof envSchema>;
