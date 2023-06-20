import { TokenData } from '../../../domain/types';

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
