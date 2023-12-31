import { add } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/models';
import { TokenService } from '../../../domain/services';
import {
  SessionRepository,
  UserRepository,
} from '../../../domain/repositories';

import { formatRUN } from '../../common/helpers/run';
import { comparePassword } from '../../common/helpers/password';

import { LoginParams } from '../params';
import { LoginNotFoundException } from '../exceptions';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(params: LoginParams) {
    const { email, personalNumber, password } = params;

    const userData: User = await this._getUserData(
      email,
      formatRUN(personalNumber, false),
    );

    if (!userData || !comparePassword(password, userData.passHash)) {
      throw new LoginNotFoundException('Los datos ingresados son incorrectos');
    }

    await this.userRepository.removePassResetToken(userData.userId);
    return this._generateSession(userData.userId);
  }

  private async _getUserData(
    email: string,
    personalNumberId: string,
  ): Promise<User> {
    return this.userRepository.getUser({
      email,
      personalNumberId,
    });
  }

  private async _generateSession(userId: string) {
    const expireDate = add(new Date(), { hours: 12 });
    const { sessionId } = await this.sessionRepository.createSession(
      userId,
      expireDate,
    );
    return this.tokenService.sign({
      userId,
      key: sessionId,
    });
  }
}
