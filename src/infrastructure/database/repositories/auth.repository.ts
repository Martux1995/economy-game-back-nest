import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SessionEntity, UserEntity } from '../entities';
import { AuthRepository } from '../../../domain/repositories';

@Injectable()
export class AuthRepositoryImp extends AuthRepository {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  getUserDataById(userId: number): Promise<UserEntity> {
    return this.dataSource.getRepository(UserEntity).findOne({
      relations: {
        person: true,
      },
      where: {
        userId,
      },
    });
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

  getSessionData(userId: number, key: string): Promise<SessionEntity> {
    return this.dataSource.getRepository(SessionEntity).findOne({
      relations: {
        user: {
          person: true,
        },
      },
      where: {
        key,
        user: {
          userId,
        },
      },
    });
  }

  async registerSessionData(userId: number, key: string): Promise<void> {
    await this.dataSource.getRepository(SessionEntity).insert({
      key,
      user: {
        userId,
      },
      expiredDate: new Date(),
    });
  }

  async removeSessionData(userId: number, key: string): Promise<void> {
    await this.dataSource.getRepository(SessionEntity).delete({
      key,
      user: {
        userId,
      },
    });
  }
}
