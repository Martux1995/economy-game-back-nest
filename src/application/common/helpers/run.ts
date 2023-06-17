import { validate, format, clean } from 'rut.js';

/**
 * Check if the given RUN is a valid RUN.
 * Valid values are: `XXXXXXXXXX`, `XXXXXXXXX-X` and `XXX.XXX.XXX-X`
 * @param run RUN to check.
 * @returns True if the given RUN is valid. Otherwise, false.
 */
export const validateRUN = (run: string): boolean => {
  return validate(run);
};

/**
 * Format the given RUN.
 * @param run RUT to format.
 * @param dots Indicates if the formatted RUN has dots (default true).
 * @returns RUN given in the format `XXX.XXX.XXX-X` or `XXXXXXXXX-X`.
 */
export const formatRUN = (run: string, dots = true): string => {
  return validateRUN(run) ? format(run, { dots }) : null;
};

/**
 * Clean the given RUN.
 * @param run RUT to clean.
 * @returns RUN given in the format `XXXXXXXXXX`.
 */
export const cleanRUN = (run: string): string => {
  return validateRUN(run) ? clean(run) : null;
};
