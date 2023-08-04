import { Test } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AUTH_CONTROLLER_MOCKS } from './auth-controller.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
            checkToken: jest.fn(),
            renewToken: jest.fn(),
            requestPasswordRecovery: jest.fn(),
            changePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should can login', async () => {
    const { params, expected } = AUTH_CONTROLLER_MOCKS.login;

    const loginSpyOn = jest.spyOn(service, 'login').mockResolvedValue(expected);

    const result = await controller.login(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(loginSpyOn).toBeCalledWith(params);
  });

  it('should can logout', async () => {
    const { params, expected } = AUTH_CONTROLLER_MOCKS.logout;

    const logoutSpyOn = jest
      .spyOn(service, 'logout')
      .mockResolvedValue(expected);

    const result = await controller.logout(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(logoutSpyOn).toBeCalledWith(params.sessionKey);
  });

  it('should check token', () => {
    const { expected } = AUTH_CONTROLLER_MOCKS.checkToken;

    const checkTokenSpyOn = jest
      .spyOn(service, 'checkToken')
      .mockReturnValue(expected);

    const result = controller.checkToken();

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(checkTokenSpyOn).toBeCalledWith();
  });

  it('should renew token', async () => {
    const { params, expected } = AUTH_CONTROLLER_MOCKS.renewToken;

    const renewTokenSpyOn = jest
      .spyOn(service, 'renewToken')
      .mockResolvedValue(expected);

    const result = await controller.newToken(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(renewTokenSpyOn).toBeCalledWith(params.userId, params.sessionKey);
  });

  it('should request a password recovery token', async () => {
    const { params, expected } = AUTH_CONTROLLER_MOCKS.requestPasswordRecovery;

    const requestPassRecoverySpyOn = jest
      .spyOn(service, 'requestPasswordRecovery')
      .mockResolvedValue(expected);

    const result = await controller.passTokenRequest(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(requestPassRecoverySpyOn).toBeCalledWith(params);
  });

  it('should change password', async () => {
    const { params, expected } = AUTH_CONTROLLER_MOCKS.changePassword;

    const changePasswordSpyOn = jest
      .spyOn(service, 'changePassword')
      .mockResolvedValue(expected);

    const result = await controller.changePassword(params);

    expect(result).toBeDefined();
    expect(result).toEqual(expected);
    expect(changePasswordSpyOn).toBeCalledWith(params);
  });
});
