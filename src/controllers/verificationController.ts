import { Request, Response, NextFunction } from 'express';
import VerificationService from '@services/verificationService';
import { AppError } from '@utils/AppError';

/**
 * Handles a POST request to /verify, validating the provided code.
 * If the code is valid, it sends a successful response with a 200 status code.
 * If the code is invalid, it calls next() with an AppError containing the error message.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next() function.
 *
 * Note: Input sanitization is not included in this implementation.
 * In production applications, sanitization should be applied to ensure data integrity
 * and security (e.g., preventing XSS, SQL injection).
 */
export const verifyCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const code: string = req.body.code;
  if (!code) {
    return next(new AppError(400, 'MISSING_CODE', 'Code is required'));
  }
  try {
    await VerificationService.validateCode(code);

    res.success(200, 'Code verification successful');
  } catch (error) {
    next(error);
  }
};
