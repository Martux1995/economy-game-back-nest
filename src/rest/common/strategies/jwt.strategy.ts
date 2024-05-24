import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { Session } from '../../../domain/models';
import { EUserRoles } from '../../../domain/enums';
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../../domain/repositories';
import { UserSessionData, TokenData } from '../../../domain/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
    configService: EnvService,
  ) {
    super({
      secretOrKey: configService.getJwtSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: TokenData): Promise<UserSessionData> {
    const { userId, key } = payload;

    const session = await this.sessionRepository.getSession(key, userId);

    this._checkPermissions(session);

    return {
      userId: session.user.userId,
      sessionKey: session.sessionId,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      role: session.user.isAdmin ? EUserRoles.Admin : EUserRoles.User,
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
