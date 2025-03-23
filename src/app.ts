import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morganMiddleware from '@middleware/logger';
import { responseHandler } from '@middleware/responseHandler';
import { AppError } from '@utils/AppError';
import { errorHandler } from '@middleware/errorHandler';
import v1routes from '@routes/v1';
import logger from '@utils/logger';

const app: Application = express();

/**
 * Middleware Setup
 * - Parses incoming JSON requests
 * - Enables CORS for cross-origin requests
 * - Secures HTTP headers using Helmet
 * - Logs requests using Morgan (custom middleware)
 * - Adds a global response handler
 */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morganMiddleware);
app.use(responseHandler);

/**
 * API Versioning
 * - All v1 routes are prefixed with `/api/v1`
 */

app.use('/api/v1', v1routes);

/**
 * Handle Unknown Routes
 * - Returns a 404 response for any unmatched routes
 */
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, 'NOT_FOUND', 'Route not found!'));
});

/**
 * Centralized Error Handling Middleware
 * - Catches all errors thrown in the application and formats responses
 */
app.use(errorHandler);

/**
 * Global Error Handlers
 * - Catches uncaught exceptions (synchronous errors) and exits the process
 */
process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

/**
 * Catches unhandled promise rejections (asynchronous errors)
 * - Logs the error and exits the process
 */
process.on('unhandledRejection', (reason: unknown) => {
  logger.error(`Unhandled Promise Rejection: ${reason}`);
  process.exit(1);
});

/**
 * Graceful Shutdown Handler
 * - Handles termination signals (SIGINT, SIGTERM) and cleans up resources before exiting
 */
const shutdown = (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  process.exit(0);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
