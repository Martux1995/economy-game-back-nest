import { comparePassword, hashPassword } from '../password';
import { passwordMocks } from './password.mock';

describe('passwordHelper', () => {
  describe('hashPassword', () => {
    const { correctPassword } = passwordMocks.compare;
    it('shuld generate a hash password with the given string', () => {
      const result = hashPassword(correctPassword);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('comparePassword', () => {
    const { correctPassword, wrongPassword, hash } = passwordMocks.compare;
    it('should return true if the given password match with the given hash', () => {
      const result = comparePassword(correctPassword, hash);

      expect(result).toBeDefined();
      expect(result).toBe(true);
    });

    it('should return false if the given password no match with the given hash', () => {
      const result = comparePassword(wrongPassword, hash);

      expect(result).toBeDefined();
      expect(result).toBe(false);
    });
  });
});
