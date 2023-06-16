const validRUNs: string[] = [
  '18.972.631-7',
  '18972631-7',
  '189726317',
  '9.068.826-k',
  '9068826-k',
  '9068826k',
];

const invalidRUNs: string[] = [
  '18.972.631-0',
  '18,972,631-7',
  '18*972*631-7',
  '18-972-631-7',
  'error18.972.631-7',
  '9068826-1',
  '',
  '0',
  '00.000.000-0',
  '00000000-0',
  '0000000000000000000000-0',
];

export const RUNMock = {
  validRUNs,
  invalidRUNs,
};
