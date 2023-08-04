import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { SessionRepository } from '../../../domain/repositories';
import { EnvService } from '../../../domain/services';

import { JWT_STRATEGY_MOCK } from './jwt-strategy.mock';

describe('JWTStrategy', () => {
  let strategy: JwtStrategy;
  let sessionRepository: SessionRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: SessionRepository,
          useValue: { getSession: jest.fn() },
        },
        {
          provide: EnvService,
          useValue: { getJwtSecret: jest.fn(() => 'token') },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    sessionRepository = module.get<SessionRepository>(SessionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate token for admin user', async () => {
    const { params, adminSessionData, expectedAdmin } = JWT_STRATEGY_MOCK;

    const getSessionSpyOn = jest
      .spyOn(sessionRepository, 'getSession')
      .mockResolvedValue(adminSessionData);

    const result = await strategy.validate(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedAdmin);
    expect(getSessionSpyOn).toBeCalledWith(params.key, params.userId);
  });

  it('should validate token for common user', async () => {
    const { params, userSessionData, expectedUser } = JWT_STRATEGY_MOCK;

    const getSessionSpyOn = jest
      .spyOn(sessionRepository, 'getSession')
      .mockResolvedValue(userSessionData);

    const result = await strategy.validate(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expectedUser);
    expect(getSessionSpyOn).toBeCalledWith(params.key, params.userId);
  });

  it('should throw an error if the user is disabled', async () => {
    const { params, disabledSessionData } = JWT_STRATEGY_MOCK;

    const getSessionSpyOn = jest
      .spyOn(sessionRepository, 'getSession')
      .mockResolvedValue(disabledSessionData);

    try {
      await strategy.validate(params);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toEqual('User is inactive.');
      expect(getSessionSpyOn).toBeCalledWith(params.key, params.userId);
      return;
    }
    throw new Error();
  });

  it('should throw an error if the user not exists', async () => {
    const { params } = JWT_STRATEGY_MOCK;

    const getSessionSpyOn = jest
      .spyOn(sessionRepository, 'getSession')
      .mockResolvedValue(null);

    try {
      await strategy.validate(params);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toEqual('Token not valid.');
      expect(getSessionSpyOn).toBeCalledWith(params.key, params.userId);
      return;
    }
    throw new Error();
  });
});
