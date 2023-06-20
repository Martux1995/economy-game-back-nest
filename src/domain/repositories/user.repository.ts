import { User } from '../entities';

export abstract class UserRepository {
  abstract getUserById(userId: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
  abstract getUserByPersonalNumber(personalNumberId: string): Promise<User>;

  abstract setPassResetToken(
    userId: string,
    passCode: string,
    expire: Date,
  ): Promise<void>;
  abstract setPassHash(userId: string, passHash: string): Promise<void>;
  abstract removePassResetToken(userId: string): Promise<void>;
}
