import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { AppConfigModule } from '../../config/app-config.module';

@Module({
  imports: [AppConfigModule],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
