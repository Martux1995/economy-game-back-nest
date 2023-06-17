import { User } from '../../../../domain/entities';
import { LoginParams } from '../../params';

const userDataMock: User = {
  userId: 1,
  passHash: 'dont care',
  isAdmin: true,
  enabled: true,
  createdDate: new Date(),
  person: {
    personId: 1,
    personNumberId: '11111111-1',
    email: 'testing@mail-economy.com',
    firstName: 'testing',
    lastName: 'user',
    createdDate: new Date(),
  },
  session: [
    {
      createdDate: new Date(),
      expiredDate: new Date(),
      key: 'dont care',
      sessionId: 1,
      user: null,
    },
  ],
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
