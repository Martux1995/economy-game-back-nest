import { DataSource, Not } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SessionRepository } from '../../../domain/repositories';
import { SessionEntity } from '../entities';

@Injectable()
export class SessionRepositoryImp extends SessionRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async getSession(sessionId: string, userId: string): Promise<SessionEntity> {
    return this.dataSource.getRepository(SessionEntity).findOne({
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
    return this.dataSource
      .getRepository(SessionEntity)
      .create({
        user: { userId },
        expiredDate,
      })
      .save();
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.dataSource.getRepository(SessionEntity).delete({
      sessionId,
    });
  }

  async deleteAllUserSessions(
    userId: string,
    exceptionSessionId?: string,
  ): Promise<void> {
    await this.dataSource.getRepository(SessionEntity).delete({
      user: { userId },
      sessionId: exceptionSessionId && Not(exceptionSessionId),
    });
  }
}
