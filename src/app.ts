import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import type { HttpError } from 'http-errors';
import createHttpError from 'http-errors';

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return next(createHttpError(500, 'Internal Server Error'));
});

export { app };
