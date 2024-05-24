import { add } from 'date-fns';
import { User } from '../../../../domain/models';

const validUser: User = {
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

const userWithToken: User = {
  userId: 'id01',
  firstName: 'testing',
  lastName: 'user',
  email: 'testing@mail-economy.com',
  personalNumberId: '11111111-1',
  passHash: 'dont care',
  passResetToken: 'ya-tengo-un-token-xd',
  passResetExpire: add(new Date(), { hours: 1 }),
  isAdmin: true,
  enabled: true,
  createdDate: new Date(),
  session: [],
};

const userDisabled: User = {
  userId: 'id01',
  firstName: 'testing',
  lastName: 'user',
  email: 'testing@mail-economy.com',
  personalNumberId: '11111111-1',
  passHash: 'dont care',
  passResetToken: null,
  passResetExpire: null,
  isAdmin: true,
  enabled: false,
  createdDate: new Date(),
  session: [],
};

// const sendMailMock = (
//   user: User,
//   html: string,
//   domain: string,
//   token: string,
// ): SendMailParams => ({
//   to: user.email,
//   subject: 'Reinicio de clave',
//   content: {
//     html,
//     params: {
//       playerName: `${user.firstName} ${user.lastName}`,
//       timeToExpire: '10 minutos',
//       recoverUrl: `${domain}recover-password?token=${token}`,
//     },
//   },
// });

export const passwordRequestTokenMock = {
  email: 'testing@mail-economy.com',
  //sendMailMock,
  validUser,
  userWithToken,
  userDisabled,
};
