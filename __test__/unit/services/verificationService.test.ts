import VerificationService from '@services/verificationService';

describe('VerificationService', () => {
  describe('validateCode', () => {
    it('should validate code successfully when code is 6 digits and last digit is not 7', async () => {
      await expect(VerificationService.validateCode('123456')).resolves.not.toThrow();
    });

    it('should throw an error when code is not 6 digits', async () => {
      await expect(VerificationService.validateCode('1234567')).rejects.toThrow();
      await expect(VerificationService.validateCode('123')).rejects.toThrow();
      await expect(VerificationService.validateCode('1234')).rejects.toThrow();
      await expect(VerificationService.validateCode('12345')).rejects.toThrow();
    });

    it('should throw an error when last digit is 7', async () => {
      await expect(VerificationService.validateCode('123457')).rejects.toThrow();
    });

    it('should throw an error when OTP is empty', async () => {
      await expect(VerificationService.validateCode('')).rejects.toThrow();
    });
  });
});
