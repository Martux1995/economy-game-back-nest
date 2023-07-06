import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenData } from '../../domain/types/token-data';
import { EnvService, TokenService } from '../../domain/services';

@Injectable()
export class TokenServiceImp extends TokenService {
  constructor(
    private readonly envConfigService: EnvService,
    private jwtService: JwtService,
  ) {
    super();
  }

  sign(payload: TokenData): string {
    return this.jwtService.sign(payload, {
      secret: this.envConfigService.getJwtSecret(),
      expiresIn: TokenService.TOKEN_EXPIRE,
    });
  }

  verify(token: string): TokenData | null {
    try {
      return this.jwtService.verify<TokenData>(token, {
        secret: this.envConfigService.getJwtSecret(),
      });
    } catch (e) {
      return null;
    }
  }
}
