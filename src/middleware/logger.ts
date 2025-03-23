import morgan from 'morgan';
import logger from '@utils/logger';
import { config } from '@config/index';

// Define custom morgan format for logging
morgan.token('message', (req, res) => res.statusMessage || '');
const logFormat = JSON.stringify({
  method: ':method',
  url: ':url',
  status: ':status',
  response_time: ':response-time ms',
  message: ':message',
  timestamp: ':date[iso]',
});

// Morgan stream to Winston
const stream = {
  write: (message: string) => {
    if (process.env.NODE_ENV !== 'test') {
      logger.http(JSON.parse(message));
    }
  },
};

// Skip logging in production if not needed
const skip = () => config.NODE_ENV === 'production' && !config.LOG_HTTP;

const morganMiddleware = morgan(logFormat, { stream, skip });

export default morganMiddleware;
