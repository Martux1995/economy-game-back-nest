import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginUseCase } from '../../../application/auth/usecases/login.usecase';
import { LogoutUseCase } from '../../../application/auth/usecases/logout.usecase';
import { RenewTokenUseCase } from '../../../application/auth/usecases/renew-token.usecase';

import { LoginDto } from './dtos/Login.dto';
import { AppResponse } from '../../common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, personalNumberId } = loginDto;
    if (!email && !personalNumberId) {
      throw new BadRequestException(
        'You must provide an email or personal number',
      );
    }
    const token = await this.loginUseCase.login({
      email: loginDto.email,
      personalNumber: loginDto.personalNumberId,
      password: loginDto.password,
    });

    return {
      ok: true,
      msg: 'Login successful',
      token,
    };
  }

  async logout(userId: number, key: string): Promise<AppResponse> {
    await this.logoutUseCase.logout(userId, key);

    return {
      ok: true,
      msg: 'Logged Off',
    };
  }

  checkToken(): AppResponse {
    return {
      ok: true,
      msg: 'Valid Token',
    };
  }

  async renewToken(
    userId: number,
    oldKey: string,
  ): Promise<AppResponse<{ token: string }>> {
    const token = await this.renewTokenUseCase.renewToken(userId, oldKey);

    return {
      ok: true,
      msg: 'Token renewed',
      token,
    };
  }
}
