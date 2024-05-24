import { add } from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../../domain/models';
import { TOKEN_SERVICE, TokenService } from '../../../domain/services';
import {
  SESSION_REPOSITORY,
  SessionRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../../domain/repositories';

import { formatRUN } from '../../common/helpers/run';
import { comparePassword } from '../../common/helpers/password';

import { LoginParams } from '../params';
import { LoginNotFoundException } from '../exceptions';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepository: SessionRepository,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
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
