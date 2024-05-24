import { add } from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';
import { TokenService, TOKEN_SERVICE } from '../../../domain/services';

import {
  SessionRepository,
  SESSION_REPOSITORY,
} from '../../../domain/repositories';

import {
  SessionExpiredException,
  SessionNotFoundException,
} from '../exceptions';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async renewToken(userId: string, oldSessionId: string) {
    await this._getSession(userId, oldSessionId);

    await this.sessionRepository.deleteSession(oldSessionId);

    return this._generateSession(userId);
  }

  private async _getSession(userId: string, sessionId: string) {
    const session = await this.sessionRepository.getSession(sessionId, userId);

    if (!session) {
      throw new SessionNotFoundException('Session not found.');
    }

    if (session.expiredDate < new Date()) {
      throw new SessionExpiredException('Session expired. Please login again.');
    }
  }

  private async _generateSession(userId: string) {
    const expireDate = add(new Date(), { hours: 12 });
    const { sessionId } = await this.sessionRepository.createSession(
      userId,
      expireDate,
    );
    return this.tokenService.sign({ userId, key: sessionId });
  }
}
