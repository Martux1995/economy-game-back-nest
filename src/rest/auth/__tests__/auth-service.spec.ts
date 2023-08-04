import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { LogoutUseCase } from '../../../application/auth/usecases/logout.usecase';
import { RenewTokenUseCase } from '../../../application/auth/usecases/renew-token.usecase';
import { PasswordTokenRequestUseCase } from '../../../application/auth/usecases/password-token-request.usecase';
import { PasswordChangeUseCase } from '../../../application/auth/usecases/password-change.usecase';
import { AUTH_SERVICE_MOCKS } from './auth-service.mock';

describe('AuthService', () => {
  let service: AuthService;
  let loginUseCase: LoginUseCase;
  let logoutUseCase: LogoutUseCase;
  let renewTokenUseCase: RenewTokenUseCase;
  let passwordTokenRequestUseCase: PasswordTokenRequestUseCase;
  let passwordChangeUseCase: PasswordChangeUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: LoginUseCase,
          useValue: { login: jest.fn() },
        },
        {
          provide: LogoutUseCase,
          useValue: { logout: jest.fn() },
        },
        {
          provide: RenewTokenUseCase,
          useValue: { renewToken: jest.fn() },
        },
        {
          provide: PasswordTokenRequestUseCase,
          useValue: { getToken: jest.fn() },
        },
        {
          provide: PasswordChangeUseCase,
          useValue: { changePassword: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    logoutUseCase = module.get<LogoutUseCase>(LogoutUseCase);
    renewTokenUseCase = module.get<RenewTokenUseCase>(RenewTokenUseCase);
    passwordTokenRequestUseCase = module.get<PasswordTokenRequestUseCase>(
      PasswordTokenRequestUseCase,
    );
    passwordChangeUseCase = module.get<PasswordChangeUseCase>(
      PasswordChangeUseCase,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#login', () => {
    const { params, expected } = AUTH_SERVICE_MOCKS.login;
    it('should login', async () => {
      const loginSpyOn = jest
        .spyOn(loginUseCase, 'login')
        .mockResolvedValue(expected.token);

      const result = await service.login(params);

      expect(result).toBeDefined();
      expect(result).toEqual(expected);
      expect(loginSpyOn).toBeCalledWith(params);
    });

    it('should throw an error if email or personal number is missing', async () => {
      try {
        await service.login({
          password: params.password,
        });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain(
          'You must provide an email or personal number',
        );
        return;
      }
      throw new Error();
    });
  });

  it('should logout', async () => {
    const { params, expected } = AUTH_SERVICE_MOCKS.logout;

    const logoutSpyOn = jest.spyOn(logoutUseCase, 'logout');

    const result = await service.logout(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(logoutSpyOn).toBeCalledWith(params);
  });

  it('should check token', () => {
    const { expected } = AUTH_SERVICE_MOCKS.checkToken;

    const result = service.checkToken();

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
  });

  it('should renew token', async () => {
    const { params, expected } = AUTH_SERVICE_MOCKS.renewToken;

    const renewTokenSpyOn = jest
      .spyOn(renewTokenUseCase, 'renewToken')
      .mockResolvedValue(expected.token);

    const result = await service.renewToken(params.userId, params.sessionKey);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(renewTokenSpyOn).toBeCalledWith(params.userId, params.sessionKey);
  });

  it('should request password recovery', async () => {
    const { params, expected } = AUTH_SERVICE_MOCKS.requestPasswordRecovery;

    const getTokenSpyOn = jest.spyOn(passwordTokenRequestUseCase, 'getToken');

    const result = await service.requestPasswordRecovery(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(getTokenSpyOn).toBeCalledWith(params.email);
  });

  it('should change password', async () => {
    const { params, expected } = AUTH_SERVICE_MOCKS.changePassword;

    const changePasswordSpyOn = jest.spyOn(
      passwordChangeUseCase,
      'changePassword',
    );

    const result = await service.changePassword(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(changePasswordSpyOn).toBeCalledWith(params.key, params.newPassword);
  });
});
