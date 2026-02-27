import type z from 'zod';
import type { envSchema } from '../config/env';


type Environment = z.infer<typeof envSchema>;
