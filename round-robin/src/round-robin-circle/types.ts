export type TournamentPlayer = {
  id: string;
};

export type Game = {
    blackPiecesPlayer: number;
    whitePiecesPlayer: number;
};
export type Games = Game[];

export const WHITE_PIECES = 1;
export const NO_PIECES = 0; // bye or opponent forfeited
export const BLACK_PIECES = -1;
export type Player = {
    id: number;
    rating: number;
    pieceColors: number[];
};
export type Players = Player[];

export type TournamentRound = {
  // A round's games collection
  games: Game[];
  // If present, it  represents the player with round bye
  byePlayer?: number;

};

export type TournamentRounds = TournamentRound[];

export type Tournament = {
  // the players in this tournament
  players: Players;
  numberOfPlayers: number;
  tournamentRounds: TournamentRounds;
  type: string;
};

export type CircleParams = {
  ghostPlayer?: number;
  adjustedNumberOfPlayers?: number;
  rounds?: number;
  gamesPerRound?: number;
};
export type Color = number;
export type Colors = Color[];

export type BergerTable = {
    players: number;
    rounds: Games[];
}
export type PlayerGamesInRound = number;
export type PlayerGamesInRounds = PlayerGamesInRound[];
export type PlayersGamesInTournament = PlayerGamesInRounds[];

export type PlayerOpenentsInRound = number;
export type PlayerOpenentsInRounds = PlayerOpenentsInRound[];
export type PlayersOpenentsInTournament = PlayerOpenentsInRounds[];

export type PlayerPieceAssignment = number;
export type PlayersPieceAssignment = PlayerPieceAssignment[];
