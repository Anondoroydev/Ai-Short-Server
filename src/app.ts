import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { authRouter } from './router/auth.routes.js';
import createHttpError, { type HttpError } from 'http-errors';
import { logger } from './config/winstonLogger.ts';
import * as Sentry from '@sentry/node';

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

app.use('/api/v1', authRouter);

app.get('/logger', (_, res) => {
  logger.info('Hello World!');
  logger.warn('Hello World!');
  logger.error('Hello World!');
  logger.debug('Hello World!');
  res.send('Logs generated in terminal');
});
app.get('/debug-sentry', function mainHandler() {
  throw logger.error('This is an error log 2');
});
Sentry.setupExpressErrorHandler(app);

app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return next(createHttpError(500, err.message));
});
export { app };
