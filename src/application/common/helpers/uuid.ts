import { v4 as uuidv4, validate } from 'uuid';

/**
 * Generate a random UUID.
 * @returns string with the generated UUID.
 */
export const generateRandomUUID = (): string => {
  return uuidv4();
};

/**
 * Check if the given value is a valid UUID.
 * @param value UUID to check.
 * @returns True if the given UUID is valid. Otherwise, false.
 */
export const validateUUID = (value: string): boolean => {
  return validate(value);
};
