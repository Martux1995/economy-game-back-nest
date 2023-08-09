import { Reflector } from '@nestjs/core';
import { IsUserGuard } from './is-user.guard';
import { ExecutionContext } from '@nestjs/common';
import { IS_USER_GUARD_MOCKS } from './is-user-guard.mock';

describe('IsUserGuard', () => {
  let guard: IsUserGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    reflector = new Reflector();
    guard = new IsUserGuard(reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if user is valid', () => {
    const { context, reflectorMock } = IS_USER_GUARD_MOCKS;

    jest.spyOn(reflector, 'get').mockReturnValue(reflectorMock);

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });

  it('should throw an error if user is not defined', () => {
    const { noUserContext, reflectorMock } = IS_USER_GUARD_MOCKS;

    jest.spyOn(reflector, 'get').mockReturnValue(reflectorMock);

    try {
      guard.canActivate(noUserContext as unknown as ExecutionContext);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toContain('User Not Found');
      return;
    }
    throw new Error();
  });

  it('should return true if no roles are required', () => {
    const { context } = IS_USER_GUARD_MOCKS;

    jest.spyOn(reflector, 'get').mockReturnValue([]);

    const result = guard.canActivate(context as unknown as ExecutionContext);

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });
});
