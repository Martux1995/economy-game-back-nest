import { User } from './user.entity';

export interface Session {
  sessionId: string;
  createdDate: Date;
  expiredDate: Date;
  user: User;
}
