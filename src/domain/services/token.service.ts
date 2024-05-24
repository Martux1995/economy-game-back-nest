import { TokenData } from '../types';

export interface TokenService {
  TOKEN_EXPIRE: number;

  sign(payload: TokenData): string;
  verify(token: string): TokenData | null;
}

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');
