import { add } from 'date-fns';
import { Session } from '../../../domain/models';
import { UserSessionData } from '../../../domain/types';
import { EUserRoles } from '../../../domain/enums';
import { AppConfig } from '../../../config/interfaces/app-config';
import { EEnvironmentVars } from '../../../config/enums/environment-vars.enum';

const CONFIG_SERVICE_MOCK = (key: EEnvironmentVars) => {
  const foo: Partial<AppConfig> = {
    JWT_SECRET: 'ASDASD123',
  };

  const value = foo[key];
  if (!value) {
    throw Error();
  }
  return value;
};

const params = {
  key: 'asdas',
  userId: '12345',
};

const adminSessionData: Session = {
  createdDate: new Date(),
  expiredDate: add(new Date(), { days: 1 }),
  sessionId: 'asdasd123',
  user: {
    firstName: 'name',
    lastName: 'last',
    userId: '12345',
    createdDate: new Date(),
    email: 'asdasd',
    enabled: true,
    isAdmin: true,
    passHash: 'hash',
    passResetExpire: null,
    passResetToken: null,
    personalNumberId: '12345678',
    session: [],
  },
};

const expectedAdmin: UserSessionData = {
  firstName: 'name',
  lastName: 'last',
  role: EUserRoles.Admin,
  sessionKey: 'asdasd123',
  userId: '12345',
};

const userSessionData: Session = {
  createdDate: new Date(),
  expiredDate: add(new Date(), { days: 1 }),
  sessionId: 'asdasd123',
  user: {
    firstName: 'name',
    lastName: 'last',
    userId: '12345',
    createdDate: new Date(),
    email: 'asdasd',
    enabled: true,
    isAdmin: false,
    passHash: 'hash',
    passResetExpire: null,
    passResetToken: null,
    personalNumberId: '12345678',
    session: [],
  },
};

const expectedUser: UserSessionData = {
  firstName: 'name',
  lastName: 'last',
  role: EUserRoles.User,
  sessionKey: 'asdasd123',
  userId: '12345',
};

const disabledSessionData: Session = {
  createdDate: new Date(),
  expiredDate: add(new Date(), { days: 1 }),
  sessionId: 'asdasd123',
  user: {
    firstName: 'name',
    lastName: 'last',
    userId: '12345',
    createdDate: new Date(),
    email: 'asdasd',
    enabled: false,
    isAdmin: false,
    passHash: 'hash',
    passResetExpire: null,
    passResetToken: null,
    personalNumberId: '12345678',
    session: [],
  },
};

export const JWT_STRATEGY_MOCK = {
  CONFIG_SERVICE_MOCK,
  params,
  adminSessionData,
  expectedAdmin,
  userSessionData,
  expectedUser,
  disabledSessionData,
};
