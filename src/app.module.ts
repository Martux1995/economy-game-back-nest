import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AdaptersModule } from './adapters/adapters.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [InfrastructureModule, ApplicationModule, AdaptersModule],
})
export class AppModule {}
