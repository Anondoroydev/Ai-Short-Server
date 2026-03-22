import { addColors, createLogger, format, transports } from 'winston';
import Sentry from 'winston-sentry-log';
import { config } from './index.ts';
const { combine, timestamp, printf, json, errors, colorize } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = config.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};
const options = {
  config: {
    dsn: config.DSN,
  },
  level: level(),
};
const isProd = config.NODE_ENV === 'production';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};

addColors(colors);

const myFormat = combine(
  timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
  colorize({ all: true }),
  errors({ stack: !isProd }),
  isProd
    ? json()
    : printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);
const myTransports = isProd
  ? [
      new transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
      new transports.File({
        filename: './logs/warn.log',
        level: 'warn',
      }),
      new transports.File({
        filename: './logs/info.log',
        level: 'info',
      }),
      new Sentry(options),
    ]
  : [new transports.Console()];

export const logger = createLogger({
  level: level(),
  levels,
  format: myFormat,
  transports: myTransports,
});
