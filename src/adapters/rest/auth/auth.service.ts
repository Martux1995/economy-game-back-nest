import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { LoginDto } from './dtos/Login.dto';
import { LogoutUseCase } from '../../../application/auth/usecases/logout.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
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
}
