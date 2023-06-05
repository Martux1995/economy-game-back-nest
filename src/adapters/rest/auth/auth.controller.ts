import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';

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
}
