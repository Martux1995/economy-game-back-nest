import { validateRUN, formatRUN, cleanRUN } from '../run';
import { RUNMock } from './run.mock';

describe('RUNHelper', () => {
  describe('validateRUN', () => {
    const { validRUNs, invalidRUNs } = RUNMock;
    it('should return true if the given rut are valid', () => {
      for (const run of validRUNs) {
        const result = validateRUN(run);
        expect(result).toBeDefined();
        expect(result).toBe(true);
      }
    });

    it('should return false for every case that RUN given are invalid', () => {
      for (const run of invalidRUNs) {
        const result = validateRUN(run);
        expect(result).toBeDefined();
        expect(result).toBe(false);
      }
    });
  });

  describe('formatRUN', () => {
    const { validRUNs, invalidRUNs } = RUNMock;

    it('should return a formatted string with dots and hyphen with the given RUN', () => {
      for (const run of validRUNs) {
        const result = formatRUN(run);

        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{1,3}\.\d{3}\.\d{3}-(\d|K)$/);
      }
    });

    it('should return a formatted string without dots but hyphen with the given RUN', () => {
      for (const run of validRUNs) {
        const result = formatRUN(run, false);

        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d{7,9}-(\d|K)$/);
      }
    });

    it('should return null if the RUN given are invalid', () => {
      for (const run of invalidRUNs) {
        const result = formatRUN(run);
        expect(result).toBeNull();
      }
    });
  });

  describe('cleanRUN', () => {
    const { validRUNs, invalidRUNs } = RUNMock;

    it('should return a clean RUN (without dots and hyphen) for the given RUN', () => {
      for (const run of validRUNs) {
        const result = cleanRUN(run);
        expect(result).toBeDefined();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^\d*K?$/);
      }
    });

    it('should return null if the RUN given are invalid', () => {
      for (const run of invalidRUNs) {
        const result = cleanRUN(run);
        expect(result).toBeNull();
      }
    });
  });
});
