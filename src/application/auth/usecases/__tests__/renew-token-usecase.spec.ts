import { Test } from '@nestjs/testing';
import { AuthRepository } from '../../../../domain/repositories';
import { TokenService } from '../../../../domain/services';

import * as uuidHelpers from '../../../common/helpers/uuid';

import { RenewTokenUseCase } from '../renew-token.usecase';
import { renewTokenUseCaseMock } from './renew-token-usecase.mock';
import {
  SessionExpiredException,
  SessionNotFoundException,
} from '../../exceptions';

describe('RenewTokenUseCase', () => {
  let useCase: RenewTokenUseCase;
  let repo: AuthRepository;
  let tokenService: TokenService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RenewTokenUseCase,
        {
          provide: AuthRepository,
          useFactory: () => ({
            getSessionData: jest.fn(),
            registerSessionData: jest.fn(),
            removeSessionData: jest.fn(),
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
    repo = module.get<AuthRepository>(AuthRepository);
    tokenService = module.get<TokenService>(TokenService);
  });

  beforeAll(() => {
    expect(module).toBeDefined();
    jest.resetAllMocks();
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
    jest.spyOn(uuidHelpers, 'generateRandomUUID').mockReturnValue('random-key');
  });

  const { sessionData, expiredSessionData, renewData } = renewTokenUseCaseMock;

  it('should remove the old token and return a new token with the ID and key given', async () => {
    const { userId, oldKey } = renewData;

    const getSessionDataSpyOn = jest
      .spyOn(repo, 'getSessionData')
      .mockResolvedValue(sessionData);
    const registerSessionDataSpyOn = jest.spyOn(repo, 'registerSessionData');
    const removeSessionDataSpyOn = jest.spyOn(repo, 'removeSessionData');

    const result = await useCase.renewToken(userId, oldKey);

    expect(result).toBeDefined();
    expect(result).toEqual('random-token');
    expect(getSessionDataSpyOn).toBeCalledWith(userId, oldKey);
    expect(registerSessionDataSpyOn).toBeCalledWith(userId, 'random-key');
    expect(removeSessionDataSpyOn).toBeCalledWith(userId, oldKey);
  });

  it('should thrown an error if the session expired', async () => {
    const { userId, oldKey } = renewData;

    const getSessionDataSpyOn = jest
      .spyOn(repo, 'getSessionData')
      .mockResolvedValue(expiredSessionData);

    await expect(async () =>
      useCase.renewToken(userId, oldKey),
    ).rejects.toThrow(SessionExpiredException);
    expect(getSessionDataSpyOn).toBeCalledWith(userId, oldKey);
  });

  it('should thrown an error if session not found in the DB', async () => {
    const { userId, oldKey } = renewData;

    const getSessionDataSpyOn = jest
      .spyOn(repo, 'getSessionData')
      .mockResolvedValue(null);

    await expect(async () =>
      useCase.renewToken(userId, oldKey),
    ).rejects.toThrow(SessionNotFoundException);
    expect(getSessionDataSpyOn).toBeCalledWith(userId, oldKey);
  });
});
