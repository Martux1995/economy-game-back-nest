import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';

import * as ENTITIES from './entities';
import { getTypeOrmModuleOptions } from './typeorm.config';
import { SessionRepositoryImp, UserRepositoryImp } from './repositories';

import { AppConfigModule } from '../../config/app-config.module';
import { SESSION_REPOSITORY, USER_REPOSITORY } from '../../domain/repositories';

const REPOSITORIES: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepositoryImp },
  { provide: SESSION_REPOSITORY, useClass: SessionRepositoryImp },
];

@Module({
  imports: [
    /* Configuración TypeORM */
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Object.values(ENTITIES)),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}
