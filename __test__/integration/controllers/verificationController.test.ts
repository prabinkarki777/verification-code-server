import { Request, Response } from 'express';
import VerificationService from '@services/verificationService';
import { verifyCode } from '@controllers/verificationController';
import { AppError } from '@utils/AppError';

jest.mock('@services/verificationService');

describe('verifyCode function', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;
  beforeEach(() => {
    mockReq = {
      body: {
        code: '123456',
      },
    };

    mockRes = {
      success: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success response with valid code', async () => {
    (VerificationService.validateCode as jest.Mock).mockReturnValue(undefined);
    await verifyCode(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.success).toHaveBeenCalledWith(200, 'Code verification successful');
    expect(mockRes.success).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error when code is invalid', async () => {
    (VerificationService.validateCode as jest.Mock).mockImplementation(() => {
      throw new AppError(400, 'INVALID_CODE', 'Invalid code provided. Please provide a valid 6-digit code.');
    });
    await verifyCode(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.success).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        code: 'INVALID_CODE',
        message: 'Invalid code provided. Please provide a valid 6-digit code.',
      }),
    );
  });

  it('should call next function with error when code is missing in request body', async () => {
    delete (mockReq as Request).body.code;
    await verifyCode(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('should call next function with error when VerificationService throws an error', async () => {
    (VerificationService.validateCode as jest.Mock).mockImplementation(() => {
      throw new Error('VerificationService error');
    });
    await verifyCode(mockReq as Request, mockRes as Response, mockNext);
    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'VerificationService error',
      }),
    );
  });
});
