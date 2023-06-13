import { UserSessionData } from '../../../domain/types';

export interface AppRequest {
  user: UserSessionData;
  [k: string]: any;
}
