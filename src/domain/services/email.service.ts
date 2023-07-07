import { SendMailParams } from '../types';

export abstract class EmailService {
  abstract sendmail(data: SendMailParams): void | Promise<void>;
}
