import { Module } from '@nestjs/common';
import { RESTModule } from './rest/rest.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, RESTModule],
  exports: [RESTModule],
})
export class AdaptersModule {}
