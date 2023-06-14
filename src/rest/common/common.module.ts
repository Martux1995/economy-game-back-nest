import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    InfrastructureModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class CommonModule {}
