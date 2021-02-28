/**
 * An algorithm to generate a schedule for a round robin chess tournament:
 * (1) Every player must play every other player;
 * (2) Each player can be involved in at most one game per round;
 * (3) If during a round player i plays player j, then during that same round player j
 *     plays player i.
 */
// import fs from "fs";
// import axios from 'axios';
import printf from "printf";
import yargs from "yargs";

// import * as calculator from "./calculator";
import * as rrc_calculator from "./round-robin-circle/calculator-circle";
import {Player, Players, Tournament} from "./round-robin-circle/types";

let numberOfPlayers: number = 0;

// Login
console.log(`Round Robin@0.0.1`);

// Show number of players
const input = yargs.argv;
numberOfPlayers = Number(input.players);
console.log(printf("%-18s%-20s", `numberOfPlayers:`, "" + numberOfPlayers));

// Calculate and show the hard-coded schedule
// schedule = calculator.calculateHard();
// calculator.showResults(tournamentPlayers, schedule);

// Calculate and show the schedule
// schedule = calculator.calculate(tournamentPlayers);
// calculator.showResults(tournamentPlayers, schedule);
// calculator.showPairings(tournamentPlayers, schedule);
const generatePlayers = (np: number): Players => {
    const players: Players = [];
    for (let i = 0; i < np; i++) {
        const player: Player = { id: i, rating: 1, pieceColors: []};
        players.push({...player});
    }
    return players;
};
const tournament: Tournament = {numberOfPlayers: 0, players: [], tournamentRounds: [], type: ""};

tournament.type = "round-robin";
tournament.players = generatePlayers(numberOfPlayers);
tournament.numberOfPlayers = numberOfPlayers;
tournament.tournamentRounds = rrc_calculator.calculateCircleMethod(numberOfPlayers);
rrc_calculator.showPairings(tournament);
