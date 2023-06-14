import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from '../application/auth/auth.module';

@Module({
  imports: [CommonModule, AuthModule],
  exports: [AuthModule],
})
export class RESTModule {}
