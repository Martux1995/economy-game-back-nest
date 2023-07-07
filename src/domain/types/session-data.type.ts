import { ERoles } from '../enums';

export type UserSessionData = {
  userId: string;
  sessionKey: string;
  firstName: string;
  lastName: string;
  role: ERoles;
};
