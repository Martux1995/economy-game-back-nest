import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

import { UserEntity } from '../entities';

@Injectable()
export class UserRepositoryImp extends UserRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async getUserById(userId: string): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: { session: true },
      where: { userId },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: { session: true },
      where: { email },
    });
  }

  async getUserByPersonalNumber(personalNumberId: string): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: { session: true },
      where: { personalNumberId },
    });
  }

  async getUserByPassRecoverToken(passRecoverToken: string): Promise<User> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: { session: true },
      where: { passResetToken: passRecoverToken },
    });
  }

  async setPassResetToken(
    userId: string,
    token: string,
    expire: Date,
  ): Promise<void> {
    await this.dataSource
      .getRepository(UserEntity)
      .update({ userId }, { passResetToken: token, passResetExpire: expire });
  }

  async setPassHash(userId: string, passHash: string): Promise<void> {
    await this.dataSource
      .getRepository(UserEntity)
      .update(
        { userId },
        { passHash, passResetToken: null, passResetExpire: null },
      );
  }

  async removePassResetToken(userId: string): Promise<void> {
    await this.dataSource
      .getRepository(UserEntity)
      .update({ userId }, { passResetToken: null, passResetExpire: null });
  }
}
