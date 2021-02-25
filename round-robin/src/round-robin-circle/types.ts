export type TournamentPlayer = {
  id: string;
}

export type Game = {
  whitePiecesPlayer: number;
  blackPiecesPlayer: number;
}

export type TournamentRound = {
  // A round's games collection
  games: Game[];
  // If present, it  represents the player with round bye
  byePlayer?: number;
}
