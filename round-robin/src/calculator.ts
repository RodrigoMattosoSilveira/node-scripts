import printf from "printf";

export const calculate = (tournamentPlayers: number): number[][] => {
    const pairings: number[][] = [];

    /* m is the lowest even number greater than or equal to players. */
    const m: number = tournamentPlayers % 2 !== 0 ? tournamentPlayers + 1 : tournamentPlayers;

    /* If the number of teams is even, requires n-1 rounds; if odd, requires n. */
    const rounds = tournamentPlayers % 2 === 0 ? tournamentPlayers - 1 : tournamentPlayers;

    // console.log(`calculate/tournamentPlayers: ${tournamentPlayers}`);
    // console.log(`calculate/m: ${m}`);
    // console.log(`calculate/rounds: ${rounds}`);

    // fill up the array with -1
    for (let i = 0; i < rounds; i++) {
        pairings[i] = [];
        for (let j = 0; j < m; j++) {
            pairings[i][j] = -1;
        }
    }

    /* Fill in the table with a nice diagonal pattern. */
    for (let r = 0; r < rounds; r++) {
        for (let i = 0; i < r; i++) {
            pairings[r][i] = ((rounds + r - i + 1) + m) % m;
        }
        for (let i = r; i < tournamentPlayers; i++) {
            pairings[r][i] = ((rounds + r - i) + m) % m;
        }
    }

    /* Now, do knight-like moves with the 0 in the first row. Every time the 0
    lands on a number, put that number in the first column. */
    let rr = 0;
    for (let i = m - 2; i > 0; i--) {
        rr = ((rr - 2) + rounds) % rounds;
        pairings[rr][0] = pairings[rr][i];
        pairings[rr][i] = 0;
    }

    for (let i = 0; i < rounds; i++) {
        for (let j = 0; j < m; j++) {
            if (pairings[i][j] !== -1) {
                pairings[i][j]++
            }
        }
    }

    /* If m != n, then remove team n from all the games, and replace with -1. */
    if (m !== tournamentPlayers) {
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
    pairings.push([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
    pairings.push([6, 10, 9, 8, 7, 1, 5, 4, 3, 2]);
    pairings.push([2, 1, 10, 9, 8, 7, 6, 5, 4, 3]);
    pairings.push([7, 3, 2, 10, 9, 8, 1, 6, 5, 4]);
    pairings.push([3, 4, 1, 2, 10, 9, 8, 7, 6, 5]);
    pairings.push([8, 5, 4, 3, 2, 10, 9, 1, 7, 6]);
    pairings.push([4, 6, 5, 1, 3, 2, 10, 9, 8, 7]);
    pairings.push([9, 7, 6, 5, 4, 3, 2, 10, 1, 8]);
    pairings.push([5, 8, 7, 6, 1, 4, 3, 2, 10, 9]);
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
    const rounds = tournamentPlayers % 2 === 0 ? tournamentPlayers - 1 : tournamentPlayers;
    const roundGames = (tournamentPlayers % 2) === 0 ? tournamentPlayers / 2 : ((tournamentPlayers - 1) / 2);
    let printLine: string = "";

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
            printLine += printf("%10s", "          |");
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
/*
Chess Tournament - Simple Round Robin pairings
6        |----------------------------------
players  | Games
---------|---------|---------|---------|---
rounds   |    01   |    02   |    03   | Bye
---------|---------|---------|---------|----
round 1  |  1 - 2  |         |         |
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
