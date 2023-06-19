import { Injectable } from '@nestjs/common';

import { TokenService } from '../../../domain/services';
import { AuthRepository } from '../../../domain/repositories';

import { generateRandomUUID } from '../../common/helpers/uuid';

import {
  SessionExpiredException,
  SessionNotFoundException,
} from '../exceptions';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async renewToken(userId: number, oldKey: string) {
    await this._getSession(userId, oldKey);

    const newKey = generateRandomUUID();
    const token = this.tokenService.sign({
      userId,
      key: newKey,
    });

    await this.authRepository.registerSessionData(userId, newKey);
    await this.authRepository.removeSessionData(userId, oldKey);

    return token;
  }

  private async _getSession(userId: number, oldKey: string) {
    const session = await this.authRepository.getSessionData(userId, oldKey);

    if (!session) {
      throw new SessionNotFoundException('Session not found');
    }

    if (session.expiredDate < new Date()) {
      throw new SessionExpiredException('Session expired. Please login again.');
    }
  }
}
