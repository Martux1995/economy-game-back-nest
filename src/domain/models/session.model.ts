import { User } from './user.model';

export interface Session {
  sessionId: string;
  createdDate: Date;
  expiredDate: Date;
  user: User;
}
