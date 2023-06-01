import * as RUT from 'rut.js';
import { Injectable } from '@nestjs/common';
import { RUNService } from '../../domain/services';

@Injectable()
export class RUNServiceImp extends RUNService {
  validate(run: string): boolean {
    return RUT.validate(run);
  }
  format(run: string, dots: boolean): string {
    return RUT.format(run, { dots });
  }
  clean(run: string): string {
    return RUT.clean(run);
  }
}
