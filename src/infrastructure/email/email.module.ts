import { Module, Provider } from '@nestjs/common';
import { EmailService } from '../../domain/services';
import { LibrariesModule } from '../libraries/libraries.module';
import { EmailServiceImp } from './email.service';

const EMAIL_PROVIDER: Provider[] = [
  {
    provide: EmailService,
    useClass: EmailServiceImp,
  },
];

@Module({
  imports: [LibrariesModule],
  providers: [...EMAIL_PROVIDER],
  exports: [...EMAIL_PROVIDER],
})
export class EmailModule {}
