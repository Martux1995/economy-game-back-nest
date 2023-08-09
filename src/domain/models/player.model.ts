import { EGameRoles } from '../enums/game-roles.enum';
import { Game } from './game.model';
import { Group } from './group.model';
import { User } from './user.model';

export interface Player {
  playerId: string;
  alias: string;
  role: EGameRoles;
  enabled: boolean;

  group?: Group;
  game: Game;
  user: User;
}
