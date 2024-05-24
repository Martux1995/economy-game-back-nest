import { User } from '../models';
import { GetUserParams } from './params';

export interface UserRepository {
  getUser(params: GetUserParams): Promise<User>;

  setPassResetToken(userId: string, token: string, expire: Date): Promise<void>;
  setPassHash(userId: string, passHash: string): Promise<void>;
  removePassResetToken(userId: string): Promise<void>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
