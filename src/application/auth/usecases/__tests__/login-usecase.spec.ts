import { Test } from '@nestjs/testing';

import { TokenService } from '../../../../domain/services';
import {
  UserRepository,
  SessionRepository,
} from '../../../../domain/repositories';

import * as runHelpers from '../../../common/helpers/run';
import * as passwordHelpers from '../../../common/helpers/password';

import { LoginNotFoundException } from '../../exceptions';

import { LoginUseCase } from '../login.usecase';

import { loginUseCaseMock } from './login-usecase.mock';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepo: UserRepository;
  let sessionRepo: SessionRepository;
  let tokenService: TokenService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: UserRepository,
          useFactory: () => ({
            removePassResetToken: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserByPersonalNumber: jest.fn(),
          }),
        },
        {
          provide: SessionRepository,
          useFactory: () => ({ createSession: jest.fn() }),
        },
        {
          provide: TokenService,
          useFactory: () => ({ sign: jest.fn() }),
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    userRepo = module.get<UserRepository>(UserRepository);
    sessionRepo = module.get<SessionRepository>(SessionRepository);
    tokenService = module.get<TokenService>(TokenService);
  });

  beforeEach(() => {
    expect(module).toBeDefined();
    jest.resetAllMocks();
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
  });

  const { user, session } = loginUseCaseMock;
  describe('Login with email', () => {
    const { correct, wrongEmail, wrongPass } = loginUseCaseMock.email;

    it('should return a token if the the user email and his password are valid', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(true);
      const getUserDataByEmailSpyOn = jest
        .spyOn(userRepo, 'getUserByEmail')
        .mockResolvedValue(user);
      const removePassResetTokenSpyOn = jest.spyOn(
        userRepo,
        'removePassResetToken',
      );
      const registerSessionDataSpyOn = jest
        .spyOn(sessionRepo, 'createSession')
        .mockResolvedValue(session);

      const result = await useCase.login(correct);

      expect(result).toBeDefined();
      expect(result).toEqual('random-token');
      expect(getUserDataByEmailSpyOn).toBeCalledWith(correct.email);
      expect(removePassResetTokenSpyOn).toBeCalledWith(user.userId);
      expect(registerSessionDataSpyOn).toBeCalledWith(
        user.userId,
        expect.any(Date),
      );
    });

    it('should throw an error if the user email exists but the password is wrong', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(false);
      const getUserDataByEmailSpyOn = jest
        .spyOn(userRepo, 'getUserByEmail')
        .mockResolvedValue(user);

      await expect(async () => useCase.login(wrongPass)).rejects.toThrow(
        LoginNotFoundException,
      );
      expect(getUserDataByEmailSpyOn).toBeCalledWith(wrongPass.email);
    });

    it('should throw an error if the user email does not exists', async () => {
      const getUserDataByEmailSpyOn = jest
        .spyOn(userRepo, 'getUserByEmail')
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
        .spyOn(userRepo, 'getUserByPersonalNumber')
        .mockResolvedValue(user);
      const removePassResetTokenSpyOn = jest.spyOn(
        userRepo,
        'removePassResetToken',
      );
      const registerSessionDataSpyOn = jest
        .spyOn(sessionRepo, 'createSession')
        .mockResolvedValue(session);

      const result = await useCase.login(correct);

      expect(result).toBeDefined();
      expect(result).toEqual('random-token');
      expect(getUserDataByPersonalNumberSpyOn).toBeCalledWith(
        correct.personalNumber.replace('.', ''),
      );
      expect(removePassResetTokenSpyOn).toBeCalledWith(user.userId);
      expect(registerSessionDataSpyOn).toBeCalledWith(
        user.userId,
        expect.any(Date),
      );
    });

    it('should throw an error if the user personal ID exists but the password is wrong', async () => {
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(wrongPass.personalNumber.replace('.', ''));
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(false);
      const getUserDataByPersonalNumberSpyOn = jest
        .spyOn(userRepo, 'getUserByPersonalNumber')
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
        .spyOn(userRepo, 'getUserByPersonalNumber')
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
