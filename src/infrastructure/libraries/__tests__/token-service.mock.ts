import { EEnvironmentVars } from 'src/config/enums/environment-vars.enum';
import { TokenData } from '../../../domain/types';
import { AppConfig } from 'src/config/interfaces/app-config';

export const CONFIG_SERVICE_MOCK = (key: EEnvironmentVars) => {
  const foo: Partial<AppConfig> = {
    JWT_SECRET: 'ASDASD123',
  };

  const value = foo[key];
  if (!value) {
    throw Error();
  }
  return value;
};

const payload: TokenData = {
  key: '123132',
  userId: '234542',
};

const jwtParams = {
  secret: 'tokenSecret',
  expiresIn: '10h',
};

const tokenExample =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFzZDEyMyIsImlhdCI6MTUxNjIzOTAyMn0.JXG4vh2lH9NRjUium-1Z7-tqtqmKp58kqvhJ1zPfZS0';

export const tokenServiceMock = {
  payload,
  jwtParams,
  tokenExample,
};
