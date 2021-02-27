/**
 * An algorithm to generate a schedule for a round robin chess tournament:
 * (1) Every player must play every other player;
 * (2) Each player can be involved in at most one game per round;
 * (3) If during a round player i plays player j, then during that same round player j
 *     plays player i.
 */

import printf from "printf";
import { CircleParams, Game, Games, Tournament, TournamentRound, TournamentRounds} from "./types";

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param {numberOfPlayers: number} - The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateCircleMethod = (numberOfPlayers: number): TournamentRounds => {
    // console.log(printf("%-18s%-20s", `numberOfPlayers:`, "" + numberOfPlayers));
    //
  const tournamentRounds: TournamentRounds = [];

  const circleParams: CircleParams = calculateCircleParams(numberOfPlayers);

  // Add a ghostPlayer if numberOfPlayers is odd
  const ghostPlayer = circleParams.ghostPlayer;
  // console.log(printf("%-18s%-20s", `ghostPlayer:`, (ghostPlayer === Number.MAX_VALUE) ? "No ghostPlayer" : "" + "Yes: " + ghostPlayer));

  // save the working number of players, accounting for the ghostPlayer
  const adjustedNumberOfPlayers = circleParams.adjustedNumberOfPlayers;
  // console.log(printf("%-18s%-20s", `np:`, "" + np));

  // Now that we have an even number of plauyers, the number of rounds is the
  // number of players minus one
  const rounds = circleParams.rounds;
  // console.log(printf("%-18s%-20s", `rounds:`, "" + rounds));

  // save the number of games per round
  const gamesPerRound = circleParams.gamesPerRound;
  // console.log(printf("%-18s%-20s", `gamesPerRound:`, "" + gamesPerRound));

  // Populate the supporting array, players
  const players: number[] = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push(i);
  }
  // Insert a ghost player, if needed
  if ((numberOfPlayers % 2 === 1)) {
      players.push(numberOfPlayers);
  }
  // console.log(printf("%-18s%-20s", `players:`, JSON.stringify(players)));

  const top: number[] = [];
  const bottom: number[] = [];
  let printTop: string = "";
  let printBottom: string = "";

  // Assign the first half of the players to the top array and the second half
  // to the bottom array
  for (let i = 0; i < adjustedNumberOfPlayers / 2; i++) {
      top.push(players[i]);
      bottom.push(players[(adjustedNumberOfPlayers - 1) - i]);
  }

  printTop    = printf("%-18s", "top:");
  printTop    += printf("%1s", "[")
  printBottom = printf("%-18s", "bottom:");
  printBottom += printf("%1s", "[")
  for (let i  = 0; i < top.length; i++) {
    printTop    += printf("%3d", top[i])
    printBottom += printf("%3d", bottom[i]);
  }
  printTop    += printf("%1s", "]")
  printBottom += printf("%1s", "]")

  // console.log(printf(printTop));
  // console.log(printf(printBottom));

  // Pair the first round
  let tournamentRound: TournamentRound;

  for (let j = 0; j < rounds; j++) {
    tournamentRound = {games: []}
    for (let i = 0; i < adjustedNumberOfPlayers / 2; i++) {
      if (top[i] !== ghostPlayer && bottom[i] !== ghostPlayer) {
          // both are playing real opponents
          tournamentRound.games.push({"whitePiecesPlayer": top[i], "blackPiecesPlayer": bottom[i]});
        } else {
        if (top[i] === ghostPlayer) {
          // bottom[i] cell refers to the round's bye player
          tournamentRound.byePlayer = bottom[i];
        } else {
          // top[i] cell refers to the round's bye player
          tournamentRound.byePlayer = top[i];
        }
      }
    }
    // console.log("\nround " + j + ": " + JSON.stringify(tournamentRound));
    // Take the leftmost bottom element and insert as the second top element;
    // Take the right most top element and append to the bottom
    tournamentRounds.push(tournamentRound)
    top.splice(1,0,bottom.shift());
    bottom.push(top.pop());
  }

  return tournamentRounds;
};

