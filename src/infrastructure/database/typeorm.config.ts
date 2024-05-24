import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppConfig } from '../../config/interfaces/app-config';
import { EEnvironmentVars } from '../../config/enums/environment-vars.enum';

const BASE_PATH = 'dist/infrastructure/database/';

export const getTypeOrmModuleOptions = (
  config: ConfigService<AppConfig>,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get(EEnvironmentVars.DATABASE_HOST),
  port: config.get(EEnvironmentVars.DATABASE_PORT),
  username: config.get(EEnvironmentVars.DATABASE_USER),
  password: config.get(EEnvironmentVars.DATABASE_PASS),
  database: config.get(EEnvironmentVars.DATABASE_NAME),
  entities: [`${BASE_PATH}entities/*.entity.js`],
  migrations: [`${BASE_PATH}migrations/*.js`],
  autoLoadEntities: true,
  synchronize: true,
});
