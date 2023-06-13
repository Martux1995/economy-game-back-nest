import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

import { UserSessionData } from '../../../domain/types';

import { AppResponse } from '../../common/types';
import { Auth, GetUser } from '../../common/decorators';

import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { LoginPresenter } from './presenters/login.presenter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<AppResponse<LoginPresenter>> {
    const { email, personalNumberId } = loginDto;
    if (!email && !personalNumberId) {
      throw new BadRequestException(
        'You must provide an email or personal number',
      );
    }

    const token = await this.authService.login(loginDto);

    return {
      ok: true,
      msg: 'Login successful',
      token,
    };
  }

  @Auth()
  @Post('logout')
  async logout(@GetUser() user: UserSessionData): Promise<AppResponse> {
    await this.authService.logout(user.userId, user.sessionKey);

    return {
      ok: true,
      msg: 'Logged Off',
    };
  }

  @Auth()
  @Post('token')
  checkToken(): AppResponse {
    return {
      ok: true,
      msg: 'Valid Token',
    };
  }

  @Auth()
  @Post('token/renew')
  async newToken(
    @GetUser() user: UserSessionData,
  ): Promise<AppResponse<{ token: string }>> {
    const token = await this.authService.renewToken(
      user.userId,
      user.sessionKey,
    );

    return {
      ok: true,
      msg: 'Token renewed',
      token,
    };
  }
}