export const calculateCircleParams = (numberOfPlayers: number): CircleParams => {
  let circleParams: CircleParams = {
    ghostPlayer: Number.MIN_SAFE_INTEGER,
    adjustedNumberOfPlayers: Number.MIN_SAFE_INTEGER,
    rounds: Number.MIN_SAFE_INTEGER,
    gamesPerRound: Number.MIN_SAFE_INTEGER
  };

    // Add a ghostPlayer if numberOfPlayers is odd
    circleParams.ghostPlayer = numberOfPlayers % 2 === 0 ? Number.MAX_VALUE : numberOfPlayers;
    // console.log(printf("%-18s%-20s", `ghostPlayer:`, (ghostPlayer === Number.MAX_VALUE) ? "No ghostPlayer" : "" + "Yes: " + ghostPlayer));

    // save the working number of players, accounting for the ghostPlayer
    circleParams.adjustedNumberOfPlayers = numberOfPlayers % 2 === 0 ? numberOfPlayers : numberOfPlayers + 1;
    // console.log(printf("%-18s%-20s", `np:`, "" + np));

    // Now that we have an even number of plauyers, the number of rounds is the
    // number of players minus one
    circleParams.rounds = circleParams.adjustedNumberOfPlayers - 1;
    // console.log(printf("%-18s%-20s", `rounds:`, "" + rounds));

    // save the number of games per round
      circleParams.gamesPerRound = numberOfPlayers % 2 === 0 ? (numberOfPlayers / 2) : (numberOfPlayers - 1) / 2;
    // console.log(printf("%-18s%-20s", `gamesPerRound:`, "" + gamesPerRound));

    return circleParams
}

/*
Chess Tournament - Simple Round Robin pairings
6        |----------------------------------
players  | Games
---------|---------|---------|---------|---
rounds   |    01   |    02   |    03   | Bye
---------|---------|---------|---------|----
round 1  | 01 - 02 |         |         | 1
---------|---------|---------|---------|----
round 2  |         |         |         |
---------|---------|---------|---------|----
round 3  |         |         |         |
---------|---------|---------|---------|----
round 4  |         |         |         |
---------|---------|---------|---------|----
round 5  |         |         |         |
---------|---------|---------|---------|----
*/

export const showPairings = (tournament: Tournament): void => {
    const circleParams: CircleParams = calculateCircleParams(tournament.numberOfPlayers);
    const numberOfPlayers = tournament.numberOfPlayers;
    const rounds = circleParams.rounds;
    const ghostPlayer = circleParams.ghostPlayer;
    const gamesPerRound = circleParams.gamesPerRound;
    const tournamentRounds = tournament.tournamentRounds;
    // console.log(`tournamentRounds: ` + JSON.stringify(tournamentRounds));

    let printLine: string = "";
    // console.log(`showPairings/rounds: ${rounds}`);
    // console.log(`showPairings/roundGames: ${gamesPerRound}`);
    // console.log(`showPairings/ghostPlayer: ${ghostPlayer}`);

    console.log(`\nChess Tournament - Simple Round Robin pairings for ${ghostPlayer} players`);
    printLine = "";
    for (let i = 0; i <= gamesPerRound; i++) {
        printLine += printf("%10s", "----------|");
    }
    if (ghostPlayer !== Number.MAX_VALUE) {
        printLine += printf("%10s", "----------|");
    }
    console.log(printLine);
    printLine = printf("%-10s", "rounds    |");
    for (let i = 0; i < gamesPerRound; i++) {
        const gameNumberString = i + 1 < 10 ? "0" + (i + 1) : "" + (i + 1);
        printLine += printf("%4s%-2s%4s%s", " ", gameNumberString, " ", "|");
    }
    if (ghostPlayer !== Number.MAX_VALUE) {
      printLine += printf("%4s%-3s%3s%s", " ", "Bye", " ", "|");
    }
    console.log(printLine);
    printLine = "";
    for (let i = 0; i <= gamesPerRound; i++) {
        printLine += printf("%10s", "----------|");
    }
    if (ghostPlayer !== Number.MAX_VALUE) {
        printLine += printf("%10s", "----------|");
    }
    console.log(printLine);
    for (let i = 0; i < rounds; i++) {
        const tournamentRound: TournamentRound = tournamentRounds[i];
        // console.log(`tournamentRound: ` + JSON.stringify(tournamentRound));
        const games: Games = tournamentRound.games;
        // console.log(`tournamentRound games: ` + JSON.stringify(games));
        printLine = printf("%s%-2d%s", "round ", i + 1, "  |");
        for (let j = 0; j < gamesPerRound; j++) {
            // printLine += printf("%10s", "          |");
            const game: Game = games[j];
            // console.log(`tournamentRound game: ` + JSON.stringify(game));
            const whitePiecesPlayer: number = game.whitePiecesPlayer;
            const blackPiecesPlayer: number = game.blackPiecesPlayer;
            printLine += printf("%2s%-2d%3s%-2d%2s", " ", whitePiecesPlayer, " - ", blackPiecesPlayer, " |");
        }
        if (ghostPlayer !== Number.MAX_VALUE) {
          printLine += printf("%4s%2s%5s", " ", "" + tournamentRound.byePlayer, "|");
        }
        console.log(printLine);
        printLine = "";
        for (let j = 0; j <= gamesPerRound; j++) {
            printLine += printf("%10s", "----------|");
        }
        if (ghostPlayer !== Number.MAX_VALUE) {
            printLine += printf("%10s", "----------|");
        }
        console.log(printLine);
    }
    console.log("\n");
};
