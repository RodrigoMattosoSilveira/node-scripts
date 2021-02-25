/**
 * An algorithm to generate a schedule for a round robin chess tournament:
 * (1) Every player must play every other player;
 * (2) Each player can be involved in at most one game per round;
 * (3) If during a round player i plays player j, then during that same round player j
 *     plays player i.
 */

import printf from "printf";
import { TournamentRound, Game, TournamentRounds} from './types';

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param {numberOfPlayers: number} - The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateCircleMethod = (numberOfPlayers: number): TournamentRounds => {
  let tournamentRounds: TournamentRounds = [];

  console.log(printf("%-18s%-20s", `numberOfPlayers:`, "" + numberOfPlayers));

  // Add a ghostPlayer if numberOfPlayers is odd
  let ghostPlayer: number = numberOfPlayers % 2 === 0 ? Number.MAX_VALUE : numberOfPlayers;
  console.log(printf("%-18s%-20s", `ghostPlayer:`, (ghostPlayer === Number.MAX_VALUE) ? "No ghostPlayer" : "" + "Yes: " + ghostPlayer));

  // save the working number of players, accounting for the ghostPlayer
  let np: number = numberOfPlayers % 2 === 0 ? numberOfPlayers : numberOfPlayers + 1;;
  console.log(printf("%-18s%-20s", `np:`, "" + np));

  // Now that we have an even number of plauyers, the number of rounds is the
  // number of players minus one
  let rounds: number = numberOfPlayers % 2 === 0 ?  numberOfPlayers - 1 : numberOfPlayers - 1;
  console.log(printf("%-18s%-20s", `rounds:`, "" + rounds));

  // save the number of games per round
  let gamesPerRound: number = numberOfPlayers % 2 === 0 ? (numberOfPlayers / 2) : (numberOfPlayers - 1) / 2;
  console.log(printf("%-18s%-20s", `gamesPerRound:`, "" + gamesPerRound));

  // Populate the supporting array, players
  let players: number[] = [];
  for (let i = 0; i < numberOfPlayers; i++) {
    players.push(i);
  }
  // Insert a ghost player, if needed
  if ((numberOfPlayers % 2 === 1)) {
      players.push(numberOfPlayers);
  }
  console.log(printf("%-18s%-20s", `players:`, JSON.stringify(players)));

  let top: number[] = [];
  let bottom: number[] = [];
  let printTop: string = "";
  let printBottom: string = "";

  // Assign the first half of the players to the top array and the second half
  // to the bottom array
  for (let i = 0; i < np / 2; i++) {
      top.push(players[i]);
      bottom.push(players[(np - 1) - i]);
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

  console.log(printf(printTop));
  console.log(printf(printBottom));

  // Pair the first round
  let tournamentRound: TournamentRound = {
    games: []
  };

  for (let i = 0; i < np / 2; i++) {
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
  console.log(`round 1:` + JSON.stringify(tournamentRound));
  delete tournamentRound.byePlayer;

  // for (let i = 0; i < players / 2; i ++) {
  //   const topPlayer: number = top[i];
  //   const topPlayerS = "" + (topPlayer < 10 ? "0" : "") + topPlayer;
  //   const bottomPlayer: number = bottom[i];
  //   const bottomPlayerS = "" + (bottomPlayer < 10 ? "0" : "") + bottomPlayer;
  //   let pairing: string = "";
  //   if (topPlayer !== ghostPlayer) {
  //     if (bottomPlayer !== ghostPlayer) {
  //       // neither is playig a ghost player
  //       pairing = printf("%2s%3s%2s", topPlayerS, " - ", bottomPlayerS);
  //     } else {
  //       // bottom player is a ghost player
  //       pairing = printf("%2s%5s", topPlayerS, "->bye");
  //     }
  //   } else {
  //     // top player is a ghost player
  //     pairing = printf("%2s%5s", bottomPlayerS, "->bye");
  //   }
  //   round.push(pairing);
  // }
  console.log(`round 1:` + JSON.stringify(tournamentRounds));
  // console.log(printf("%-18s%-20s", "round 1: ", JSON.stringify(games)));

  return tournamentRounds;
};
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
