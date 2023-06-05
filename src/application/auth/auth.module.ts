import { Module } from '@nestjs/common';
import { LoginUseCase } from './usecases/login.usecase';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [LoginUseCase],
  exports: [LoginUseCase],
})
export class AuthModule {}
