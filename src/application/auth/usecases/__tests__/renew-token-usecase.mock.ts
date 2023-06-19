import { Session } from '../../../../domain/entities';

const sessionData: Session = {
  createdDate: new Date(2020, 1, 10),
  expiredDate: new Date(2090, 6, 8),
  key: 'dont care',
  sessionId: 1,
  user: null,
};

const expiredSessionData: Session = {
  createdDate: new Date(2020, 1, 10),
  expiredDate: new Date(2021, 4, 1),
  key: 'dont care',
  sessionId: 1,
  user: null,
};

const renewData = {
  userId: 12345,
  oldKey: 'abcdef',
};

export const renewTokenUseCaseMock = {
  sessionData,
  renewData,
  expiredSessionData,
};
