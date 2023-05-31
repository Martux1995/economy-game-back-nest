import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigService as AppConfigService } from '../../domain/services';

@Injectable()
export class ConfigServiceImp extends AppConfigService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASS');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
