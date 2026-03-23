import z from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  APP_URL: z.string().optional(),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .default('development'),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URL: z.string(),
  JWT_SECRET: z.string(),
  DSN: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  GOOGLE_GEMINI_API_KEY: z.string(),
});
