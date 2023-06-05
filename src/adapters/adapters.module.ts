import { Module } from '@nestjs/common';
import { RESTModule } from './rest/rest.module';

@Module({
  imports: [RESTModule],
  exports: [RESTModule],
})
export class AdaptersModule {}
