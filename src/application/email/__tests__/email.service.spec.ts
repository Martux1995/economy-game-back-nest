import { Test } from '@nestjs/testing';

import { MailerService } from '../../../infrastructure/mailer/mailer.service';

import { EmailService } from '../email.service';
import { RecoverPassMailParams } from '../params';
import { CreateRecoverPassMailUseCase } from '../usecases';
import {
  RECOVER_PASS_MOCK_RETURN,
  RECOVER_PASS_PARAMS,
} from './email.service.mock';

describe('#EmailService', () => {
  let service: EmailService;
  let mailer: MailerService;
  let createRecoverPass: CreateRecoverPassMailUseCase;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendmail: jest.fn(),
          },
        },
        {
          provide: CreateRecoverPassMailUseCase,
          useValue: {
            generate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailer = module.get<MailerService>(MailerService);
    createRecoverPass = module.get<CreateRecoverPassMailUseCase>(
      CreateRecoverPassMailUseCase,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a recovery password email', async () => {
    const params: RecoverPassMailParams = RECOVER_PASS_PARAMS;

    jest
      .spyOn(createRecoverPass, 'generate')
      .mockImplementation((fnParams: RecoverPassMailParams) => {
        expect(fnParams).toBeDefined();
        expect(fnParams).toHaveProperty('toAddress', params.toAddress);
        expect(fnParams).toHaveProperty('timeToExpire', params.timeToExpire);
        expect(fnParams).toHaveProperty('playerName', params.playerName);
        expect(fnParams).toHaveProperty('token', params.token);

        return RECOVER_PASS_MOCK_RETURN;
      });

    const mailerSpy = jest.spyOn(mailer, 'sendmail').mockResolvedValue();

    expect(() => service.sendRecoverPasswordMail(params)).not.toThrowError();
    expect(mailerSpy).toHaveBeenCalled();
  });
});
