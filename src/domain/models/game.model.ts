export interface Game {
  gameId: string;
  name: string;
  startDate: Date;
  endDate?: Date;
  isPaused: boolean;
}
