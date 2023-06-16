import { generateRandomUUID, validateUUID } from '../uuid';
import { UUIDMock } from './uuid.mock';

const UUIDRegexp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

describe('UUIDHelper', () => {
  describe('generateRandomUUID', () => {
    it('should generate a random v4 UUID', () => {
      const result = generateRandomUUID();

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toMatch(UUIDRegexp);
    });
  });

  describe('validateUUID', () => {
    const { validUUIDs, invalidUUIDs } = UUIDMock;
    it('should return true if the given UUID is valid', () => {
      for (const uuid of validUUIDs) {
        const result = validateUUID(uuid);

        expect(result).toBeDefined();
        expect(result).toBe(true);
      }
    });

    it('should return false if the given UUID is invalid', () => {
      for (const uuid of invalidUUIDs) {
        const result = validateUUID(uuid);

        expect(result).toBeDefined();
        expect(result).toBe(false);
      }
    });
  });
});
