import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { TokenData } from '../../domain/types';
import { TokenService } from '../../domain/services';

import { AppConfig } from '../../config/interfaces/app-config';
import { EEnvironmentVars } from '../../config/enums/environment-vars.enum';

@Injectable()
export class TokenServiceImp implements TokenService {
  TOKEN_EXPIRE = 30 * 60;

  constructor(
    private readonly envConfigService: ConfigService<AppConfig>,
    private jwtService: JwtService,
  ) {}

  sign(payload: TokenData): string {
    return this.jwtService.sign(payload, {
      secret: this.envConfigService.get(EEnvironmentVars.JWT_SECRET),
      expiresIn: this.TOKEN_EXPIRE,
    });
  }

  verify(token: string): TokenData | null {
    try {
      return this.jwtService.verify<TokenData>(token, {
        secret: this.envConfigService.get(EEnvironmentVars.JWT_SECRET),
      });
    } catch (e) {
      return null;
    }
  }
}
