import { TokenData } from '../types/token-data';

export abstract class TokenService {
  abstract sign(payload: TokenData): string;
  abstract verify(token: string): TokenData;
}
