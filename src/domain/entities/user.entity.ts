import { Person } from './person.entity';
import { Session } from './session.entity';

export interface User {
  userId: number;
  passHash: string;
  isAdmin: boolean;
  createdDate: Date;
  enabled: boolean;

  person: Person;
  session: Session[];
}
