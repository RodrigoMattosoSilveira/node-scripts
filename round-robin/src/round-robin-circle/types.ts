export type TournamentPlayer = {
  id: string;
}

export type Game = {
  whitePiecesPlayer: number;
  blackPiecesPlayer: number;
}
export type Games = Game[];

export type Player = number;
export type Players = Player[];
export type ExpectedOpponents = Players[];


export type TournamentRound = {
  // A round's games collection
  games: Game[];
  // If present, it  represents the player with round bye
  byePlayer?: number;
}

export type TournamentRounds = TournamentRound[];

export type Tournament = {
  numberOfPlayers: number,
  tournamentRounds: TournamentRounds,
  type: string
}

export type CircleParams = {
  ghostPlayer?: number,
  adjustedNumberOfPlayers?: number,
  rounds?: number,
  gamesPerRound?: number;
}
