import { Module } from '@nestjs/common';
import { LibrariesModule } from './libraries/libraries.module';

@Module({
  imports: [LibrariesModule],
  exports: [LibrariesModule],
})
export class InfrastructureModule {}
