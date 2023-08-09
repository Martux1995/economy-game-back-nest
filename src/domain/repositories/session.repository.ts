import { Session } from '../models';

export abstract class SessionRepository {
  abstract getSession(sessionId: string, userId: string): Promise<Session>;
  abstract createSession(userId: string, expiredDate: Date): Promise<Session>;
  abstract deleteSession(sessionId: string): Promise<void>;

  abstract deleteAllUserSessions(
    userId: string,
    exceptionSessionId?: string,
  ): Promise<void>;
}
