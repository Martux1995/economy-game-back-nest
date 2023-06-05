import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { LoginDto } from './dtos/Login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(loginDto: LoginDto) {
    return this.loginUseCase.login({
      email: loginDto.email,
      personalNumber: loginDto.personalNumberId,
      password: loginDto.password,
    });
  }
}
