import { User } from './user.entity';

export interface Session {
  sessionId: number;
  key: string;
  createdDate: Date;
  expiredDate: Date;
  user: User;
}
