
const bergerTables = require("./berger-tables.json");
import { BergerTable,
	Games,
	PlayerGamesInRound,
	PlayerGamesInRounds,
	PlayersGamesInTournament } from "./types";

describe(`Berger Tables`, (): void => {
	let numberOfPlayers: number;
	let foundTable: boolean;
	let bergerTable: BergerTable;
	let numberOfRounds: number;
	let numberOfGamesPerRound: number;
	let playerGamesInRound: PlayerGamesInRound;
	let playerGamesInRounds: PlayerGamesInRounds;
	let tournamentRounds: Games[];
	let tournamentRound: Games;
	let playersGamesInTournament: PlayersGamesInTournament;
	let expectedPlayerGamesInRounds: PlayerGamesInRounds;
	let expectedPlayersGamesInTournament: PlayersGamesInTournament;

	describe(`4 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 4;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 4 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 4 players plays in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`6 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 6;
        });
		it(`has 6 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
	describe(`8 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 8;
        });
		it(`has 8 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
	describe(`10 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 10;
        });
		it(`has 10 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
	describe(`12 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 12;
        });
		it(`has 12 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
	describe(`14 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 14;
        });
		it(`has 14 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
	describe(`16 players`, (): void => {
		beforeAll(() => {
          numberOfPlayers = 16;
        });
		it(`has 16 players table`, (): void => {
			foundTable = false;
			for (let i = 0; i < bergerTables.length; i++) {
				bergerTable = bergerTables[i];
				if (bergerTable.players === numberOfPlayers) {
					foundTable = true;
					break;
				}
			}
			expect(foundTable).toEqual(true);
		});
	});
});
const getBergerTable = (numberOfPlayers: number): BergerTable => {
	let bergerTable: BergerTable;
	for (let i = 0; i < bergerTables.length; i++) {
		bergerTable = bergerTables[i];
		if (bergerTables[i].players === numberOfPlayers) {
			bergerTable = bergerTables[i]
			break;
		}
	}
	return bergerTable;
}
const fillPlayersGamesInTournament = (numberOfPlayers: number, numberOfRounds: number, filler: number): PlayersGamesInTournament => {
	let playersGamesInTournament = new Array(numberOfPlayers);;

	for (let player = 0; player < numberOfPlayers; player ++) {
		playersGamesInTournament[player] = new Array(numberOfRounds).fill(filler);
	}
	return playersGamesInTournament;
}
const calculatePlayersGamesInTournament = (numberOfPlayers: number,
	numberOfRounds: number,
	tournamentRounds: Games[]): PlayersGamesInTournament => {

	let playersGamesInTournament: PlayersGamesInTournament = [];
	for (let player = 0; player < numberOfPlayers; player ++) {
		playersGamesInTournament[player] = new Array(numberOfRounds).fill(0);
	}

	for (let round = 0; round < tournamentRounds.length; round++) {
		const tournamentRound: Games = tournamentRounds[round];
		console.log("tournamentRound: " + JSON.stringify(tournamentRound));
		for (let j = 0; j < tournamentRound.length; j ++) {
			const game = tournamentRound[j];
			console.log("game: " + JSON.stringify(game));
			playersGamesInTournament[game.whitePiecesPlayer][round]++
			playersGamesInTournament[game.blackPiecesPlayer][round]++
			console.log("playersGamesInTournament: " + JSON.stringify(playersGamesInTournament));
		}
	}

	return playersGamesInTournament;
}
