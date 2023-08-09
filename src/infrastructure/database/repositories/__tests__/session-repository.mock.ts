import { add } from 'date-fns';

export const SESSION_REPOSITORY_MOCKS = {
  getSession: {
    params: { userId: 'user', sessionId: 'id' },
    expected: null,
  },
  createSession: {
    params: {
      userId: 'user',
      expiredDate: add(new Date(), { days: 1 }),
    },
    expected: null,
  },
  deleteSession: {
    params: {
      sessionId: 'asdf',
    },
  },
  deleteAllUserSessions: {
    params: {
      userId: 'user',
      sessionId: 'asdf',
    },
  },
};
