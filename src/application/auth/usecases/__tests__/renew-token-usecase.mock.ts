import { Session } from '../../../../domain/models';

const sessionData: Session = {
  createdDate: new Date(2020, 1, 10),
  expiredDate: new Date(2090, 6, 8),
  sessionId: 'sid01',
  user: null,
};

const newSessionData: Session = {
  createdDate: new Date(2020, 1, 10),
  expiredDate: new Date(2090, 6, 8),
  sessionId: 'sid01',
  user: null,
};

const expiredSessionData: Session = {
  createdDate: new Date(2020, 1, 10),
  expiredDate: new Date(2021, 4, 1),
  sessionId: 'sid02',
  user: null,
};

const renewData = {
  userId: '1283987',
  oldSessionId: 'abcdef',
};

export const renewTokenUseCaseMock = {
  sessionData,
  newSessionData,
  renewData,
  expiredSessionData,
};
