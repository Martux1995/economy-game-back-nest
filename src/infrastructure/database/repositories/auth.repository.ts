import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SessionEntity, UserEntity } from '../entities';
import { AuthRepository } from '../../../domain/repositories';

@Injectable()
export class AuthRepositoryImp extends AuthRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  getUserDataByEmail(email: string): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: {
        person: true,
      },
      where: {
        person: {
          email,
        },
      },
    });
  }
  getUserDataByPersonalNumber(personNumberId: string): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: {
        person: true,
      },
      where: {
        person: {
          personNumberId,
        },
      },
    });
  }
  async registerToken(userId: number, key: string): Promise<void> {
    await this.dataSource.getRepository(SessionEntity).insert({
      key,
      user: {
        userId,
      },
    });
  }
}
