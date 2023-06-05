import { validate, format, clean } from 'rut.js';

export const validateRUN = (run: string): boolean => {
  return validate(run);
};

export const formatRUN = (run: string, dots: boolean): string => {
  return format(run, { dots });
};

export const cleanRUN = (run: string): string => {
  return clean(run);
};
