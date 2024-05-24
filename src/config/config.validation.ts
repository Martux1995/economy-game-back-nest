import * as Joi from 'joi';
import { AppConfig } from './interfaces/app-config';

export const validationSchema = Joi.object<AppConfig>({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'local')
    .default('development'),

  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASS: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  SMTP_SERVER: Joi.string().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER_MAIL: Joi.string().email().required(),
  SMTP_USER_NAME: Joi.string().required(),
  SMTP_USER_PASS: Joi.string().required(),
});
