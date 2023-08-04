import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from '../../domain/services';

export const getTypeOrmModuleOptions = (
  config: EnvService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  autoLoadEntities: true,
});
