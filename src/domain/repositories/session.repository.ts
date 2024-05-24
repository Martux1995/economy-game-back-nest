import { Session } from '../models';

export interface SessionRepository {
  getSession(sessionId: string, userId: string): Promise<Session>;
  createSession(userId: string, expiredDate: Date): Promise<Session>;
  deleteSession(sessionId: string): Promise<void>;

  deleteAllUserSessions(
    userId: string,
    exceptionSessionId?: string,
  ): Promise<void>;
}

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');
