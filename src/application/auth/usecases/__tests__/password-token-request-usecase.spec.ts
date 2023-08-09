import { Test } from '@nestjs/testing';

import {
  EnvService,
  TokenService,
  EmailService,
  FileSystemService,
} from '../../../../domain/services';
import { EFileType } from '../../../../domain/enums';
import { UserRepository } from '../../../../domain/repositories';

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
  let envService: EnvService;
  let userRepo: UserRepository;
  let tokenService: TokenService;
  let emailService: EmailService;
  let fileSystemService: FileSystemService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PasswordTokenRequestUseCase,
        {
          provide: UserRepository,
          useFactory: () => ({
            setPassResetToken: jest.fn(),
            getUser: jest.fn(),
          }),
        },
        {
          provide: TokenService,
          useFactory: () => ({
            sign: jest.fn(),
          }),
        },
        {
          provide: EnvService,
          useFactory: () => ({
            getFrontDomain: jest.fn(),
          }),
        },
        {
          provide: EmailService,
          useFactory: () => ({
            sendmail: jest.fn(),
          }),
        },
        {
          provide: FileSystemService,
          useFactory: () => ({
            getTextFile: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<PasswordTokenRequestUseCase>(
      PasswordTokenRequestUseCase,
    );
    userRepo = module.get<UserRepository>(UserRepository);
    envService = module.get<EnvService>(EnvService);
    tokenService = module.get<TokenService>(TokenService);
    emailService = module.get<EmailService>(EmailService);
    fileSystemService = module.get<FileSystemService>(FileSystemService);
  });

  beforeEach(() => {
    jest.spyOn(tokenService, 'sign').mockReturnValue('random-token');
    jest.spyOn(envService, 'getFrontDomain').mockReturnValue('local');
    jest.spyOn(UUIDHelper, 'generateRandomUUID').mockReturnValue('random-uuid');
    expect(useCase).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(tokenService).toBeDefined();
  });

  const { email, validUser, userDisabled, userWithToken, sendMailMock } =
    passwordRequestTokenMock;

  it('should generate a recover token', async () => {
    const getUserSpyOn = jest
      .spyOn(userRepo, 'getUser')
      .mockResolvedValue(validUser);
    const setPassResetTokenSpyOn = jest.spyOn(userRepo, 'setPassResetToken');
    const getFileSpyOn = jest
      .spyOn(fileSystemService, 'getTextFile')
      .mockReturnValue('file-content');
    const sendMailSpyOn = jest
      .spyOn(emailService, 'sendmail')
      .mockResolvedValue();

    await useCase.getToken(email);
    expect(getUserSpyOn).toBeCalledWith({ email });
    expect(setPassResetTokenSpyOn).toBeCalledWith(
      validUser.userId,
      'random-uuid',
      expect.anything(),
    );
    expect(getFileSpyOn).toBeCalledWith(
      'recover-password.html',
      EFileType.EmailTemplate,
    );
    expect(sendMailSpyOn).toBeCalledWith(
      sendMailMock(validUser, 'file-content', 'local', 'random-token'),
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
