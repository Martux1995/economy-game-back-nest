import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Session } from '../../../domain/entities';
import { EnvService } from '../../../domain/services';
import { AuthRepository } from '../../../domain/repositories';
import { UserSessionData, TokenData } from '../../../domain/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authRepository: AuthRepository,
    configService: EnvService,
  ) {
    super({
      secretOrKey: configService.getJwtSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: TokenData): Promise<UserSessionData> {
    const { userId, key } = payload;

    const sessionData = await this.authRepository.getSessionData(userId, key);

    this._checkPermissions(sessionData);

    return {
      userId: sessionData.user.userId,
      sessionKey: sessionData.key,
      firstName: sessionData.user.person.firstName,
      lastName: sessionData.user.person.lastName,
      role: sessionData.user.isAdmin ? 'ADMIN' : 'USER',
    };
  }

  private _checkPermissions(session: Session) {
    if (!session) {
      throw new UnauthorizedException('Token not valid.');
    }

    if (!session.user.enabled) {
      throw new UnauthorizedException('User is inactive.');
    }
  }
}
