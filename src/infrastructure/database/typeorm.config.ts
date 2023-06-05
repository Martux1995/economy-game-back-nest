import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigServiceImp } from '../libraries/config.service';

export const getTypeOrmModuleOptions = (
  config: ConfigServiceImp,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  autoLoadEntities: true,
});
