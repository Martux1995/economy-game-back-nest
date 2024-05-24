import { JwtModule } from '@nestjs/jwt';
import { Module, Provider } from '@nestjs/common';

import { TOKEN_SERVICE } from '../../domain/services';
import { AppConfigModule } from '../../config/app-config.module';

import { TokenServiceImp } from './token.service';

const EXTERNAL_LIBRARIES: Provider[] = [
  {
    provide: TOKEN_SERVICE,
    useClass: TokenServiceImp,
  },
];

@Module({
  imports: [AppConfigModule, JwtModule],
  providers: [...EXTERNAL_LIBRARIES],
  exports: [...EXTERNAL_LIBRARIES],
})
export class LibrariesModule {}
