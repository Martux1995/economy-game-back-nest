import { Inject, Injectable } from '@nestjs/common';

import { User } from '../../../domain/models';
import { TokenService } from '../../../domain/services';
import { USER_REPOSITORY, UserRepository } from '../../../domain/repositories';

import { hashPassword } from '../../common/helpers/password';

import {
  PassRecoverCodeMismatchException,
  PassRecoverTokenExpireException,
  PassRecoverTokenInvalidException,
  UserDisabledException,
} from '../exceptions';

@Injectable()
export class PasswordChangeUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async changePassword(token: string, newPassword: string) {
    const { userId, key: passCode } = this._decodeToken(token);

    await this._checkUserPasswordRequest(userId, passCode);

    const passHash = hashPassword(newPassword);

    await this.userRepository.setPassHash(userId, passHash);
    await this.userRepository.removePassResetToken(userId);
  }

  private _decodeToken(token: string) {
    const tokenData = this.tokenService.verify(token);
    if (!tokenData) {
      throw new PassRecoverTokenInvalidException();
    }
    return tokenData;
  }

  private async _checkUserPasswordRequest(userId: string, passCode: string) {
    const userData = await this.userRepository.getUser({ userId });
    this._checkUser(userData, passCode);
  }

  private _checkUser(userData: User, passCode: string) {
    if (!userData) {
      throw new PassRecoverTokenInvalidException();
    }

    if (!userData.enabled) {
      throw new UserDisabledException();
    }

    if (userData.passResetToken && userData.passResetExpire < new Date()) {
      throw new PassRecoverTokenExpireException();
    }

    if (userData.passResetToken !== passCode) {
      throw new PassRecoverCodeMismatchException();
    }
  }
}
