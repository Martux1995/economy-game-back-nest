import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UserEntity } from '../../entities';

import { UserRepositoryImp } from '../user.repository';
import { USER_REPOSITORY_MOCKS } from './user-repository.mock';

describe('UserRepository', () => {
  let repository: UserRepositoryImp;
  let dbRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepositoryImp,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepositoryImp>(UserRepositoryImp);
    dbRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(dbRepository).toBeDefined();
  });

  it('should get a user', async () => {
    const { params, expected } = USER_REPOSITORY_MOCKS.getUser;

    jest.spyOn(dbRepository, 'findOne').mockImplementation(async (options) => {
      expect(options).toBeDefined();
      expect(options).toHaveProperty('where');
      expect(options.where).toHaveProperty('userId', params.userId);
      expect(options.where).toHaveProperty('email', params.email);
      expect(options.where).toHaveProperty(
        'personalNumberId',
        params.personalNumberId,
      );
      expect(options).toHaveProperty('relations');
      expect(options.relations).toHaveProperty('session', true);
      return expected;
    });

    const result = await repository.getUser(params);
    expect(result).toBeDefined();
    expect(result).toEqual(expected);
  });

  it('should set the password reset token to an user', async () => {
    const { userId, token, expire } =
      USER_REPOSITORY_MOCKS.setPassResetToken.params;

    jest
      .spyOn(dbRepository, 'update')
      .mockImplementation(async (criteria, options) => {
        expect(criteria).toBeDefined();
        expect(criteria).toHaveProperty('userId', userId);
        expect(options).toBeDefined();
        expect(options).toHaveProperty('passResetToken', token);
        expect(options).toHaveProperty('passResetExpire', expire);
        return null;
      });

    await repository.setPassResetToken(userId, token, expire);
  });

  it('should set the password hash', async () => {
    const { userId, passHash } = USER_REPOSITORY_MOCKS.setPassHash.params;

    jest
      .spyOn(dbRepository, 'update')
      .mockImplementation(async (criteria, options) => {
        expect(criteria).toBeDefined();
        expect(criteria).toHaveProperty('userId', userId);
        expect(options).toBeDefined();
        expect(options).toHaveProperty('passHash', passHash);
        expect(options).toHaveProperty('passResetToken', null);
        expect(options).toHaveProperty('passResetExpire', null);
        return null;
      });

    await repository.setPassHash(userId, passHash);
  });

  it('should remove the pass reset token from an user', async () => {
    const { userId } = USER_REPOSITORY_MOCKS.removePassResetToken.params;

    jest
      .spyOn(dbRepository, 'update')
      .mockImplementation(async (criteria, options) => {
        expect(criteria).toBeDefined();
        expect(criteria).toHaveProperty('userId', userId);
        expect(options).toBeDefined();
        expect(options).toHaveProperty('passResetToken', null);
        expect(options).toHaveProperty('passResetExpire', null);
        return null;
      });

    await repository.removePassResetToken(userId);
  });
});
