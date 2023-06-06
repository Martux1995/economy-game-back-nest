export type SessionData = {
  userId: number;
  sessionKey: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'USER';
};
