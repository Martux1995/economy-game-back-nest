import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../../domain/repositories';

@Injectable()
export class LogoutUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async logout(userId: number, key: string) {
    await this.authRepository.removeSessionData(userId, key);
  }
}
