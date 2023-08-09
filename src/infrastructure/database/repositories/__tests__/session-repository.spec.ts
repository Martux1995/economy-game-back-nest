import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOptionsWhere, Not, Repository } from 'typeorm';

import { SessionEntity } from '../../entities';

import { SessionRepositoryImp } from '../session.repository';
import { SESSION_REPOSITORY_MOCKS } from './session-repository.mock';

describe('SessionRepository', () => {
  let repository: SessionRepositoryImp;
  let dbRepository: Repository<SessionEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SessionRepositoryImp,
        {
          provide: getRepositoryToken(SessionEntity),
          useValue: {
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<SessionRepositoryImp>(SessionRepositoryImp);
    dbRepository = module.get<Repository<SessionEntity>>(
      getRepositoryToken(SessionEntity),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(dbRepository).toBeDefined();
  });

  it('should return a session', async () => {
    const { params, expected } = SESSION_REPOSITORY_MOCKS.getSession;

    jest.spyOn(dbRepository, 'findOne').mockImplementation(async (options) => {
      expect(options).toBeDefined();
      expect(options).toHaveProperty('relations');
      expect(options.relations).toHaveProperty('user', true);
      expect(options).toHaveProperty('where');
      expect(options.where).toHaveProperty('sessionId', params.sessionId);
      expect(options.where).toHaveProperty('user', { userId: params.userId });
      return expected;
    });

    const result = await repository.getSession(params.sessionId, params.userId);

    expect(result).toBeDefined();
    expect(result).toBe(expected);
  });

  it('should create a session', async () => {
    const { params, expected } = SESSION_REPOSITORY_MOCKS.createSession;

    jest.spyOn(dbRepository, 'save').mockImplementation(async (options) => {
      expect(options).toBeDefined();
      expect(options).toHaveProperty('user');
      expect(options.user).toHaveProperty('userId', params.userId);
      expect(options).toHaveProperty('expiredDate', params.expiredDate);
      return expected;
    });

    const result = await repository.createSession(
      params.userId,
      params.expiredDate,
    );

    expect(result).toBeDefined();
    expect(result).toBe(expected);
  });

  it('should delete a session', async () => {
    const { params } = SESSION_REPOSITORY_MOCKS.deleteSession;

    jest.spyOn(dbRepository, 'delete').mockImplementation(async (options) => {
      expect(options).toBeDefined();
      expect(options).toHaveProperty('sessionId', params.sessionId);
      return null;
    });

    await repository.deleteSession(params.sessionId);
  });

  it('should delete all user sessions but not given sessionId', async () => {
    const { params } = SESSION_REPOSITORY_MOCKS.deleteAllUserSessions;

    jest
      .spyOn(dbRepository, 'delete')
      .mockImplementation(async (options: FindOptionsWhere<SessionEntity>) => {
        expect(options).toBeDefined();
        expect(options).toHaveProperty('user');
        expect(options.user).toHaveProperty('userId', params.userId);
        expect(options).toHaveProperty('sessionId', Not(params.sessionId));
        return null;
      });

    await repository.deleteAllUserSessions(params.userId, params.sessionId);
  });
});
