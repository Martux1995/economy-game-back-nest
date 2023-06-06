import { Session, User } from '../entities';

export abstract class AuthRepository {
  abstract getUserDataById(userId: number): Promise<User>;
  abstract getUserDataByEmail(email: string): Promise<User>;
  abstract getUserDataByPersonalNumber(pNumber: string): Promise<User>;

  abstract getSessionData(userId: number, key: string): Promise<Session>;
  abstract registerSessionData(userId: number, key: string): Promise<void>;
  abstract removeSessionData(userId: number, key: string): Promise<void>;
}
