import { Injectable } from '@nestjs/common';

import { MailerService } from '../../infrastructure/mailer/mailer.service';

import { CreateRecoverPassMailUseCase } from './usecases';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly createRecoverPassEmailUseCase: CreateRecoverPassMailUseCase,
  ) {}

  async sendRecoverPasswordMail(to: string, params: any) {
    const mail = this.createRecoverPassEmailUseCase.generate(to, params);

    await this.mailerService.sendmail(mail);
  }
}
