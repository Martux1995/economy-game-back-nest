import { add, sub } from 'date-fns';
import { User } from '../../../../domain/models';
import { TokenData } from '../../../../domain/types';

const passCode = 'random-password-code';

const tokenData: TokenData = {
  userId: 'id01',
  key: passCode,
};

const validUser: User = {
  userId: 'id01',
  firstName: 'testing',
  lastName: 'user',
  email: 'testing@mail-economy.com',
  personalNumberId: '11111111-1',
  passHash: 'dont care',
  passResetToken: passCode,
  passResetExpire: add(new Date(), { hours: 2 }),
  isAdmin: true,
  enabled: true,
  createdDate: new Date(),
  session: [],
};

const expiredResetTokenUser: User = {
  ...validUser,
  passResetExpire: sub(new Date(), { hours: 2 }),
};

const tokenNotEqualUser: User = {
  ...validUser,
  passResetToken: 'invalid-code',
};

const disabledUser: User = {
  ...validUser,
  enabled: false,
};

export const passwordChangeMock = {
  params: {
    token: 'test-token',
    password: 'new-password',
  },
  tokenData,
  cases: {
    validUser,
    expiredResetTokenUser,
    tokenNotEqualUser,
    disabledUser,
  },
};
