import { Injectable } from '@nestjs/common';

import { AuthRepository } from '../../../domain/repositories';
import { TokenService } from '../../../domain/services';

import { generateRandomUUID } from '../../common/helpers/uuid';
import { SessionNotFoundException } from '../exceptions';

@Injectable()
export class RenewTokenUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async renewToken(userId: number, oldKey: string) {
    const session = await this.authRepository.getSessionData(userId, oldKey);

    if (!session) {
      throw new SessionNotFoundException('Session not found');
    }

    const newKey = generateRandomUUID();
    const token = this.tokenService.sign({
      userId,
      key: newKey,
    });

    await this.authRepository.registerSessionData(userId, newKey);
    await this.authRepository.removeSessionData(userId, oldKey);

    return token;
  }
}
