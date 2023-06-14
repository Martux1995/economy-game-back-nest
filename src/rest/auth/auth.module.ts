import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ApplicationModule } from '../../application/application.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule, ApplicationModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
