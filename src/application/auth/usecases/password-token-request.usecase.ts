import { add } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { generateRandomUUID } from '../../common/helpers/uuid';
import {
  PassRecoverTokenActiveException,
  UserDisabledException,
  UserNotFoundException,
} from '../exceptions';

@Injectable()
export class PasswordTokenRequestUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async getToken(email: string): Promise<string> {
    const userId = await this._checkUserAndReturnUserId(email);

    const passCode = generateRandomUUID();
    const expireDate = add(new Date(), { minutes: 10 });
    await this.userRepository.setPassResetToken(userId, passCode, expireDate);

    return passCode;
  }

  private async _checkUserAndReturnUserId(email: string): Promise<string> {
    const user = await this.userRepository.getUserByEmail(email);

    this._checkUser(user);

    return user.userId;
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
}
