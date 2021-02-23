/**
 * An algorithm to generate a schedule for a round robin chess tournament:
 * (1) Every player must play every other player;
 * (2) Each player can be involved in at most one game per round;
 * (3) If during a round player i plays player j, then during that same round player j
 *     plays player i.
 */
// import fs from "fs";
// import axios from 'axios';
import yargs from "yargs";

import * as calculator from "./calculator";

let tournamentPlayers: number = 0;
let schedule: number[][] = [];

// Login
console.log(`Round Robin@0.0.1`);

// Show number of players
const input = yargs.argv;
tournamentPlayers = Number(input.players);
console.log(`tournmentPlayers players: ${tournamentPlayers}`);

// Calculate and show the hard-coded schedule
// schedule = calculator.calculateHard();
// calculator.showResults(tournamentPlayers, schedule);

// Calculate and show the schedule
// schedule = calculator.calculate(tournamentPlayers);
// calculator.showResults(tournamentPlayers, schedule);
// calculator.showPairings(tournamentPlayers, schedule);
calculator.calculateCircleMethod(tournamentPlayers);
