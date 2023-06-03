import JWT from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { TokenData } from '../../domain/types/token-data';
import { ConfigService, TokenService } from '../../domain/services';

@Injectable()
export class TokenServiceImp extends TokenService {
  constructor(private readonly envConfigService: ConfigService) {
    super();
  }

  sign(payload: TokenData): string {
    return JWT.sign(payload, this.envConfigService.getJwtSecret(), {
      expiresIn: TokenService.TOKEN_EXPIRE,
    });
  }

  verify(token: string): TokenData {
    return JWT.verify(token, this.envConfigService.getJwtSecret()) as TokenData;
  }
}
