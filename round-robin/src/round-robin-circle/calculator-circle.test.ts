import * as rrc_calculator from "./calculator-circle";
import {CircleParams, Game, Games, Player, Players, TournamentRound, TournamentRounds} from "./types";

describe(`Round Robin Calculator`, () => {
  let numberOfPlayers: number;
  let circleParams: CircleParams;
  let gamesPerRound: number;
  let adjustedNumberOfPlayers: number;
  let rounds: number;

  let opponentCandidates: number[] = [];
  let expectedOpponents: number[]  = [];
  let actualOpponents: number[] = [];
  const NO_OPPONENT_FOUND = -1;
  let opponent: number;
  let playerGamesPerRound: number = 0;

  let tournamentRound: TournamentRound;
  let tournamentRounds: TournamentRounds;

  describe(`The calculateCircleParams function`, () => {
    describe(`when calculating for an even number of players`, () => {
      beforeAll(() => {
        numberOfPlayers = 10;
        circleParams = rrc_calculator.calculateCircleParams(numberOfPlayers);
      });
      it(`calculates ghostPlayer correctly`, () => {
        expect(circleParams.ghostPlayer).toEqual(Number.MAX_VALUE);
        });
      it(`calculates adjustedNumberOfPlayers correctly`, () => {
        expect(circleParams.adjustedNumberOfPlayers).toEqual(numberOfPlayers);
        });
      it(`calculates rounds correctly`, () => {
        expect(circleParams.rounds).toEqual(circleParams.adjustedNumberOfPlayers - 1);
        });
      it(`calculates gamesPerRound correctly`, () => {
        expect(circleParams.gamesPerRound).toEqual(numberOfPlayers / 2);
        });
    });
    describe(`when calculating for an odd number of players`, () => {
      beforeAll(() => {
        numberOfPlayers = 11;
        circleParams = rrc_calculator.calculateCircleParams(numberOfPlayers);
      });
      it(`calculates ghostPlayer correctly`, () => {
        expect(circleParams.ghostPlayer).toEqual(numberOfPlayers);
        });
      it(`calculates adjustedNumberOfPlayers correctly`, () => {
        expect(circleParams.adjustedNumberOfPlayers).toEqual(numberOfPlayers + 1);
        });
      it(`calculates rounds correctly`, () => {
        expect(circleParams.rounds).toEqual(circleParams.adjustedNumberOfPlayers - 1);
        });
      it(`calculates gamesPerRound correctly`, () => {
        expect(circleParams.gamesPerRound).toEqual((numberOfPlayers - 1) / 2);
        });
    });
  });
  describe(`The calculateCircle function`, () => {
    describe(`for an even number of players`, () => {
      // numberOfPlayers = 10;
      // circleParams = rrc_calculator.calculateCircleParams(numberOfPlayers);
      // gamesPerRound = circleParams.gamesPerRound;
      // adjustedNumberOfPlayers = circleParams.adjustedNumberOfPlayers;
      // rounds = circleParams.rounds;
      beforeAll(() => {
        numberOfPlayers = 10;
        circleParams = rrc_calculator.calculateCircleParams(numberOfPlayers);
        gamesPerRound = circleParams.gamesPerRound;
        adjustedNumberOfPlayers = circleParams.adjustedNumberOfPlayers;
        rounds = circleParams.rounds;
        tournamentRounds = rrc_calculator.calculateCircleMethod(numberOfPlayers);
      });
      it(`calculates 9 rounds`, () => {
        expect(tournamentRounds.length).toEqual(numberOfPlayers - 1);
      });
      it(`calculates 5 games per round`, () => {
        // round 1
        expect(tournamentRounds[1].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[2].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[3].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[4].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[5].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[6].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[7].games.length).toEqual(numberOfPlayers / 2);
        expect(tournamentRounds[8].games.length).toEqual(numberOfPlayers / 2);
      });
      it(`without any round by player in any round`, () => {
        expect(tournamentRounds[1].byePlayer).toBeFalsy();
        expect(tournamentRounds[2].byePlayer).toBeFalsy();
        expect(tournamentRounds[3].byePlayer).toBeFalsy();
        expect(tournamentRounds[4].byePlayer).toBeFalsy();
        expect(tournamentRounds[5].byePlayer).toBeFalsy();
        expect(tournamentRounds[6].byePlayer).toBeFalsy();
        expect(tournamentRounds[7].byePlayer).toBeFalsy();
        expect(tournamentRounds[8].byePlayer).toBeFalsy();
      });
      it(`with every player playing all other players`, () => {
        opponentCandidates = [];
        for (let player = 0; player < adjustedNumberOfPlayers; player++) {
          opponentCandidates.push(player);
        }
        // console.log("opponentCandidates: " + JSON.stringify(opponentCandidates));
        // for each player
        for (let player = 0; player < numberOfPlayers; player++) {
          // console.log("Validating player: " + player);
          expectedOpponents = opponentCandidates.slice();
          // console.log("expectedOpponents: " + JSON.stringify(expectedOpponents));

          // note that the splice method removes the element(s) from the array and
          // RETURNS the removed element(s)
          expectedOpponents.splice(player, 1);
          // console.log("expectedOpponents: " + JSON.stringify(expectedOpponents));

          // For each round
          actualOpponents = [];
          for (let i = 0; i < rounds; i++) {
            tournamentRound = tournamentRounds[i];
            opponent = NO_OPPONENT_FOUND;
            // Find the player`s opponent and save it
            for (let j = 0; j < gamesPerRound; j++) {
              if (tournamentRound.games[j].whitePiecesPlayer === player) {
                opponent = tournamentRound.games[j].blackPiecesPlayer;
              } else {
                if (tournamentRound.games[j].blackPiecesPlayer === player) {
                    opponent = tournamentRound.games[j].whitePiecesPlayer;
                }
              }
              if (opponent !== NO_OPPONENT_FOUND) {
                break;
              }
            }
            expect(opponent).not.toEqual(NO_OPPONENT_FOUND);
            expect(opponent).not.toEqual(player);
            actualOpponents.push(opponent);
          }
          // console.log("actualOpponents: " + JSON.stringify(actualOpponents));
          expect(actualOpponents.sort()).toEqual(expectedOpponents.sort());
        }
      });
      it(`with every player playing one game per round`, () => {
        for (let i = 0; i < rounds; i++) {
          // console.log("round: " + i);
          tournamentRound = tournamentRounds[i];
          // console.log("tournamentRound: " + JSON.stringify(tournamentRound));
          for (let player = 0; player < numberOfPlayers; player++) {
            // console.log("player: " + player);
            playerGamesPerRound = 0;
            // console.log("numberOfGamesPerRound: " + numberOfGamesPerRound);
            for (let k = 0; k < gamesPerRound; k++) {
              // console.log("game: " + JSON.stringify(tournamentRound.games[k]));
              if (tournamentRound.games[k].whitePiecesPlayer === player ||
                  tournamentRound.games[k].blackPiecesPlayer === player) {
                  playerGamesPerRound++;
              }
            }
            expect(playerGamesPerRound).toEqual(1);
          }
        }
      });
    });
    describe(`for an odd number of players`, () => {
      beforeAll(() => {
        numberOfPlayers = 11;
        circleParams = rrc_calculator.calculateCircleParams(numberOfPlayers);
        gamesPerRound = 5;
        adjustedNumberOfPlayers = 12;
        rounds = 11;
        tournamentRounds = rrc_calculator.calculateCircleMethod(numberOfPlayers);
      });
      it(`calculates 11 rounds`, () => {
        expect(tournamentRounds.length).toEqual(11);
      });
      it(`calculates 5 games per round (11 players)`, () => {
        // round 1
        expect(tournamentRounds[1].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[2].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[3].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[4].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[5].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[6].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[7].games.length).toEqual(gamesPerRound);
        expect(tournamentRounds[8].games.length).toEqual(gamesPerRound);
      });
      it(`with a round by player in any round (11 players)`, () => {
        expect(tournamentRounds[1].byePlayer).toBeTruthy();
        expect(tournamentRounds[2].byePlayer).toBeTruthy();
        expect(tournamentRounds[3].byePlayer).toBeTruthy();
        expect(tournamentRounds[4].byePlayer).toBeTruthy();
        expect(tournamentRounds[5].byePlayer).toBeTruthy();
        expect(tournamentRounds[6].byePlayer).toBeTruthy();
        expect(tournamentRounds[7].byePlayer).toBeTruthy();
        expect(tournamentRounds[8].byePlayer).toBeTruthy();
      });
      it(`with every player playing all other players`, () => {
        opponentCandidates = [];
        for (let player = 0; player < numberOfPlayers; player++) {
          opponentCandidates.push(player);
        }
        // console.log("opponentCandidates: " + JSON.stringify(opponentCandidates));

        // for each player
        for (let player = 0; player < numberOfPlayers; player++) {
          // console.log("Validating player: " + player);
          expectedOpponents = opponentCandidates.slice();
          // console.log("expectedOpponents: " + JSON.stringify(expectedOpponents));

          // note that the splice method removes the element(s) from the array and
          // RETURNS the removed element(s)
          expectedOpponents.splice(player, 1);
          // console.log("expectedOpponents: " + JSON.stringify(expectedOpponents));

          // For each round
          actualOpponents = [];
          for (let i = 0; i < rounds; i++) {
            tournamentRound = tournamentRounds[i];
            opponent = NO_OPPONENT_FOUND;
            // Find the player`s opponent and save it
            for (let j = 0; j < gamesPerRound; j++) {
              // console.log("tournamentRound.games[" + j + "]: " + JSON.stringify(tournamentRound.games[j]));
              if (tournamentRound.games[j].whitePiecesPlayer === player) {
                opponent = tournamentRound.games[j].blackPiecesPlayer;
              } else {
                if (tournamentRound.games[j].blackPiecesPlayer === player) {
                    opponent = tournamentRound.games[j].whitePiecesPlayer;
                }
              }
              if (opponent !== NO_OPPONENT_FOUND) {
                break;
              }
            }
            if (player === tournamentRound.byePlayer) {
              expect(opponent).toEqual(NO_OPPONENT_FOUND);
            } else {
              expect(opponent).not.toEqual(NO_OPPONENT_FOUND);
              expect(opponent).not.toEqual(player);
              actualOpponents.push(opponent);
            }
          }
          // console.log("actualOpponents: " + JSON.stringify(actualOpponents));
          expect(actualOpponents.sort()).toEqual(expectedOpponents.sort());
        }
      });
      it(`with every player playing one game per round, except when they have a round bye`, () => {
        for (let i = 0; i < rounds; i++) {
          // console.log("round: " + i);
          tournamentRound = tournamentRounds[i];
          // console.log("tournamentRound: " + JSON.stringify(tournamentRound));
          for (let player = 0; player < numberOfPlayers; player++) {
            // console.log("player: " + player);
            playerGamesPerRound = 0;
            // console.log("numberOfGamesPerRound: " + numberOfGamesPerRound);
            for (let k = 0; k < gamesPerRound; k++) {
              // console.log("game: " + JSON.stringify(tournamentRound.games[k]));
              if (tournamentRound.games[k].whitePiecesPlayer === player ||
                  tournamentRound.games[k].blackPiecesPlayer === player) {
                  playerGamesPerRound++;
              }
            }
            if (player === tournamentRound.byePlayer) {
              expect(playerGamesPerRound).toEqual(0);
            } else {
              expect(playerGamesPerRound).toEqual(1);
            }
          }
        }
      });
    });
  });
});
