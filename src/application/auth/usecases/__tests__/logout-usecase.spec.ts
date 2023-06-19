import { Test } from '@nestjs/testing';
import { LogoutUseCase } from '../logout.usecase';
import { AuthRepository } from '../../../../domain/repositories';
import { logoutUseCaseMock } from './logout-usecase.mock';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let repo: AuthRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: AuthRepository,
          useFactory: () => ({
            removeSessionData: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<LogoutUseCase>(LogoutUseCase);
    repo = module.get<AuthRepository>(AuthRepository);
  });

  beforeAll(() => {
    expect(module).toBeDefined();
  });

  it('should not to trown an error if session key was deleted successfully', async () => {
    const { userId, key } = logoutUseCaseMock.data;

    const removeSessionDataSpyOn = jest.spyOn(repo, 'removeSessionData');

    expect(() => useCase.logout(userId, key)).not.toThrow();
    expect(removeSessionDataSpyOn).toHaveBeenCalledWith(userId, key);
  });
});
