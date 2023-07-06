import { TokenData } from '../types';

export abstract class TokenService {
  static TOKEN_EXPIRE = 30 * 60;

  abstract sign(payload: TokenData): string;
  abstract verify(token: string): TokenData | null;
}
