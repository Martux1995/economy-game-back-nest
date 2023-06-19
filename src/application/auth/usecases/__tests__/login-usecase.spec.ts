import { Test } from '@nestjs/testing';

import { TokenService } from '../../../../domain/services';
import { AuthRepository } from '../../../../domain/repositories';

import * as runHelpers from '../../../common/helpers/run';
import * as uuidHelpers from '../../../common/helpers/uuid';
import * as passwordHelpers from '../../../common/helpers/password';

import { LoginNotFoundException } from '../../exceptions';

import { LoginUseCase } from '../login.usecase';

import { loginUseCaseMock } from './login-usecase.mock';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let authRepo: AuthRepository;
  let tokenService: TokenService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: AuthRepository,
          useFactory: () => ({
            registerSessionData: jest.fn(),
            getUserDataByEmail: jest.fn(),
            getUserDataByPersonalNumber: jest.fn(),
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

    useCase = module.get<LoginUseCase>(LoginUseCase);
    authRepo = module.get<AuthRepository>(AuthRepository);
    tokenService = module.get<TokenService>(TokenService);
  });

  beforeEach(() => {
    expect(module).toBeDefined();
    jest.resetAllMocks();
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
    jest
      .spyOn(uuidHelpers, 'generateRandomUUID')
      .mockReturnValue('random-uuid');
  });

  const { user } = loginUseCaseMock;
  describe('Login with email', () => {
    const { correct, wrongEmail, wrongPass } = loginUseCaseMock.email;

    it('should return a token if the the user email and his password are valid', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(true);
      const getUserDataByEmailSpyOn = jest
        .spyOn(authRepo, 'getUserDataByEmail')
        .mockResolvedValue(user);
      const registerSessionDataSpyOn = jest.spyOn(
        authRepo,
        'registerSessionData',
      );

      const result = await useCase.login(correct);

      expect(result).toBeDefined();
      expect(result).toEqual('random-token');
      expect(getUserDataByEmailSpyOn).toBeCalledWith(correct.email);
      expect(registerSessionDataSpyOn).toBeCalledWith(
        user.userId,
        'random-uuid',
      );
    });

    it('should throw an error if the user email exists but the password is wrong', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(false);
      const getUserDataByEmailSpyOn = jest
        .spyOn(authRepo, 'getUserDataByEmail')
        .mockResolvedValue(user);

      await expect(async () => useCase.login(wrongPass)).rejects.toThrow(
        LoginNotFoundException,
      );
      expect(getUserDataByEmailSpyOn).toBeCalledWith(wrongPass.email);
    });

    it('should throw an error if the user email does not exists', async () => {
      const getUserDataByEmailSpyOn = jest
        .spyOn(authRepo, 'getUserDataByEmail')
        .mockResolvedValue(null);

      await expect(async () => useCase.login(wrongEmail)).rejects.toThrow(
        LoginNotFoundException,
      );
      expect(getUserDataByEmailSpyOn).toBeCalledWith(wrongEmail.email);
    });
  });

  describe('Login with personal ID', () => {
    const { correct, wrongPersonalId, wrongPass } = loginUseCaseMock.personalId;
    it('should return a token if the the user personal ID and its password are valid', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(true);
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(correct.personalNumber.replace('.', ''));
      const getUserDataByPersonalNumberSpyOn = jest
        .spyOn(authRepo, 'getUserDataByPersonalNumber')
        .mockResolvedValue(user);
      const registerSessionDataSpyOn = jest.spyOn(
        authRepo,
        'registerSessionData',
      );

      const result = await useCase.login(correct);

      expect(result).toBeDefined();
      expect(result).toEqual('random-token');
      expect(getUserDataByPersonalNumberSpyOn).toBeCalledWith(
        correct.personalNumber.replace('.', ''),
      );
      expect(registerSessionDataSpyOn).toBeCalledWith(
        user.userId,
        'random-uuid',
      );
    });

    it('should throw an error if the user personal ID exists but the password is wrong', async () => {
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(wrongPass.personalNumber.replace('.', ''));
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(false);
      const getUserDataByPersonalNumberSpyOn = jest
        .spyOn(authRepo, 'getUserDataByPersonalNumber')
        .mockResolvedValue(user);

      await expect(async () => useCase.login(wrongPass)).rejects.toThrow(
        LoginNotFoundException,
      );
      expect(getUserDataByPersonalNumberSpyOn).toBeCalledWith(
        wrongPass.personalNumber.replace('.', ''),
      );
    });

    it('should throw an error if the user personal ID does not exists', async () => {
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(wrongPersonalId.personalNumber.replace('.', ''));
      const getUserDataByPersonalNumberSpyOn = jest
        .spyOn(authRepo, 'getUserDataByPersonalNumber')
        .mockResolvedValue(null);

      await expect(async () => useCase.login(wrongPersonalId)).rejects.toThrow(
        LoginNotFoundException,
      );
      expect(getUserDataByPersonalNumberSpyOn).toBeCalledWith(
        wrongPersonalId.personalNumber.replace('.', ''),
      );
    });
  });

  describe('Login without email or personal ID', () => {
    jest.spyOn(runHelpers, 'formatRUN').mockReturnValue(null);
    const { none } = loginUseCaseMock;
    it('should throw an error if no email or personal ID are present', async () => {
      await expect(async () => useCase.login(none)).rejects.toThrow(
        LoginNotFoundException,
      );
    });
  });
});
