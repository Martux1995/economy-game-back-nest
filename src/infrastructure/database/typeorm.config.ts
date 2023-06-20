import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvServiceImp } from '../libraries/env.service';

export const getTypeOrmModuleOptions = (
  config: EnvServiceImp,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  autoLoadEntities: true,
});
