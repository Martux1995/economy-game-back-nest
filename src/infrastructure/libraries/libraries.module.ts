import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EncryptServiceImp } from './encrypt.service';
import { TokenServiceImp } from './token.service';
import { ConfigServiceImp } from './config.service';
import { RUNServiceImp } from './run.service';
import {
  EncryptService,
  ConfigService,
  TokenService,
  RUNService,
} from '../../domain/services';

const EXTERNAL_LIBRARIES: Provider[] = [
  {
    provide: EncryptService,
    useClass: EncryptServiceImp,
  },
  {
    provide: TokenService,
    useClass: TokenServiceImp,
  },
  {
    provide: ConfigService,
    useClass: ConfigServiceImp,
  },
  {
    provide: RUNService,
    useClass: RUNServiceImp,
  },
];

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...EXTERNAL_LIBRARIES],
  exports: [...EXTERNAL_LIBRARIES],
})
export class LibrariesModule {}
