import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../../domain/repositories';

import { JwtStrategy } from './jwt.strategy';
import { JWT_STRATEGY_MOCK } from './jwt-strategy.mock';

describe('JWTStrategy', () => {
  let strategy: JwtStrategy;
  let sessionRepository: SessionRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: SESSION_REPOSITORY,
          useValue: { getSession: jest.fn() },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(JWT_STRATEGY_MOCK.CONFIG_SERVICE_MOCK),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    sessionRepository = module.get<SessionRepository>(SESSION_REPOSITORY);
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
