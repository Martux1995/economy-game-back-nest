import { Module } from '@nestjs/common';
import { LibrariesModule } from './libraries/libraries.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, LibrariesModule],
  exports: [DatabaseModule, LibrariesModule],
})
export class InfrastructureModule {}
