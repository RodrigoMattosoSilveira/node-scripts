/**
 * An algorithm to generate a schedule for a round robin chess tournament:
 * (1) Every player must play every other player;
 * (2) Each player can be involved in at most one game per round;
 * (3) If during a round player i plays player j, then during that same round player j
 *     plays player i.
 */

import printf from "printf";

export const calculate = (tournamentPlayers: number): number[][] => {
    const pairings: number[][] = [];

    /* roundGames (m) is the lowest even number greater than or equal to players. */
    const roundGames: number = tournamentPlayers % 2 !== 0 ? tournamentPlayers + 1 : tournamentPlayers;

    /* If the number of teams is even, requires n-1 rounds; if odd, requires n. */
    const rounds = tournamentPlayers % 2 === 0 ? tournamentPlayers - 1 : tournamentPlayers;

    // console.log(`calculate/tournamentPlayers: ${tournamentPlayers}`);
    // console.log(`calculate/m: ${roundGames}`);
    // console.log(`calculate/rounds: ${rounds}`);

    // fill up the array with -1
    for (let i = 0; i < rounds; i++) {
        pairings[i] = [];
        for (let j = 0; j < roundGames; j++) {
            pairings[i][j] = -1;
        }
    }

    /* Fill in the table with a nice diagonal pattern. */
    for (let r = 0; r < rounds; r++) {
        for (let i = 0; i < r; i++) {
            pairings[r][i] = ((rounds + r - i + 1) + roundGames) % roundGames;
        }
        for (let i = r; i < tournamentPlayers; i++) {
            pairings[r][i] = ((rounds + r - i) + roundGames) % roundGames;
        }
    }

    /* Now, do knight-like moves with the 0 in the first row. Every time the 0
    lands on a number, put that number in the first column. */
    let rr = 0;
    for (let i = roundGames - 2; i > 0; i--) {
        rr = ((rr - 2) + rounds) % rounds;
        pairings[rr][0] = pairings[rr][i];
        pairings[rr][i] = 0;
    }

    for (let i = 0; i < rounds; i++) {
        for (let j = 0; j < roundGames; j++) {
            if (pairings[i][j] !== -1) {
                pairings[i][j]++;
            }
        }
    }

    /* If m != n, then remove team n from all the games, and replace with -1. */
    if (roundGames !== tournamentPlayers) {
        for (let i = 0; i < rounds; i++) {
            pairings[i][i] = -1;
        }
    }
    // console.log(`roundRobin/players: ${players}`);
    return pairings;
};

/**
 * roundRobin - Compute the round-robin tournament schedule for n players. If n
 * is even, then there are n-1 rounds; if n is odd, there are n rounds and each
 * player is idle in exactly one round. A player being idle is indicated by the
 * schedule saying that it plays player number -1 in a round.
 *
 * It returns an array of rounds, with each round showing the players'
 * opponents, i.e., round[0] is player's 1 opponent, round[0] is player's 2
 * opponent, and so forth.
 *
 * This algorithm is incomplete, since it does not indicate the players' colors
 *
 * @return {type} Tournament Rounds Pairing
 */
