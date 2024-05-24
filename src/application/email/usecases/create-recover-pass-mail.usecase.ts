import { join } from 'path';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';

import { TEMPLATE_DIR } from '../constants/template-dir';
import { EMailTemplate } from '../enums/mail-template.enum';

import { SendMailParams } from '../../../infrastructure/mailer/params/sendmail.params';

@Injectable()
export class CreateRecoverPassMailUseCase {
  generate(to: string, params: any): SendMailParams {
    const templatePath = join(TEMPLATE_DIR, EMailTemplate.RecoverPassword);

    const template = readFileSync(templatePath, { encoding: 'utf-8' });
    const html = Handlebars.compile(template)({
      recoverUrl: 'asdasd',
      ...params,
    });

    return {
      to,
      subject: 'Reinicio de clave',
      content: { html },
    };
  }
}
