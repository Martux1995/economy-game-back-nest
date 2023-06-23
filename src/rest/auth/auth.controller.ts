import { Body, Controller, Post } from '@nestjs/common';

import { UserSessionData } from '../../domain/types';

import { Auth, GetUser } from '../common/decorators';

import { AuthService } from './auth.service';
import { LoginDto, ChangePasswordDto, PassTokenRequestDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth()
  @Post('logout')
  logout(@GetUser() user: UserSessionData) {
    return this.authService.logout(user.sessionKey);
  }

  @Auth()
  @Post('token')
  checkToken() {
    return this.authService.checkToken();
  }

  @Auth()
  @Post('token/renew')
  newToken(@GetUser() user: UserSessionData) {
    return this.authService.renewToken(user.userId, user.sessionKey);
  }

  @Post('password/recover')
  passTokenRequest(@Body() passTokenRequestDto: PassTokenRequestDto) {
    return this.authService.requestPasswordRecovery(passTokenRequestDto);
  }

  @Post('password/change')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
