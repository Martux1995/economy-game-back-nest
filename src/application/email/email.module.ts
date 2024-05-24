import { Module } from '@nestjs/common';

import { MailerModule } from '../../infrastructure/mailer/mailer.module';

import { EmailService } from './email.service';
import { CreateRecoverPassMailUseCase } from './usecases';

@Module({
  imports: [MailerModule],
  providers: [EmailService, CreateRecoverPassMailUseCase],
  exports: [EmailService],
})
export class EmailModule {}
