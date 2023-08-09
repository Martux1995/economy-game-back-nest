import { add } from 'date-fns';

export const USER_REPOSITORY_MOCKS = {
  getUser: {
    params: {
      userId: 'user',
      email: 'mail@economy.com',
      personalNumberId: '11111111-1',
    },
    expected: null,
  },
  setPassResetToken: {
    params: {
      userId: 'user',
      token: 'new-token',
      expire: add(new Date(), { days: 1 }),
    },
  },
  setPassHash: {
    params: {
      userId: 'user',
      passHash: 'new-hash',
    },
  },
  removePassResetToken: {
    params: {
      userId: 'user',
    },
  },
};
