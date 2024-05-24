import { Injectable } from '@nestjs/common';

import { MailerService } from '../../infrastructure/mailer/mailer.service';

import { CreateRecoverPassMailUseCase } from './usecases';
import { RecoverPassMailParams } from './params';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly createRecoverPassEmailUseCase: CreateRecoverPassMailUseCase,
  ) {}

  async sendRecoverPasswordMail(params: RecoverPassMailParams) {
    const mail = this.createRecoverPassEmailUseCase.generate(params);

    await this.mailerService.sendmail(mail);
  }
}
