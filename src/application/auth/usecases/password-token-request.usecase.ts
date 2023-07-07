import { add } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import {
  EnvService,
  TokenService,
  EmailService,
} from '../../../domain/services';
import {
  RecoverPasswordHTMLTemplate,
  SendMailParams,
} from '../../../domain/types';

import { generateRandomUUID } from '../../common/helpers/uuid';

import {
  PassRecoverTokenActiveException,
  UserDisabledException,
  UserNotFoundException,
} from '../exceptions';

@Injectable()
export class PasswordTokenRequestUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly envService: EnvService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  async getToken(email: string): Promise<void> {
    const user = await this._checkUserAndReturnUserId(email);

    const passCode = generateRandomUUID();
    const expireDate = add(new Date(), { minutes: 10 });

    await this.userRepository.setPassResetToken(
      user.userId,
      passCode,
      expireDate,
    );

    const token = this._generateToken(user.userId, passCode);

    const emailData: SendMailParams<RecoverPasswordHTMLTemplate> = {
      to: email,
      subject: 'Reinicio de clave',
      content: {
        html: readFileSync(
          `${__dirname}/../../../../../templates/email/recover-password.html`,
          { encoding: 'utf-8' },
        ),
        params: {
          playerName: `${user.firstName} ${user.lastName}`,
          timeToExpire: '10 minutos',
          recoverUrl: `${this.envService.getFrontDomain()}recover-password?token=${token}`,
        },
      },
    };

    await this.emailService.sendmail(emailData);
  }

  private async _checkUserAndReturnUserId(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
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
