import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from '../../config/interfaces/app-config';
import { EEnvironmentVars } from '../../config/enums/environment-vars.enum';
import { SendMailAttachParam, SendMailParams } from './params/sendmail.params';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  async sendmail(data: SendMailParams): Promise<void> {
    const userName = this.configService.get(EEnvironmentVars.SMTP_USER_NAME);
    const userMail = this.configService.get(EEnvironmentVars.SMTP_USER_MAIL);

    const transporter = this._createTransport();

    await transporter.sendMail({
      from: `${userName} <${userMail}>`,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      sender: userMail,
      attachments: this._setAttachtments(data.attachments),
      ...data.content,
    });
  }

  private _createTransport() {
    return createTransport({
      host: this.configService.get(EEnvironmentVars.SMTP_SERVER),
      port: this.configService.get(EEnvironmentVars.SMTP_PORT),
      secure: true,
      auth: {
        user: this.configService.get(EEnvironmentVars.SMTP_USER_MAIL),
        pass: this.configService.get(EEnvironmentVars.SMTP_USER_PASS),
      },
    });
  }

  private _setAttachtments(attachs: SendMailAttachParam[]): Mail.Attachment[] {
    return (
      attachs &&
      attachs.map((att) => ({
        content: att.content,
        filename: att.filename,
      }))
    );
  }
}
