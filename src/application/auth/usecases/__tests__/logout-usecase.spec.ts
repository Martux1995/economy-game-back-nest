import { Test } from '@nestjs/testing';
import { LogoutUseCase } from '../logout.usecase';
import { SessionRepository } from '../../../../domain/repositories';
import { logoutUseCaseMock } from './logout-usecase.mock';

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let repo: SessionRepository;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LogoutUseCase,
        {
          provide: SessionRepository,
          useFactory: () => ({
            deleteSession: jest.fn(),
          }),
        },
      ],
    }).compile();

    useCase = module.get<LogoutUseCase>(LogoutUseCase);
    repo = module.get<SessionRepository>(SessionRepository);
  });

  beforeAll(() => {
    expect(module).toBeDefined();
  });

  it('should not to trown an error if session key was deleted successfully', async () => {
    const { sessionId } = logoutUseCaseMock.data;

    const deleteSessionSpyOn = jest.spyOn(repo, 'deleteSession');

    expect(() => useCase.logout(sessionId)).not.toThrow();
    expect(deleteSessionSpyOn).toHaveBeenCalledWith(sessionId);
  });
});
