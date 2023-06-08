import { Module } from '@nestjs/common';
import { LoginUseCase } from './usecases/login.usecase';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { LogoutUseCase } from './usecases/logout.usecase';

@Module({
  imports: [InfrastructureModule],
  providers: [LoginUseCase, LogoutUseCase],
  exports: [LoginUseCase, LogoutUseCase],
})
export class AuthModule {}
