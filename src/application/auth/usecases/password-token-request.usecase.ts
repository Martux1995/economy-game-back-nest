import { add } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/models';
import { EFileType } from '../../../domain/enums';
import { UserRepository } from '../../../domain/repositories';
import {
  EnvService,
  TokenService,
  EmailService,
  FileSystemService,
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
    private readonly fileSystemService: FileSystemService,
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
        html: this.fileSystemService.getTextFile(
          'recover-password.html',
          EFileType.EmailTemplate,
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
