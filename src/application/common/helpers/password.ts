import bcrypt from 'bcrypt';

const ROUNDS = 10;

/**
 * Hash a password or text.
 * @param password Password to encrypt.
 * @returns Hash generated for the password.
 */
export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, ROUNDS);
};

/**
 * Check if a password or text matches with the provided hash.
 * @param password Password to check.
 * @param hash Hash to compare.
 * @returns true if the password or text match with the hash. Otherwise, false.
 */
export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
