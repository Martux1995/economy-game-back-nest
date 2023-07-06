import { Test } from '@nestjs/testing';

import { UserRepository } from '../../../../domain/repositories';
import { TokenService } from '../../../../domain/services';

import * as passwordHelpers from '../../../common/helpers/password';

import { PasswordChangeUseCase } from '../password-change.usecase';
import { passwordChangeMock } from './password-change-usecase.mock';
import {
  PassRecoverCodeMismatchException,
  PassRecoverTokenExpireException,
  PassRecoverTokenInvalidException,
  UserDisabledException,
} from '../../exceptions';

describe('PasswordChangeUseCase', () => {
  let useCase: PasswordChangeUseCase;
  let userRepo: UserRepository;
  let tokenService: TokenService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PasswordChangeUseCase,
        {
          provide: UserRepository,
          useFactory: () => ({
            setPassHash: jest.fn(),
            removePassResetToken: jest.fn(),
            getUserById: jest.fn(),
          }),
        },
        {
          provide: TokenService,
          useFactory: () => ({
            verify: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<PasswordChangeUseCase>(PasswordChangeUseCase);
    userRepo = module.get<UserRepository>(UserRepository);
    tokenService = module.get<TokenService>(TokenService);
  });

  beforeAll(() => {
    jest
      .spyOn(passwordHelpers, 'hashPassword')
      .mockReturnValue('test-password');
    expect(useCase).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  const { params, tokenData, cases } = passwordChangeMock;

  it('should change the user password without errors', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(tokenData);
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserById')
      .mockResolvedValue(cases.validUser);
    const setPassHashSpyOn = jest.spyOn(userRepo, 'setPassHash');
    const removePassTokenSpyOn = jest.spyOn(userRepo, 'removePassResetToken');

    await expect(
      useCase.changePassword(params.token, params.password),
    ).resolves.not.toThrowError();

    expect(getUserSpyOn).toBeCalledWith(tokenData.userId);
    expect(setPassHashSpyOn).toBeCalledWith(tokenData.userId, 'test-password');
    expect(removePassTokenSpyOn).toBeCalledWith(tokenData.userId);
  });

  it('should throw an error if the passResetToken has expired', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(tokenData);
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserById')
      .mockResolvedValue(cases.expiredResetTokenUser);

    await expect(
      useCase.changePassword(params.token, params.password),
    ).rejects.toThrow(PassRecoverTokenExpireException);

    expect(getUserSpyOn).toBeCalledWith(tokenData.userId);
  });

  it('should throw an error if the passResetToken is not the same', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(tokenData);
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserById')
      .mockResolvedValue(cases.tokenNotEqualUser);

    await expect(
      useCase.changePassword(params.token, params.password),
    ).rejects.toThrow(PassRecoverCodeMismatchException);

    expect(getUserSpyOn).toBeCalledWith(tokenData.userId);
  });

  it('should throw an error if user is disabled', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(tokenData);
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserById')
      .mockResolvedValue(cases.disabledUser);

    await expect(
      useCase.changePassword(params.token, params.password),
    ).rejects.toThrow(UserDisabledException);

    expect(getUserSpyOn).toBeCalledWith(tokenData.userId);
  });

  it('should throw an error if user not exists', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(tokenData);
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUserById')
      .mockResolvedValue(null);

    await expect(
      useCase.changePassword(params.token, params.password),
    ).rejects.toThrow(PassRecoverTokenInvalidException);

    expect(getUserSpyOn).toBeCalledWith(tokenData.userId);
  });

  it('should throw an error if token is invalid', async () => {
    jest.spyOn(tokenService, 'verify').mockReturnValue(null);

    await expect(
      useCase.changePassword(params.token, params.password),
    ).rejects.toThrow(PassRecoverTokenInvalidException);
  });
});
