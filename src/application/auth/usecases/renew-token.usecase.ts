import { add } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { TokenService } from '../../../domain/services';
import { SessionRepository } from '../../../domain/repositories';

import {
  SessionExpiredException,
  SessionNotFoundException,
} from '../exceptions';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly tokenService: TokenService,
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
      throw new SessionNotFoundException('Session not found');
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
