export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public success: boolean;
  public error: string | null;

  constructor(statusCode: number, code: string, message?: string, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code; // Custom error code
    this.success = false;
    this.error = error || null;

    // Maintain proper stack trace where the error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}
