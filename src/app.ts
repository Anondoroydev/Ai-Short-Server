import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { authRouter } from './router/auth.routes.js';
import { type HttpError } from 'http-errors';
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
  // Send a log before throwing the error
  Sentry.logger.info('User triggered test error', {
    action: 'test_error_endpoint',
  });
  // Send a test metric before throwing the error
  Sentry.metrics.count('test_counter', 1);
  throw new Error('My first Sentry error!');
});

Sentry.setupExpressErrorHandler(app);

app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status: 'error',
    message,
  });
});

export { app };
