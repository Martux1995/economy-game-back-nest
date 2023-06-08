import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { IsUserGuard } from '../../common/guards/is-user.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SessionData } from '../../../domain/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    const { email, personalNumberId } = loginDto;
    if (!email && !personalNumberId) {
      throw new BadRequestException(
        'You must provide an email or personal number',
      );
    }

    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(IsUserGuard)
  logout(@GetUser() user: SessionData) {
    return this.authService.logout(user.userId, user.sessionKey);
  }

}
