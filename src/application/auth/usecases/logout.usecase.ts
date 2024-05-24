import { Inject, Injectable } from '@nestjs/common';
import {
  SESSION_REPOSITORY,
  SessionRepository,
} from '../../../domain/repositories';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
  ) {}

  async logout(sessionId: string) {
    await this.sessionRepository.deleteSession(sessionId);
  }
}
