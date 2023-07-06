import { Test } from '@nestjs/testing';

import * as UUIDHelper from '../../../common/helpers/uuid';
import { TokenService } from '../../../../domain/services';
import { UserRepository } from '../../../../domain/repositories';

import {
  PassRecoverTokenActiveException,
  UserDisabledException,
  UserNotFoundException,
} from '../../exceptions';

import { PasswordTokenRequestUseCase } from '../password-token-request.usecase';

import { passwordRequestTokenMock } from './password-token-request-usecase.mock';

describe('PasswordTokenRequestUseCase', () => {
  let useCase: PasswordTokenRequestUseCase;
  let userRepo: UserRepository;
  let tokenService: TokenService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PasswordTokenRequestUseCase,
        {
          provide: UserRepository,
          useFactory: () => ({
            setPassResetToken: jest.fn(),
            getUserByEmail: jest.fn(),
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

    useCase = module.get<PasswordTokenRequestUseCase>(
      PasswordTokenRequestUseCase,
    );
    userRepo = module.get<UserRepository>(UserRepository);
    tokenService = module.get<TokenService>(TokenService);

    jest.spyOn(UUIDHelper, 'generateRandomUUID').mockReturnValue('random-uuid');
  });

  beforeEach(() => {
    expect(useCase).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  const { email, validUser, userDisabled, userWithToken } =
    passwordRequestTokenMock;

  it('should generate a recover token', async () => {
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserByEmail')
      .mockResolvedValue(validUser);
    const setPassResetTokenSpyOn = jest.spyOn(userRepo, 'setPassResetToken');

    const result = await useCase.getToken(email);

    expect(result).toBeDefined();
    expect(result).toEqual('random-token');
    expect(getUserSpyOn).toBeCalledWith(email);
    expect(setPassResetTokenSpyOn).toBeCalledWith(
      validUser.userId,
      'random-uuid',
      expect.anything(),
    );
  });

  it('should thrown an error if the user has another request available', () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserByEmail')
      .mockResolvedValue(userWithToken);

    expect(() => useCase.getToken(email)).rejects.toThrowError(
      PassRecoverTokenActiveException,
    );
    expect(getUserSpyOn).toBeCalledWith(email);
  });

  it('should thrown an error if the user is disabled', () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserByEmail')
      .mockResolvedValue(userDisabled);

    expect(() => useCase.getToken(email)).rejects.toThrowError(
      UserDisabledException,
    );
    expect(getUserSpyOn).toBeCalledWith(email);
  });

  it('should thrown an error if the user does not exists', () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserByEmail')
      .mockResolvedValue(null);

    expect(() => useCase.getToken(email)).rejects.toThrowError(
      UserNotFoundException,
    );
    expect(getUserSpyOn).toBeCalledWith(email);
  });
});
