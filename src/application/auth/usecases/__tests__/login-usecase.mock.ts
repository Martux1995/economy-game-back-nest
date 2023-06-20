import { Session, User } from '../../../../domain/entities';
import { LoginParams } from '../../params';

const userDataMock: User = {
  userId: 'id01',
  firstName: 'testing',
  lastName: 'user',
  email: 'testing@mail-economy.com',
  personalNumberId: '11111111-1',
  passHash: 'dont care',
  passResetToken: null,
  passResetExpire: null,
  isAdmin: true,
  enabled: true,
  createdDate: new Date(),
  session: [],
};

const userSessionDataMock: Session = {
  createdDate: new Date(),
  expiredDate: new Date(),
  sessionId: 'sid01',
  user: { userId: 'id01' } as User,
};

// EMAILS MOCKS

const loginWithEmailCorrectMock: LoginParams = {
  email: 'testing@mail-economy.com',
  password: 'goodPassword',
};

const loginWithEmailWrongPassMock: LoginParams = {
  email: 'testing@mail-economy.com',
  password: 'thisIsABadPassword',
};

const loginWithEmailWrongEmailMock: LoginParams = {
  email: 'bad-email@mail-economy.com',
  password: 'ItDoesntMatter',
};

// PERSONAL ID MOCKS

const loginWithPersonalIdCorrectMock: LoginParams = {
  personalNumber: '11.111.111-1',
  password: 'goodPassword',
};

const loginWithPersonalIdWrongPassMock: LoginParams = {
  personalNumber: '11.111.111-1',
  password: 'thisIsABadPassword',
};

const loginWithPersonalIdWrongIdMock: LoginParams = {
  personalNumber: '11.111.111-2',
  password: 'ItDoesntMatter',
};

const loginWithNoneMock: LoginParams = {
  password: 'ItDoesntMatter',
};

export const loginUseCaseMock = {
  user: userDataMock,
  session: userSessionDataMock,
  email: {
    correct: loginWithEmailCorrectMock,
    wrongEmail: loginWithEmailWrongEmailMock,
    wrongPass: loginWithEmailWrongPassMock,
  },
  personalId: {
    correct: loginWithPersonalIdCorrectMock,
    wrongPersonalId: loginWithPersonalIdWrongIdMock,
    wrongPass: loginWithPersonalIdWrongPassMock,
  },
  none: loginWithNoneMock,
};
