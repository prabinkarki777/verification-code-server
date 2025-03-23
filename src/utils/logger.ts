import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { config } from '@config/index';

const logDirectory = path.resolve(process.cwd(), 'logs');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Define log levels
const logLevels = {
  levels: { error: 0, warn: 1, info: 2, http: 3, debug: 4 },
  colors: { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'blue' },
};

winston.addColors(logLevels.colors);

// Define transports
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`),
    ),
  }),
];

// Adding logging file only in production
if (config.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: path.join(logDirectory, 'access.log'),
      level: 'info',
    }),

    new winston.transports.File({
      filename: path.join(logDirectory, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }), // Ensure stack trace is included
        winston.format.json(),
        // winston.format.printf(({ level, message, stack, timestamp }) => {
        //   return `${timestamp} ${level}: ${message}\nStack Trace: ${stack}`;
        // })
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, 'access.log'),
      level: 'http',
      format: winston.format.json(),
    }),
  );
}

// Create logger instance
const logger = winston.createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: logLevels.levels,
  format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json()),
  transports,
});

export default logger;
