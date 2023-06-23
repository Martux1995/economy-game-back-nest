import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/entities';
import { hashPassword } from '../../common/helpers/password';
import {
  PassRecoverTokenExpireException,
  PassRecoverTokenInvalidException,
  UserDisabledException,
} from '../exceptions';

@Injectable()
export class PasswordChangeUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async changePassword(token: string, newPassword: string) {
    const userId = await this._checkUserAndReturnUserId(token);

    const passHash = hashPassword(newPassword);

    await this.userRepository.setPassHash(userId, passHash);
    await this.userRepository.removePassResetToken(userId);
  }

  private async _checkUserAndReturnUserId(
    changePasswordToken: string,
  ): Promise<string> {
    const userData = await this.userRepository.getUserByPassRecoverToken(
      changePasswordToken,
    );

    this._checkUser(userData);

    return userData.userId;
  }

  private _checkUser(userData: User) {
    if (!userData) {
      throw new PassRecoverTokenInvalidException();
    }

    if (!userData.enabled) {
      throw new UserDisabledException();
    }

    if (userData.passResetToken && userData.passResetExpire < new Date()) {
      console.log(userData.passResetExpire);
      console.log(new Date());
      throw new PassRecoverTokenExpireException();
    }
  }
}
