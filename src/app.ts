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

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

app.use('/api/v1', authRouter);

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
