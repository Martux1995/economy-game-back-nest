import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvService } from '../../domain/services';

@Injectable()
export class EnvServiceImp extends EnvService {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  getDatabaseHost(): string {
    return this._checkVarExists<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this._checkVarExists<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this._checkVarExists<string>('DATABASE_USER');
  }

  getDatabasePassword(): string {
    return this._checkVarExists<string>('DATABASE_PASS');
  }

  getDatabaseName(): string {
    return this._checkVarExists<string>('DATABASE_NAME');
  }

  getJwtSecret(): string {
    return this._checkVarExists<string>('JWT_SECRET');
  }

  private _checkVarExists<T>(name: any): T {
    const envVar = this.configService.get<T>(name);
    if (!envVar) {
      throw Error(`No value setted for environment var '${name}'.`);
    }
    return envVar;
  }
}
