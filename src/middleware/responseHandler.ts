import { Request, Response, NextFunction } from 'express';
import { ApiResponseHandler } from '@utils/apiResponse';
import { ResponseData } from '../types';

export const responseHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.success = (statusCode: number = 200, message: string, data?: ResponseData) => {
    const response = ApiResponseHandler.success(message, data);
    res.status(statusCode).json(response);
  };
  next();
};
