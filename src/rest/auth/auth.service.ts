import { BadRequestException, Injectable } from '@nestjs/common';

import { LoginUseCase } from '../../application/auth/usecases/login.usecase';
import { LogoutUseCase } from '../../application/auth/usecases/logout.usecase';
import { RenewTokenUseCase } from '../../application/auth/usecases/renew-token.usecase';
import { PasswordChangeUseCase } from '../../application/auth/usecases/password-change.usecase';
import { PasswordTokenRequestUseCase } from '../../application/auth/usecases/password-token-request.usecase';

import { AppResponse } from '../common/types';
import { LoginDto } from './dtos/login.dto';
import { ChangePasswordDto, PassTokenRequestDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly renewTokenUseCase: RenewTokenUseCase,
    private readonly passwordTokenRequestUseCase: PasswordTokenRequestUseCase,
    private readonly passwordChangeUseCase: PasswordChangeUseCase,
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

  async logout(sessionId: string): Promise<AppResponse> {
    await this.logoutUseCase.logout(sessionId);

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
    userId: string,
    oldSessionId: string,
  ): Promise<AppResponse<{ token: string }>> {
    const token = await this.renewTokenUseCase.renewToken(userId, oldSessionId);

    return {
      ok: true,
      msg: 'Token renewed',
      token,
    };
  }

  async requestPasswordRecovery(
    passTokenRequestDto: PassTokenRequestDto,
  ): Promise<AppResponse<any>> {
    const { email } = passTokenRequestDto;

    await this.passwordTokenRequestUseCase.getToken(email);

    return {
      ok: true,
      msg: 'Password change requested successfully. Check your email.',
    };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<AppResponse> {
    const { key, newPassword } = changePasswordDto;

    await this.passwordChangeUseCase.changePassword(key, newPassword);

    return {
      ok: true,
      msg: 'Password changed successfully. Please LogIn again.',
    };
  }
}
