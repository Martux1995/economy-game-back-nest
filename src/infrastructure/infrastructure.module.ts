import { Module } from '@nestjs/common';
import { MailerModule } from './mailer/mailer.module';
import { DatabaseModule } from './database/database.module';
import { LibrariesModule } from './libraries/libraries.module';

@Module({
  imports: [DatabaseModule, MailerModule, LibrariesModule],
  exports: [DatabaseModule, MailerModule, LibrariesModule],
})
export class InfrastructureModule {}
