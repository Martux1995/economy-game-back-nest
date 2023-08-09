import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SessionRepository } from '../../../domain/repositories';

import { SessionEntity } from '../entities';

@Injectable()
export class SessionRepositoryImp extends SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {
    super();
  }

  async getSession(sessionId: string, userId: string): Promise<SessionEntity> {
    return this.sessionRepository.findOne({
      relations: { user: true },
      where: {
        user: { userId },
        sessionId,
      },
    });
  }

  async createSession(
    userId: string,
    expiredDate: Date,
  ): Promise<SessionEntity> {
    return this.sessionRepository.save({
      user: { userId },
      expiredDate,
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.sessionRepository.delete({
      sessionId,
    });
  }

  async deleteAllUserSessions(
    userId: string,
    exceptionSessionId?: string,
  ): Promise<void> {
    await this.sessionRepository.delete({
      user: { userId },
      sessionId: exceptionSessionId && Not(exceptionSessionId),
    });
  }
}
