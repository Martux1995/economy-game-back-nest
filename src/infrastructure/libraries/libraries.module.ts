import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenServiceImp } from './token.service';
import { ConfigServiceImp } from './config.service';
import { ConfigService, TokenService } from '../../domain/services';

const EXTERNAL_LIBRARIES: Provider[] = [
  {
    provide: TokenService,
    useClass: TokenServiceImp,
  },
  {
    provide: ConfigService,
    useClass: ConfigServiceImp,
  },
];

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [...EXTERNAL_LIBRARIES],
  exports: [...EXTERNAL_LIBRARIES],
})
export class LibrariesModule {}
