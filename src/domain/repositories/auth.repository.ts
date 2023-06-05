import { User } from '../entities';

export abstract class AuthRepository {
  abstract getUserDataByEmail(email: string): Promise<User>;
  abstract getUserDataByPersonalNumber(pNumber: string): Promise<User>;
  abstract registerToken(userId: number, key: string): Promise<void>;
}
