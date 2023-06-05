import { Injectable } from '@nestjs/common';
import { LoginParams } from '../params';
import { AuthRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { LoginNotFoundException } from '../exceptions';
import { comparePassword } from '../../common/helpers/password';
import { TokenService } from '../../../domain/services';
import { generateRandomUUID } from '../../common/helpers/uuid';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  login(params: LoginParams) {
    const { email, personalNumber, password } = params;

    const userData: User = this._getUserData(email, personalNumber);

    if (!userData || !comparePassword(password, userData.passHash)) {
      throw new LoginNotFoundException('Los datos ingresados son incorrectos');
    }

    const key = generateRandomUUID();
    const token = this._generateToken(userData.userId, key);
    this.authRepository.registerToken(userData.userId, token, key);

    return token;
  }

  private _getUserData(email: string, personalNumber: string): User {
    if (email) {
      return this.authRepository.getUserDataByEmail(email);
    } else {
      return this.authRepository.getUserDataByPersonalNumber(personalNumber);
    }
  }

  private _generateToken(userId: number, key: string): string {
    return this.tokenService.sign({
      userId,
      key,
    });
  }
}
