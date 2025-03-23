import { NextFunction, Request, Response } from 'express';
import { AppError } from '@utils/AppError';
import { config } from '@config/index';
import { ErrorResponse } from '../types';
import logger from '@utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorCode = 'INTERNAL_SERVER';

  // Generate request ID (for tracing)
  const requestId = Array.isArray(req.headers['x-request-id'])
    ? req.headers['x-request-id'][0]
    : req.headers['x-request-id'] || generateRequestId();

  if (config.NODE_ENV === 'development') {
    logger.error({
      message: err.message,
      stack: err.stack,
      requestId,
      url: req.originalUrl,
      method: req.method,
    });
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode || 400;
    errorCode = err.code || 'INTERNAL_SERVER';
    message = err.message;
  }

  // Log the error for production, if it's a critical error
  if (statusCode >= 500 && config.NODE_ENV === 'production') {
    // Log critical errors like 500 Internal Server Error in the log file
    logger.error({
      message,
      statusCode,
      requestId,
      url: req.originalUrl,
      method: req.method,
      stack: err.stack,
    });
  } else if (statusCode >= 400 && config.NODE_ENV === 'production') {
    // Log 4xx errors as warnings in production
    logger.warn({
      message,
      statusCode,
      requestId,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Send error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: config.NODE_ENV === 'production' && !(err instanceof AppError) ? 'Something went wrong' : err.message,
      timestamp: new Date().toISOString(),
      requestId,
      ...(config.NODE_ENV === 'development' && { stack: err.stack || null }),
    },
  };
  res.status(statusCode).json(errorResponse);
};

// Function to generate a request ID
const generateRequestId = (): string => Math.random().toString(36).substring(2, 15);
