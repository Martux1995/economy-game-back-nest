import { Module } from '@nestjs/common';
import { LibrariesModule } from './libraries/libraries.module';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [DatabaseModule, EmailModule, LibrariesModule],
  exports: [DatabaseModule, EmailModule, LibrariesModule],
})
export class InfrastructureModule {}