export const calculateHard = (): number[][] => {
    const pairings: number[][] = [];

    // console.log(`roundRobin/players: ${players}`);

    // Hard coded results to
    //              1   2   3   4   5   6   7   9   9 10
    pairings.push([10,  9,  8,  7,  6,  5,  4,  3,  2, 1]); // 1
    pairings.push([ 6, 10,  9,  8,  7,  1,  5,  4,  3, 2]); // 2
    pairings.push([ 2,  1, 10,  9,  8,  7,  6,  5,  4, 3]); // 3
    pairings.push([ 7,  3,  2, 10,  9,  8,  1,  6,  5, 4]); // 4
    pairings.push([ 3,  4,  1,  2, 10,  9,  8,  7,  6, 5]); // 5
    pairings.push([ 8,  5,  4,  3,  2, 10,  9,  1,  7, 6]); // 6
    pairings.push([ 4,  6,  5,  1,  3,  2, 10,  9,  8, 7]); // 7
    pairings.push([ 9,  7,  6,  5,  4,  3,  2, 10,  1, 8]); // 8
    pairings.push([ 5,  8,  7,  6,  1,  4,  3,  2, 10, 9]); // 9
    // console.log(`roundRobin/lSchedule: ${JSON.stringify(lSchedule)}`);

    return pairings;
};
export const showResults = (tournamentPlayers: number, schedule: number[][]) => {
    let plc = printf("\n       player\n     \\ ");
    for (let i = 0; i < tournamentPlayers; i++) {
        plc += printf("%6d", i + 1);
    }
    console.log(plc);
    plc = printf("round \\");
    for (let i = 0; i < 6 * tournamentPlayers; i++) {
        plc += printf(".");
    }
    console.log(plc);
    let roundNumber = 0;
    for (const round of schedule) {
        roundNumber++;
        let result = printf("%d%s     ", roundNumber, ":");
        for (const player of round) {
            result += printf("%6d", player);
        }
        console.log(printf(result));
    }
    console.log("\n");
};
export const showPairings = (tournamentPlayers: number, schedule: number[][]): void => {
    const rounds = tournamentPlayers - 1;
    const roundGames = (tournamentPlayers % 2) === 0 ? tournamentPlayers / 2 : ((tournamentPlayers + 1) / 2);
    let printLine: string = "";
    console.log(`showPairings/rounds: ${rounds}`);
    console.log(`howPairings/roundGames: ${roundGames}`);

    console.log(`Chess Tournament - Simple Round Robin pairings`);
    printLine = printf("%-10s%s", tournamentPlayers, "|");
    for (let i = 0; i < roundGames; i++) {
        printLine += printf("%10s", "-----------");
    }
    console.log(printLine);
    printLine = printf("%-10s%s%2d", "players", "| Games per round: ", roundGames);
    console.log(printLine);
    printLine = "";
    for (let i = 0; i <= roundGames; i++) {
        printLine += printf("%10s", "----------|");
    }
    console.log(printLine);
    printLine = printf("%-10s", "rounds    |");
    for (let i = 0; i < roundGames; i++) {
        const gameNumberString = i + 1 < 10 ? "0" + (i + 1) : "" + (i + 1);
        printLine += printf("%4s%-2s%4s%s", " ", gameNumberString, " ", "|");
    }
    console.log(printLine);
    printLine = "";
    for (let i = 0; i <= roundGames; i++) {
        printLine += printf("%10s", "----------|");
    }
    console.log(printLine);
    for (let i = 0; i < rounds; i++) {
        printLine = printf("%s%-2d%s", "round ", i + 1, "  |");
        for (let j = 0; j < roundGames; j++) {
            // printLine += printf("%10s", "          |");
            if (schedule[i][j] !== -1) {
                printLine += printf("%2s%-2d%3s%-2d%2s", " ", j + 1, " - ", schedule[i][j], " |");
            } else {
                printLine += printf("%2s%-2d%4s%2s", " ", j + 1, " bye ", " |");
            }
        }
        console.log(printLine);
        printLine = "";
        for (let j = 0; j <= roundGames; j++) {
            printLine += printf("%10s", "----------|");
        }
        console.log(printLine);
    }
    console.log("\n");
};


