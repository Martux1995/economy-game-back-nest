import bcrypt from 'bcrypt';

const ROUNDS = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, ROUNDS);
};

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};
