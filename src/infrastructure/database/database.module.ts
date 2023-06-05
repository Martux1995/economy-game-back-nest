import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmModuleOptions } from './typeorm.config';
import { LibrariesModule } from '../libraries/libraries.module';
import { ConfigService } from '../../domain/services';

import * as ENTITIES from './entities';

import { AuthRepository } from '../../domain/repositories';
import { AuthRepositoryImp } from './repositories';

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
      inject: [ConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
    TypeOrmModule.forFeature(Object.values(ENTITIES)),
  ],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class DatabaseModule {}
