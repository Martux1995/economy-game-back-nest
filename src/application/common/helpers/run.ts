import RUT from 'rut.js';

export const validateRUN = (run: string): boolean => {
  return RUT.validate(run);
};

export const formatRUN = (run: string, dots: boolean): string => {
  return RUT.format(run, { dots });
};

export const cleanRUN = (run: string): string => {
  return RUT.clean(run);
};
