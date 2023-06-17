import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/entities';
import { AuthRepository } from '../../../domain/repositories';

import { LoginParams } from '../params';
import { LoginNotFoundException } from '../exceptions';
import { formatRUN } from '../../common/helpers/run';
import { comparePassword } from '../../common/helpers/password';
import { generateRandomUUID } from '../../common/helpers/uuid';
import { TokenService } from '../../../domain/services';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(params: LoginParams) {
    const { email, personalNumber, password } = params;

    const userData: User = await this._getUserData(
      email,
      formatRUN(personalNumber),
    );

    if (!userData || !comparePassword(password, userData.passHash)) {
      throw new LoginNotFoundException('Los datos ingresados son incorrectos');
    }

    const key = generateRandomUUID();
    const token = this._generateToken(userData.userId, key);
    await this.authRepository.registerSessionData(userData.userId, key);

    return token;
  }

  private async _getUserData(
    email: string,
    personalNumber: string,
  ): Promise<User> {
    if (email) {
      return this.authRepository.getUserDataByEmail(email);
    } else if (personalNumber) {
      return this.authRepository.getUserDataByPersonalNumber(personalNumber);
    }
    return null;
  }

  private _generateToken(userId: number, key: string): string {
    return this.tokenService.sign({
      userId,
      key,
    });
  }
}
