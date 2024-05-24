import { Test } from '@nestjs/testing';

import { TokenService, TOKEN_SERVICE } from '../../../../domain/services';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../../domain/repositories';

import { EmailService } from '../../../../application/email/email.service';
import { RecoverPassMailParams } from '../../../../application/email/params';

import * as UUIDHelper from '../../../common/helpers/uuid';

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
  let emailService: EmailService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PasswordTokenRequestUseCase,
        {
          provide: USER_REPOSITORY,
          useFactory: () => ({
            setPassResetToken: jest.fn(),
            getUser: jest.fn(),
          }),
        },
        {
          provide: TOKEN_SERVICE,
          useFactory: () => ({
            sign: jest.fn(),
          }),
        },
        {
          provide: EmailService,
          useValue: {
            sendRecoverPasswordMail: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<PasswordTokenRequestUseCase>(
      PasswordTokenRequestUseCase,
    );
    userRepo = module.get<UserRepository>(USER_REPOSITORY);
    tokenService = module.get<TokenService>(TOKEN_SERVICE);
    emailService = module.get<EmailService>(EmailService);
  });

  beforeEach(() => {
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
    jest.spyOn(UUIDHelper, 'generateRandomUUID').mockReturnValue('random-uuid');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  const { email, validUser, userDisabled, userWithToken } =
    passwordRequestTokenMock;

  it('should generate a recover token and send an email', async () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUser')
      .mockResolvedValue(validUser);

    const setPassResetTokenSpyOn = jest.spyOn(userRepo, 'setPassResetToken');

    jest
      .spyOn(emailService, 'sendRecoverPasswordMail')
      .mockImplementation(async (params: RecoverPassMailParams) => {
        expect(params).toBeDefined();
        expect(params).toHaveProperty('toAddress', email);
        expect(params).toHaveProperty(
          'playerName',
          `${validUser.firstName} ${validUser.lastName}`,
        );
        expect(params).toHaveProperty('timeToExpire', '10 minutos');
        expect(params).toHaveProperty('token', expect.anything());
        return;
      });

    await useCase.getToken(email);

    expect(getUserSpyOn).toBeCalledWith({ email });
    expect(setPassResetTokenSpyOn).toBeCalledWith(
      validUser.userId,
      'random-uuid',
      expect.anything(),
    );
  });

  it('should thrown an error if the user has another request available', async () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUser')
      .mockResolvedValue(userWithToken);

    try {
      await useCase.getToken(email);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e).toEqual(new PassRecoverTokenActiveException());
      expect(getUserSpyOn).toBeCalledWith({ email });
      return;
    }
    throw new Error();
  });

  it('should thrown an error if the user is disabled', async () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUser')
      .mockResolvedValue(userDisabled);

    try {
      await useCase.getToken(email);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e).toEqual(new UserDisabledException());
      expect(getUserSpyOn).toBeCalledWith({ email });
      return;
    }
    throw new Error();
  });

  it('should thrown an error if the user does not exists', async () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUser')
      .mockResolvedValue(null);

    try {
      await useCase.getToken(email);
    } catch (e) {
      expect(e).toBeDefined();
      expect(e).toEqual(new UserNotFoundException());
      expect(getUserSpyOn).toBeCalledWith({ email });
      return;
    }
    throw new Error();
  });
});
