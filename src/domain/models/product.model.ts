import { Game } from './game.model';

export interface Product {
  productId: string;
  name: string;
  storageBlocks: number;
  enabled: boolean;
  game: Game;
}
