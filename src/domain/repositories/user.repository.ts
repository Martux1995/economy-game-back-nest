import { User } from '../entities';
import { GetUserParams } from './params';

export abstract class UserRepository {
  abstract getUser(params: GetUserParams): Promise<User>;

  abstract setPassResetToken(
    userId: string,
    token: string,
    expire: Date,
  ): Promise<void>;
  abstract setPassHash(userId: string, passHash: string): Promise<void>;
  abstract removePassResetToken(userId: string): Promise<void>;
}
