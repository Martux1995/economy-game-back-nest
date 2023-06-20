import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../../../domain/repositories';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async logout(sessionId: string) {
    await this.sessionRepository.deleteSession(sessionId);
  }
}
