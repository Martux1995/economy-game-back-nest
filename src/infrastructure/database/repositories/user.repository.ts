import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../../domain/repositories';
import { GetUserParams } from '../../../domain/repositories/params';

import { UserEntity } from '../entities';

@Injectable()
export class UserRepositoryImp implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUser(params: GetUserParams): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { ...params },
      relations: { session: true },
    });
  }

  async setPassResetToken(
    userId: string,
    token: string,
    expire: Date,
  ): Promise<void> {
    await this.userRepository.update(
      { userId },
      { passResetToken: token, passResetExpire: expire },
    );
  }

  async setPassHash(userId: string, passHash: string): Promise<void> {
    await this.userRepository.update(
      { userId },
      { passHash, passResetToken: null, passResetExpire: null },
    );
  }

  async removePassResetToken(userId: string): Promise<void> {
    await this.userRepository.update(
      { userId },
      { passResetToken: null, passResetExpire: null },
    );
  }
}
