import { Module } from '@nestjs/common';
import { RESTModule } from './rest/rest.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule, ApplicationModule, RESTModule],
})
export class AppModule {}
