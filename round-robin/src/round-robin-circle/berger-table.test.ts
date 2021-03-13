
const bergerTables = require("./berger-tables.json");
import { BergerTable,
	Game,
	Games,
	PlayerGamesInRound,
	PlayerGamesInRounds,
	PlayersGamesInTournament,
	PlayersOpenentsInTournament,
	PlayersPieceAssignment } from "./types";

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
	let playersPieceAssignments: PlayersPieceAssignment;


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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("04 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`generate the correct  expected playersOponentsInTournament`, (): void => {
			expect(expectedPlayersOponentsInTournament).toEqual([[1,2,3],[0,2,3],[0,1,3],[0,1,2]]);
		});
		it(`has 4 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 4 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 4 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 4 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("06 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`has 6 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 6 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 6 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 6 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("08 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`has 8 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 8 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 8 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 8 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("10 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`has 10 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 10 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 10 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 10 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("12 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`has 12 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 12 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 12 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 12 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("14 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
    });
		it(`has 14 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 14 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 14 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 14 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
			expectedPlayersOponentsInTournament = fillPlayersOpponentsInTournament(numberOfPlayers, numberOfRounds);
			// console.log("expectedPlayersOponentsInTournament: " + JSON.stringify(expectedPlayersOponentsInTournament));
			playersOpponentsInTournament = calculatePlayerOpponentsInTournament(numberOfPlayers, tournamentRounds);
			// console.log("playersOpponentsInTournament: " + JSON.stringify(playersOpponentsInTournament));
			playersPieceAssignments = calculatePlayersPieceAssignment(numberOfPlayers, tournamentRounds);
			// console.log("16 playersPieceAssignments: " + JSON.stringify(playersPieceAssignments));
        });
		it(`has 16 players table`, (): void => {
			expect(bergerTable).toBeTruthy;
		});
		it(`all 16 players play in all rounds`, (): void => {
			expect(playersGamesInTournament).toEqual(expectedPlayersGamesInTournament);
		});
		it(`all 16 players play each other`, (): void => {
			expect(playersOpponentsInTournament).toEqual(expectedPlayersOponentsInTournament);
		});
		it(`all 16 players play a balanced number of games with white and black pieces`, (): void => {
			let isBalanced = playersPieceAssignments.reduce((accumulator, currentValue) => {
			  return accumulator && Math.abs(currentValue) < 2
		  }, true)
			expect(isBalanced).toBe(true)
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
};

const fillPlayersGamesInTournament = (numberOfPlayers: number, numberOfRounds: number, filler: number): PlayersGamesInTournament => {
	let playersGamesInTournament = new Array(numberOfPlayers);;

	for (let player = 0; player < numberOfPlayers; player ++) {
		playersGamesInTournament[player] = new Array(numberOfRounds).fill(filler);
	}
	return playersGamesInTournament;
};

const fillPlayersOpponentsInTournament = (numberOfPlayers: number, numberOfRounds: number): PlayersGamesInTournament => {
	let playersGamesInTournament = new Array();
	for (let player = 0; player < numberOfPlayers; player ++) {
		playersGamesInTournament[player] = new Array();
		for (let opponent = 0; opponent < numberOfPlayers; opponent++) {
			if (opponent !== player ) {
				playersGamesInTournament[player].push(opponent);
			}
		}
	}
	return playersGamesInTournament;
};

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
};

/**
 * calculatePlayerOpponentsInTournament: PlayersOpenentsInTournament
 * Builds an array of arrays, hosting the ids of each player's opponents
 *
 * @param {number} numberOfPlayers
 * @param {Games[]} tournamentRounds
 */
const calculatePlayerOpponentsInTournament = (
	numberOfPlayers: number,
	tournamentRounds: Games[]): PlayersOpenentsInTournament => {

	let playersOpenentsInTournament: PlayersOpenentsInTournament = new Array();
	for (let player = 0; player < numberOfPlayers; player ++) {
		playersOpenentsInTournament[player] = new Array();
	}

	for (let round = 0; round < tournamentRounds.length; round++) {
		const tournamentRound: Games = tournamentRounds[round];
		// console.log("tournamentRound: " + JSON.stringify(tournamentRound));
		for (let j = 0; j < tournamentRound.length; j ++) {
			const game = tournamentRound[j];
			// console.log("game: " + JSON.stringify(game));
			playersOpenentsInTournament[game.whitePiecesPlayer].push(game.blackPiecesPlayer);
			playersOpenentsInTournament[game.blackPiecesPlayer].push(game.whitePiecesPlayer);
			// console.log("playersGamesInTournament: " + JSON.stringify(playersGamesInTournament));
		}
	}

	for (let player = 0; player < numberOfPlayers; player ++) {
		playersOpenentsInTournament[player].sort((a,b) => a - b);
	}

	return playersOpenentsInTournament;
};

/**
 * calculatePlayersPieceAssignment: PlayersPieceAssignment
 * Calculates the balance of games played by each player with each color
 *
 * @param {number} numberOfPlayers
 * @param {Games[]} tournamentRounds
 */
const calculatePlayersPieceAssignment = (
	numberOfPlayers: number,
	tournamentRounds: Games[]): PlayersPieceAssignment => {

	let playersPieceAssignments: PlayersPieceAssignment = new Array(numberOfPlayers).fill(0);

	tournamentRounds.forEach((tournamentRound: Games) => {
		tournamentRound.forEach((game: Game) => {
			playersPieceAssignments[game.whitePiecesPlayer] += 1;
			playersPieceAssignments[game.blackPiecesPlayer] += -1;
		})
	})
	return playersPieceAssignments;
};
