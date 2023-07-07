import Mail from 'nodemailer/lib/mailer';
import Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

import { EnvService, EmailService } from '../../domain/services';
import {
  SendMailAttachParam,
  SendMailHTMLContent,
  SendMailParams,
} from '../../domain/types';

@Injectable()
export class EmailServiceImp extends EmailService {
  constructor(private readonly envService: EnvService) {
    super();
  }

  async sendmail(data: SendMailParams): Promise<void> {
    const userName = this.envService.getSMTPUserName();
    const userMail = this.envService.getSMTPUserMail();

    const transporter = this._createTransport();

    await transporter.sendMail({
      from: `${userName} <${userMail}>`,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      sender: userMail,
      attachments: this._setAttachtments(data.attachments),
      ...this._setContent<any>(data.content),
    });
  }

  private _createTransport() {
    return createTransport({
      host: this.envService.getSMTPServer(),
      port: this.envService.getSMTPPort(),
      secure: true,
      auth: {
        user: this.envService.getSMTPUserMail(),
        pass: this.envService.getSMTPUserPassword(),
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

  private _setContent<T>(
    content: SendMailHTMLContent<T> | string,
  ): Mail.Options {
    if (typeof content === 'string') {
      return { text: content };
    } else {
      return {
        html: Handlebars.compile(content.html)(content.params),
      };
    }
  }
}
