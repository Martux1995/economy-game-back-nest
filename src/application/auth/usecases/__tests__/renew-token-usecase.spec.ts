import { Test } from '@nestjs/testing';
import { SessionRepository } from '../../../../domain/repositories';
import { TokenService } from '../../../../domain/services';

import { RenewTokenUseCase } from '../renew-token.usecase';
import { renewTokenUseCaseMock } from './renew-token-usecase.mock';

describe('RenewTokenUseCase', () => {
  let useCase: RenewTokenUseCase;
  let repo: SessionRepository;
  let tokenService: TokenService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RenewTokenUseCase,
        {
          provide: SessionRepository,
          useFactory: () => ({
            deleteSession: jest.fn(),
            getSession: jest.fn(),
            createSession: jest.fn(),
          }),
        },
        {
          provide: TokenService,
          useFactory: () => ({
            sign: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<RenewTokenUseCase>(RenewTokenUseCase);
    repo = module.get<SessionRepository>(SessionRepository);
    tokenService = module.get<TokenService>(TokenService);
  });

  beforeAll(() => {
    expect(module).toBeDefined();
    jest.resetAllMocks();
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
  });

  const { sessionData, expiredSessionData, newSessionData, renewData } =
    renewTokenUseCaseMock;

  it('should remove the old token and return a new token with the ID and key given', async () => {
    const { userId, oldSessionId } = renewData;

    const getSessionSpyOn = jest
      .spyOn(repo, 'getSession')
      .mockResolvedValue(sessionData);
    const createSessionSpyOn = jest
      .spyOn(repo, 'createSession')
      .mockResolvedValue(newSessionData);
    const deleteSessionSpyOn = jest.spyOn(repo, 'deleteSession');

    const result = await useCase.renewToken(userId, oldSessionId);

    expect(result).toBeDefined();
    expect(result).toEqual('random-token');
    expect(getSessionSpyOn).toBeCalledWith(oldSessionId, userId);
    expect(deleteSessionSpyOn).toBeCalledWith(oldSessionId);
    expect(createSessionSpyOn).toBeCalledWith(userId, expect.any(Date));
  });

  it('should thrown an error if the session expired', async () => {
    const { userId, oldSessionId } = renewData;

    const getSessionSpyOn = jest
      .spyOn(repo, 'getSession')
      .mockResolvedValue(expiredSessionData);

    try {
      await useCase.renewToken(userId, oldSessionId);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toContain('Session expired. Please login again.');
      expect(getSessionSpyOn).toBeCalledWith(oldSessionId, userId);
      return;
    }
    throw new Error();
  });

  it('should thrown an error if session not found in the DB', async () => {
    const { userId, oldSessionId } = renewData;

    const getSessionSpyOn = jest
      .spyOn(repo, 'getSession')
      .mockResolvedValue(null);

    try {
      await useCase.renewToken(userId, oldSessionId);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e.message).toContain('Session not found.');
      expect(getSessionSpyOn).toBeCalledWith(oldSessionId, userId);
      return;
    }
    throw new Error();
  });
});
