import { ExecutionContext } from '@nestjs/common';

import { User } from '../../../../domain/models';
import { getUserFromRequestFn } from '../get-user.decorator';

describe('GetUserDecorator', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('needs to get the user data', () => {
    const userData: User = {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      personalNumberId: '',
      passHash: '',
      passResetToken: '',
      passResetExpire: undefined,
      isAdmin: false,
      createdDate: undefined,
      enabled: false,
      session: [],
    };

    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: userData,
        }),
      }),
    } as ExecutionContext;

    const result = getUserFromRequestFn('', context);

    expect(result).toBeDefined();
    expect(result).toEqual(userData);
  });

  it('should throw an error if user data is not presented', () => {
    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: null,
        }),
      }),
    } as ExecutionContext;

    try {
      getUserFromRequestFn('', context);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toContain('User not found (Decorator error)');
      return;
    }
    throw new Error();
  });
});
