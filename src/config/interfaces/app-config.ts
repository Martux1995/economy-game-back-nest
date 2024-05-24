export interface AppConfig {
  NODE_ENV: string;

  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASS: string;
  DATABASE_NAME: string;

  JWT_SECRET: string;

  SMTP_SERVER: string;
  SMTP_PORT: number;
  SMTP_USER_MAIL: string;
  SMTP_USER_NAME: string;
  SMTP_USER_PASS: string;
}