/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. All competitors are assigned to numbers, and then
 * paired in the first round (assuming 10 players):
 * All competitors are assigned to numbers, and then paired in the first round
 * using a 10 players tournamenent
 *
 * Starting with player 1, assign n/2 playert to the top array, from left to
 * right, then assign players to the bottom array, from right to left;
 * Round 1
 * top:    00  01  02  03  04
 * bottom: 09  08  07  06  05
 *
 * Next, fix player 0 in the top array at position 0; slice the bottom's array
 * first element, 08, and slice it in the top array, after player 0; this moves
 * all remaining top array elements to the right, in a clockwise fashion:
 * top:    00  08  01  02  03  04
 * bottom: 09  07  06  05
 *
 * Next, pop the last element from the top array and push into to the bottom
 * array
 * Round 2
 * top:    00  09  01  02  03
 * bottom: 08  07  06  05  04
 *
 * Repeaat this process to complete all remaining rounds.
 *
 * In cases of an odd number of players, we add a ghost player; anyone playing
 * againt the ghost player have a roud bye. In the example above, player 09
 * would be player -1 and we would have:
 * Round 1
 * top:    00  01  02  03  04
 * bottom: -1  08  07  06  05
 *
 * and
 *
 * Round 2
 * top:    00  -1  01  02  03
 * bottom: 08  07  06  05  04
 *
 * meaning that in round 1, player 0 has a round bye, and in round 2 player 7
 * has a round bye.
 *
 * This leaves with the quetion of how to represent the rounds and their
 * pairings. We will use one array for each round, where an array cell index
 * represents the player number and the array's cell content their round's
 * opponent:
 * Round 1
 * top:    00  01  02  03  04
 * bottom: 09  08  07  06  05
 * round:  00  01  02  03  04  05  06  07  08  09 // index
 *         09  08  07  06  05  04  03  02  01  00 // content
 *
 * And
 *
 * Round 2
 * top:    00  09  01  02  03
 * bottom: 08  07  06  05  04
 * round:  00  01  02  03  04  05  06  07  08  09 // index
 *         08  06  05  04  03  02  01  09  00  07 // content
 *
 * @param {p: number} - The numbrt of round robin tournament players
 * @return {number[][]} An array of rounds, as explained above
 */
export const calculateCircleMethod = (p: number): Array<Array<string>> => {
  let round: string[];
  let pairings: Array<Array<string>> = [];
  let playerCollection: number[] = [];
  let players: number = 0;
  let rounds: number = 0;
  let roundGames: number =  0;
  let ghostPlayer: number = -1;
  let top: number[] = [];
  let bottom: number[] = [];


  for (let i = 0; i < p; i++ ) {
    playerCollection[i] = i
  }
  // Insert a ghost player, if needed
  if ((p % 2 === 1)) {
    // We have a ghost player
    playerCollection.push(p);
    ghostPlayer = p;
  }
  console.log(`playerCollection: ` + JSON.stringify(playerCollection));

  // The number of players is now the playerCollection length
  players = playerCollection.length;
  console.log(`players: ` + players);

  // Now that we have an even number of plauyers, the number of rounds allwauy
  // the number of players minus one
  rounds = players - 1


  // The  number of games per round is half of the number of players
  roundGames =  players / 2

  // Assign the first half of the players to the top array and the second half
  // to the botto array
  for (let i = 0; i < players/2; i++) {
    top.push(playerCollection[i]);
    bottom.push(playerCollection[(players - 1) - i])
  }
  console.log(`top: ` + JSON.stringify(top));
  console.log(`bottom: ` + JSON.stringify(bottom));
  console.log(`ghostPlayer: ` + ghostPlayer);

  // Pair the first round
  round = [];
  for (let i = 0; i < players/2; i ++) {
    let topPlayer: number = top[i];
    let topPlayerS = "" + (topPlayer < 10 ? "0" : "") + topPlayer;
    let bottomPlayer: number = bottom[i];
    let bottomPlayerS = "" + (bottomPlayer < 10 ? "0" : "") + bottomPlayer;
    let pairing: string = "";
    if (topPlayer !== ghostPlayer) {
      if (bottomPlayer !== ghostPlayer) {
        // neither is playig a ghost player
        pairing = printf("%2s%3s%2s", topPlayerS, " - ", bottomPlayerS);
      } else {
        // bottom player is a ghost player
        pairing = printf("%2s%5s", topPlayerS, "->bye");
      }
    } else {
      // top player is a ghost player
      pairing = printf("%2s%5s", bottomPlayerS, "->bye");
    }
      round.push(pairing);
  }
  console.log(`round 1:` + JSON.stringify(round));


  return pairings;
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
