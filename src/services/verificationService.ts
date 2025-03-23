import { AppError } from '@utils/AppError';

/**
 * Service to handle code validation.
 */
export default class VerificationService {
  /**
   * Validates a given code.
   * Ensures the code is exactly 6 digits long and does not end with '7'.
   *
   * @throws {AppError} - If code is invalid.
   * @param {string} code - The code to validate.
   * @returns {Promise<void>} - Resolves if code is valid, rejects with AppError if invalid.
   */
  static async validateCode(code: string): Promise<void> {
    try {
      // Validate code length and last digit is not 7
      if (code.length !== 6 || code.endsWith('7')) {
        throw new AppError(400, 'INVALID_CODE', 'Invalid code provided. Please provide a valid 6-digit code.');
      }
    } catch (error) {
      throw error;
    }
  }
}
