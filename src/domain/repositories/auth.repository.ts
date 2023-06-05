import { User } from '../entities';

export abstract class AuthRepository {
  abstract getUserDataByEmail(email: string): User;
  abstract getUserDataByPersonalNumber(pNumber: string): User;
  abstract registerToken(userId: number, token: string, key: string): void;
}
