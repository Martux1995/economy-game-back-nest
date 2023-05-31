import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { EncryptService } from '../../domain/services';

@Injectable()
export class EncryptServiceImp extends EncryptService {
  private static readonly ROUNDS = 10;

  constructor() {
    super();
  }

  hash(text: string): string {
    return bcrypt.hashSync(text, EncryptServiceImp.ROUNDS);
  }
  compare(text: string, hash: string): boolean {
    return bcrypt.compareSync(text, hash);
  }
}
