import { EUserRoles } from '../../../domain/enums';
import { UserSessionData } from '../../../domain/types';
import { AppRequest } from '../types';

const user: UserSessionData = {
  firstName: 'asd',
  lastName: 'sss',
  role: EUserRoles.Admin,
  sessionKey: 'ajajaj',
  userId: 'uid',
};

const context = {
  getHandler: jest.fn(),
  switchToHttp: jest.fn(() => ({
    getRequest: jest.fn(
      (): AppRequest => ({
        user,
      }),
    ),
  })),
};

const noUserContext = {
  getHandler: jest.fn(),
  switchToHttp: jest.fn(() => ({
    getRequest: jest.fn(
      (): AppRequest => ({
        user: undefined,
      }),
    ),
  })),
};

const reflectorMock = [EUserRoles.Admin, EUserRoles.User];

export const IS_USER_GUARD_MOCKS = {
  context,
  noUserContext,
  reflectorMock,
};
