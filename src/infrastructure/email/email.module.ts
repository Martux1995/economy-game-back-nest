import { Module, Provider } from '@nestjs/common';
import { EmailService } from '../../domain/services/email.service';
import { EmailServiceImp } from './email.service';
import { LibrariesModule } from '../libraries/libraries.module';

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
