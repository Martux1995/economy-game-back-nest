import { Test } from '@nestjs/testing';

import { TOKEN_SERVICE, TokenService } from '../../../../domain/services';
import {
  UserRepository,
  SessionRepository,
  USER_REPOSITORY,
  SESSION_REPOSITORY,
} from '../../../../domain/repositories';

import * as runHelpers from '../../../common/helpers/run';
import * as passwordHelpers from '../../../common/helpers/password';

import { LoginUseCase } from '../login.usecase';

import { loginUseCaseMock } from './login-usecase.mock';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let userRepo: UserRepository;
  let sessionRepo: SessionRepository;
  let tokenService: TokenService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: USER_REPOSITORY,
          useFactory: () => ({
            removePassResetToken: jest.fn(),
            getUser: jest.fn(),
          }),
        },
        {
          provide: SESSION_REPOSITORY,
          useFactory: () => ({ createSession: jest.fn() }),
        },
        {
          provide: TOKEN_SERVICE,
          useFactory: () => ({ sign: jest.fn() }),
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
    userRepo = module.get<UserRepository>(USER_REPOSITORY);
    sessionRepo = module.get<SessionRepository>(SESSION_REPOSITORY);
    tokenService = module.get<TokenService>(TOKEN_SERVICE);

    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(sessionRepo).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  const { user, session } = loginUseCaseMock;
  describe('Login with email', () => {
    const { correct, wrongEmail, wrongPass } = loginUseCaseMock.email;

    it('should return a token if the the user email and his password are valid', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(true);
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
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
      expect(getUserSpyOn).toBeCalledWith({
        email: correct.email,
        personalNumberId: null,
      });
      expect(removePassResetTokenSpyOn).toBeCalledWith(user.userId);
      expect(registerSessionDataSpyOn).toBeCalledWith(
        user.userId,
        expect.any(Date),
      );
    });

    it('should throw an error if the user email exists but the password is wrong', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(false);
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
        .mockResolvedValue(user);

      try {
        await useCase.login(wrongPass);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain('Los datos ingresados son incorrectos');
        expect(getUserSpyOn).toBeCalledWith({
          email: wrongPass.email,
          personalNumberId: null,
        });
        return;
      }
      throw new Error();
    });

    it('should throw an error if the user email does not exists', async () => {
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
        .mockResolvedValue(null);

      try {
        await useCase.login(wrongEmail);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain('Los datos ingresados son incorrectos');
        expect(getUserSpyOn).toBeCalledWith({
          email: wrongEmail.email,
          personalNumberId: null,
        });
        return;
      }
      throw new Error();
    });
  });

  describe('Login with personal ID', () => {
    const { correct, wrongPersonalId, wrongPass } = loginUseCaseMock.personalId;
    it('should return a token if the the user personal ID and its password are valid', async () => {
      jest.spyOn(passwordHelpers, 'comparePassword').mockReturnValue(true);
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(correct.personalNumber.replace('.', ''));
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
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
      expect(getUserSpyOn).toBeCalledWith({
        email: undefined,
        personalNumberId: correct.personalNumber.replace('.', ''),
      });
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
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
        .mockResolvedValue(user);

      try {
        await useCase.login(wrongPass);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain('Los datos ingresados son incorrectos');
        expect(getUserSpyOn).toBeCalledWith({
          email: undefined,
          personalNumberId: wrongPass.personalNumber.replace('.', ''),
        });
        return;
      }
      throw new Error();
    });

    it('should throw an error if the user personal ID does not exists', async () => {
      jest
        .spyOn(runHelpers, 'formatRUN')
        .mockReturnValue(wrongPersonalId.personalNumber.replace('.', ''));
      const getUserSpyOn = jest
        .spyOn(userRepo, 'getUser')
        .mockResolvedValue(null);

      try {
        await useCase.login(wrongPersonalId);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain('Los datos ingresados son incorrectos');
        expect(getUserSpyOn).toBeCalledWith({
          email: undefined,
          personalNumberId: wrongPersonalId.personalNumber.replace('.', ''),
        });
        return;
      }
      throw new Error();
    });
  });

  describe('Login without email or personal ID', () => {
    jest.spyOn(runHelpers, 'formatRUN').mockReturnValue(null);
    const { none } = loginUseCaseMock;
    it('should throw an error if no email or personal ID are present', async () => {
      try {
        await useCase.login(none);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain('Los datos ingresados son incorrectos');
        return;
      }
      throw new Error();
    });
  });
});
