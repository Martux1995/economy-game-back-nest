import { add } from 'date-fns';
import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../../domain/models';
import { TokenService } from '../../../domain/services';

import { generateRandomUUID } from '../../common/helpers/uuid';

import {
  PassRecoverTokenActiveException,
  UserDisabledException,
  UserNotFoundException,
} from '../exceptions';

import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories';

import { EmailService } from '../../../application/email/email.service';

@Injectable()
export class PasswordTokenRequestUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  async getToken(toMailAddress: string): Promise<void> {
    const user = await this._checkUserAndReturnUserId(toMailAddress);

    const passCode = generateRandomUUID();
    const expireDate = add(new Date(), { minutes: 10 });

    await this.userRepository.setPassResetToken(
      user.userId,
      passCode,
      expireDate,
    );

    const token = this._generateToken(user.userId, passCode);

    await this.emailService.sendRecoverPasswordMail(toMailAddress, {
          playerName: `${user.firstName} ${user.lastName}`,
          timeToExpire: '10 minutos',
      token,
    });
  }

  private async _checkUserAndReturnUserId(email: string): Promise<User> {
    const user = await this.userRepository.getUser({ email });
    this._checkUser(user);
    return user;
  }

  private _checkUser(userData: User) {
    if (!userData) {
      throw new UserNotFoundException();
    }

    if (!userData.enabled) {
      throw new UserDisabledException();
    }

    if (userData.passResetToken && userData.passResetExpire > new Date()) {
      throw new PassRecoverTokenActiveException();
    }
  }

  private _generateToken(userId: string, passCode: string) {
    return this.tokenService.sign({
      userId,
      key: passCode,
    });
  }
}
