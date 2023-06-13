import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RenewTokenUseCase } from './usecases/renew-token.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [LoginUseCase, LogoutUseCase, RenewTokenUseCase],
  exports: [LoginUseCase, LogoutUseCase, RenewTokenUseCase],
})
export class AuthModule {}
