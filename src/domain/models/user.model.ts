import { Session } from './session.model';

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  personalNumberId: string | null;

  passHash: string;
  passResetToken: string | null;
  passResetExpire: Date | null;

  isAdmin: boolean;
  createdDate: Date;
  enabled: boolean;

  session: Session[];
}
