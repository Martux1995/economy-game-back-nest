import { Test } from '@nestjs/testing';
import { EmailService, EnvService } from '../../domain/services';
import { EmailServiceImp } from './email.service';
import * as nodemailer from 'nodemailer';
import { SendMailParams } from '../../domain/types';

jest.mock('nodemailer');

describe('EmailService', () => {
  let service: EmailService;
  let envService: EnvService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: EmailService,
          useClass: EmailServiceImp,
        },
        {
          provide: EnvService,
          useValue: {
            getSMTPServer: jest.fn(),
            getSMTPPort: jest.fn(),
            getSMTPUserName: jest.fn(),
            getSMTPUserMail: jest.fn(),
            getSMTPUserPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    envService = module.get<EnvService>(EnvService);

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
    const params = {
      to: 'asd@asd.com',
      cc: 'otro@asd.com',
      bcc: 'otroculto@asd.com',
      subject: 'Testing Mail',
      content: {
        html: '<p>{{algo}}</p>',
        params: { algo: 'asd' },
      },
    };

    const getSMTPServerSpyOn = jest
      .spyOn(envService, 'getSMTPServer')
      .mockReturnValue('asd');
    const getSMTPPortSpyOn = jest
      .spyOn(envService, 'getSMTPPort')
      .mockReturnValue(10);
    const getSMTPUserNameSpyOn = jest
      .spyOn(envService, 'getSMTPUserName')
      .mockReturnValue('asd');
    const getSMTPUserMailSpyOn = jest
      .spyOn(envService, 'getSMTPUserMail')
      .mockReturnValue('asd');
    const getSMTPUserPasswordSpyOn = jest
      .spyOn(envService, 'getSMTPUserPassword')
      .mockReturnValue('asd');

    await service.sendmail(params);

    expect(getSMTPServerSpyOn).toBeCalled();
    expect(getSMTPPortSpyOn).toBeCalled();
    expect(getSMTPUserNameSpyOn).toBeCalled();
    expect(getSMTPUserMailSpyOn).toBeCalledTimes(2);
    expect(getSMTPUserPasswordSpyOn).toBeCalled();
  });

  it('should send a plain email', async () => {
    const params = {
      to: 'asd@asd.com',
      cc: 'otro@asd.com',
      bcc: 'otroculto@asd.com',
      subject: 'Testing Mail',
      content: 'content text',
    };

    const getSMTPServerSpyOn = jest
      .spyOn(envService, 'getSMTPServer')
      .mockReturnValue('asd');
    const getSMTPPortSpyOn = jest
      .spyOn(envService, 'getSMTPPort')
      .mockReturnValue(10);
    const getSMTPUserNameSpyOn = jest
      .spyOn(envService, 'getSMTPUserName')
      .mockReturnValue('asd');
    const getSMTPUserMailSpyOn = jest
      .spyOn(envService, 'getSMTPUserMail')
      .mockReturnValue('asd');
    const getSMTPUserPasswordSpyOn = jest
      .spyOn(envService, 'getSMTPUserPassword')
      .mockReturnValue('asd');

    await service.sendmail(params);

    expect(getSMTPServerSpyOn).toBeCalled();
    expect(getSMTPPortSpyOn).toBeCalled();
    expect(getSMTPUserNameSpyOn).toBeCalled();
    expect(getSMTPUserMailSpyOn).toBeCalledTimes(2);
    expect(getSMTPUserPasswordSpyOn).toBeCalled();
  });

  it('should send an email with attachments', async () => {
    const params: SendMailParams = {
      to: 'asd@asd.com',
      cc: 'otro@asd.com',
      bcc: 'otroculto@asd.com',
      subject: 'Testing Mail',
      content: 'content text',
      attachments: [{ filename: 'text.txt', content: 'ajajjajaj' }],
    };

    const getSMTPServerSpyOn = jest
      .spyOn(envService, 'getSMTPServer')
      .mockReturnValue('asd');
    const getSMTPPortSpyOn = jest
      .spyOn(envService, 'getSMTPPort')
      .mockReturnValue(10);
    const getSMTPUserNameSpyOn = jest
      .spyOn(envService, 'getSMTPUserName')
      .mockReturnValue('asd');
    const getSMTPUserMailSpyOn = jest
      .spyOn(envService, 'getSMTPUserMail')
      .mockReturnValue('asd');
    const getSMTPUserPasswordSpyOn = jest
      .spyOn(envService, 'getSMTPUserPassword')
      .mockReturnValue('asd');

    await service.sendmail(params);

    expect(getSMTPServerSpyOn).toBeCalled();
    expect(getSMTPPortSpyOn).toBeCalled();
    expect(getSMTPUserNameSpyOn).toBeCalled();
    expect(getSMTPUserMailSpyOn).toBeCalledTimes(2);
    expect(getSMTPUserPasswordSpyOn).toBeCalled();
  });
});
