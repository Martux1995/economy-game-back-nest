import { Injectable } from '@nestjs/common';

import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { LogoutUseCase } from '../../../application/auth/usecases/logout.usecase';
import { RenewTokenUseCase } from '../../../application/auth/usecases/renew-token.usecase';

import { LoginDto } from './dtos/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
  ) {}

  async login(loginDto: LoginDto) {
    return this.loginUseCase.login({
      email: loginDto.email,
      personalNumber: loginDto.personalNumberId,
      password: loginDto.password,
    });
  }

  async logout(userId: number, key: string) {
    return this.logoutUseCase.logout(userId, key);
  }

  async renewToken(userId: number, oldKey: string) {
    return this.renewTokenUseCase.renewToken(userId, oldKey);
  }
}
