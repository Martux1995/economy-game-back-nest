import { Game } from './game.model';
import { Player } from './player.model';

export interface Group {
  groupId: string;
  alias: string;
  currentMoney: number;
  extraStorageBlocks: number;
  enabled: boolean;

  groupLeader?: Player;
  game: Game;
}
