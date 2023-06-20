import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmModuleOptions } from './typeorm.config';
import { LibrariesModule } from '../libraries/libraries.module';

import * as ENTITIES from './entities';

import { SessionRepository, UserRepository } from '../../domain/repositories';
import { SessionRepositoryImp, UserRepositoryImp } from './repositories';
import { EnvService } from '../../domain/services';

const REPOSITORIES: Provider[] = [
  { provide: UserRepository, useClass: UserRepositoryImp },
  { provide: SessionRepository, useClass: SessionRepositoryImp },
];

@Module({
  imports: [
    /* Configuración TypeORM */
    TypeOrmModule.forRootAsync({
      imports: [LibrariesModule],
      inject: [EnvService],
      useFactory: getTypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Object.values(ENTITIES)),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}
