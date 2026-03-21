import z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  APP_URL: z
    .string()
    .optional()
    .default(`http://localhost:${process.env.PORT}`),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .default('development'),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URI: z.string(),
});
