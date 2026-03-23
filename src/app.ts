import cookie from 'cookie-parser';
import cors from 'cors';
import e, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import type { HttpError } from 'http-errors';
import createHttpError from 'http-errors';
import { logger } from './config/winstonLogger.ts';
import { authRouter } from './routes/auth.route.ts';
import { projectRouter } from './routes/project.route.ts';
const app = e();

app.use(cors());
app.use(helmet());
app.use(cookie());
app.use(e.json());

app.use('/api/v1', authRouter);
app.use('/api/v1', projectRouter);

app.get('/debug-sentry', function mainHandler() {
  throw logger.error('This is an error log 2');
});

app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return next(createHttpError(500, 'something fishy fishy'));
});

export { app };
