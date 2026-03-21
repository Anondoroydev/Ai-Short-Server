import { createLogger, format, transports } from 'winston';
import { config } from './index.js';
const { combine, timestamp, printf, errors } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

export const logger = createLogger({
  level: config.WINSTION_LEVEL,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss a' }),
    errors({ stack: true }),
    myFormat,
  ),

  transports:
    config.NODE_ENV === 'production'
      ? [
          new transports.File({ filename: './logs/error.log', level: 'error' }),
          new transports.File({ filename: './logs/warn.log', level: 'warn' }),
          new transports.File({ filename: './logs/info.log', level: 'info' }),
        ]
      : [
          new transports.Console({
            format: combine(
              format.colorize(),
              timestamp({ format: 'YYYY-MM-DD hh:mm:ss a' }),
              myFormat,
            ),
          }),
        ],
});

export default logger;
