import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmModuleOptions } from './typeorm.config';
import { LibrariesModule } from '../libraries/libraries.module';

import * as ENTITIES from './entities';

import { AuthRepository } from '../../domain/repositories';
import { AuthRepositoryImp } from './repositories';
import { EnvService } from '../../domain/services';

const REPOSITORIES: Provider[] = [
  {
    provide: AuthRepository,
    useClass: AuthRepositoryImp,
  },
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
