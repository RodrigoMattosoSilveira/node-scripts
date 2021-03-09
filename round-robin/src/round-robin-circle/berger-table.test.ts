
const bergerTables = require("./berger-tables.json");
import { BergerTable,
	Games,
	PlayerGamesInRound,
	PlayerGamesInRounds,
	PlayersGamesInTournament,
	PlayersOpenentsInTournament } from "./types";

describe(`Berger Tables`, (): void => {
	let numberOfPlayers: number;
	let bergerTable: BergerTable;
	let numberOfRounds: number;
	let numberOfGamesPerRound: number;
	let tournamentRounds: Games[];
	let playersGamesInTournament: PlayersGamesInTournament;
	let expectedPlayersGamesInTournament: PlayersGamesInTournament;

	let playersOponentsInTournament: PlayersOpenentsInTournament;
	let expectedPlayersOponentsInTournament: PlayersOpenentsInTournament;
	let playersOpponentsInTournament: PlayersOpenentsInTournament = [];


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
			playersOpponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
        });
		it(`has 4 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 4 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 4 players play each other`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`6 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 6;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 6 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 6 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`8 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 8;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 8 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 8 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`10 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 10;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 10 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 10 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`12 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 12;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 12 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 12 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`14 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 14;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 14 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 14 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
	});
	describe(`16 players`, (): void => {
		beforeAll(() => {
			numberOfPlayers = 16;
			numberOfRounds = numberOfPlayers - 1;
			numberOfGamesPerRound = numberOfPlayers/2;

			playersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 0);
			expectedPlayersGamesInTournament = fillPlayersGamesInTournament(numberOfPlayers, numberOfRounds, 1);

			bergerTable = getBergerTable(numberOfPlayers);
			tournamentRounds = bergerTable.rounds;

			playersGamesInTournament = calculatePlayersGamesInTournament(numberOfPlayers, numberOfRounds, tournamentRounds);
        });
		it(`has 16 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 16 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
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

const fillPlayersOpponentsInTournament = (numberOfPlayers: number, numberOfRounds: number): PlayersGamesInTournament => {
	let playersGamesInTournament = new Array();;
	for (let player = 0; player < numberOfPlayers; player ++) {
		playersGamesInTournament[player] = new Array();
		for (let opponent = 0; opponent < numberOfPlayers; opponent++) {
			if (opponent !== player ) {
				playersGamesInTournament[player].push(opponent);
			}
		}
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
		// console.log("tournamentRound: " + JSON.stringify(tournamentRound));
		for (let j = 0; j < tournamentRound.length; j ++) {
			const game = tournamentRound[j];
			// console.log("game: " + JSON.stringify(game));
			playersGamesInTournament[game.whitePiecesPlayer][round]++
			playersGamesInTournament[game.blackPiecesPlayer][round]++
			// console.log("playersGamesInTournament: " + JSON.stringify(playersGamesInTournament));
		}
	}

	return playersGamesInTournament;
}

const calculatePlayerOpponentsInTournament = (numberOfPlayers: number,
	numberOfRounds: number,
	tournamentRounds: Games[]): PlayersOpenentsInTournament => {

	let playersOpenentsInTournament: PlayersOpenentsInTournament = [];
	for (let player = 0; player < numberOfPlayers; player ++) {
		playersOpenentsInTournament[player] = new Array(numberOfRounds).fill(0);
	}

	for (let round = 0; round < tournamentRounds.length; round++) {
		const tournamentRound: Games = tournamentRounds[round];
		console.log("tournamentRound: " + JSON.stringify(tournamentRound));
		for (let j = 0; j < tournamentRound.length; j ++) {
			const game = tournamentRound[j];
			console.log("game: " + JSON.stringify(game));
			playersOpenentsInTournament[game.whitePiecesPlayer].push(game.blackPiecesPlayer);
			playersOpenentsInTournament[game.blackPiecesPlayer].push(game.whitePiecesPlayer);
			// console.log("playersGamesInTournament: " + JSON.stringify(playersGamesInTournament));
		}
	}

	return playersOpenentsInTournament;
}
