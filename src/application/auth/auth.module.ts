import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { EmailModule } from '../email/email.module';

import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RenewTokenUseCase } from './usecases/renew-token.usecase';
import { PasswordChangeUseCase } from './usecases/password-change.usecase';
import { PasswordTokenRequestUseCase } from './usecases/password-token-request.usecase';

@Module({
  imports: [EmailModule, InfrastructureModule],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    RenewTokenUseCase,
    PasswordChangeUseCase,
    PasswordTokenRequestUseCase,
  ],
  exports: [
    LoginUseCase,
    LogoutUseCase,
    RenewTokenUseCase,
    PasswordChangeUseCase,
    PasswordTokenRequestUseCase,
  ],
})
export class AuthModule {}
