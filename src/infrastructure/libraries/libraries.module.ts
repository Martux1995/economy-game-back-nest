import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TokenServiceImp } from './token.service';
import { EnvServiceImp } from './env.service';
import { EnvService, TokenService } from '../../domain/services';
import { JwtModule } from '@nestjs/jwt';

const EXTERNAL_LIBRARIES: Provider[] = [
  {
    provide: TokenService,
    useClass: TokenServiceImp,
  },
  {
    provide: EnvService,
    useClass: EnvServiceImp,
  },
];

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModule],
  providers: [...EXTERNAL_LIBRARIES],
  exports: [...EXTERNAL_LIBRARIES],
})
export class LibrariesModule {}
