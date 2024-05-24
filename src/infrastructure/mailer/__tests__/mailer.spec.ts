import { Test } from '@nestjs/testing';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

import { MailerService } from '../mailer.service';
import {
  CONFIG_SERVICE_MOCK,
  MAIL_WITH_ATTACHMENTS,
  STANDARD_MAIL,
} from './mailer.mock';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MailerService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(CONFIG_SERVICE_MOCK),
          },
        },
      ],
    }).compile();

    service = module.get<MailerService>(MailerService);

    jest.spyOn(nodemailer, 'createTransport').mockReturnValue({
      sendMail: jest.fn(),
    } as unknown as nodemailer.Transporter);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an HTML email', async () => {
    const params = STANDARD_MAIL;

    expect(() => service.sendmail(params)).not.toThrowError();
  });

  it('should send an email with attachments', async () => {
    const params = MAIL_WITH_ATTACHMENTS;

    expect(() => service.sendmail(params)).not.toThrowError();
  });
});
