import { v4 as uuidv4, validate } from 'uuid';

export const generateRandomUUID = () => {
  return uuidv4();
};

export const validateUUID = (value: string) => {
  return validate(value);
};
