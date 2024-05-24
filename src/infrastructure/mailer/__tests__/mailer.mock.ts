import { EEnvironmentVars } from '../../../config/enums/environment-vars.enum';
import { AppConfig } from '../../../config/interfaces/app-config';
import { SendMailParams } from '../params/sendmail.params';

export const CONFIG_SERVICE_MOCK = (key: EEnvironmentVars) => {
  const foo: Partial<AppConfig> = {
    SMTP_PORT: 1234,
    SMTP_SERVER: 'asd',
    SMTP_USER_MAIL: 'asd@asd.com',
    SMTP_USER_NAME: 'asd',
    SMTP_USER_PASS: 'jajaja',
  };

  const value = foo[key];
  if (!value) {
    throw Error();
  }
  return value;
};

export const STANDARD_MAIL: SendMailParams = {
  to: 'asd@asd.com',
  cc: 'otro@asd.com',
  bcc: 'otroculto@asd.com',
  subject: 'Testing Mail',
  content: { html: '<p>{{algo}}</p>' },
};

export const MAIL_WITH_ATTACHMENTS: SendMailParams = {
  to: 'asd@asd.com',
  cc: 'otro@asd.com',
  bcc: 'otroculto@asd.com',
  subject: 'Testing Mail',
  content: { text: 'content text' },
  attachments: [{ filename: 'text.txt', content: 'ajajjajaj' }],
};
