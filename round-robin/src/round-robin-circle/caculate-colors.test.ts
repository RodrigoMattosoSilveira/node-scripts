import * as calc_color from "./caculate-colors";
import {BLACK_PIECES,
    Color,
    Game,
    NO_PIECES,
    Player,
    WHITE_PIECES,
 } from "./types";

describe(`Calculate Color`, () => {
    let player: Player;
    let player1: Player;
    let player2: Player;
    let assignedColor: Color;
    let game: Game;
    describe(`playedWithBlackPiecesInLastGame`, () => {
        it(`whith no games played`, () => {
            player = {
                id: 1,
                pieceColors: new Array<Color>(),
                rating: 1,
            };
            expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(false);
      });
        describe(`with one game played`, () => {
            it(`played with white pieces`, () => {
                player = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
                // console.log(`playedWithBlackPiecesInLastGame/player: ` + JSON.stringify(player));
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(false);
            });
            it(`played with black pieces`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(true);
            });
            it(`had a bye round`, () => {
                player = { id: 1, pieceColors: [NO_PIECES], rating: 1};
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(false);
            });
        });
        describe(`with multiple games played`, () => {
            it(`played with WHITE_PIECES, BLACK_PIECES`, () => {
                player = { id: 1, pieceColors: [WHITE_PIECES, BLACK_PIECES], rating: 1};
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(true);
            });
            it(`played with BLACK_PIECES WHITE_PIECES`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES, WHITE_PIECES], rating: 1};
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(false);
            });
            it(`had a bye round`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES, NO_PIECES], rating: 1};
                expect(calc_color.playedWithBlackPiecesInLastGame(player)).toEqual(false);
          });
        });
    });
    describe(`playedWithBlackPiecesInLastTwoGames`, () => {
        it(`last two games are white-white`, () => {
            player = { id: 1, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are white-bye`, () => {
            player = { id: 1, pieceColors: [WHITE_PIECES, NO_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are bye-white`, () => {
            player = { id: 1, pieceColors: [NO_PIECES, WHITE_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are white-black`, () => {
            player = { id: 1, pieceColors: [WHITE_PIECES, BLACK_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are black-white`, () => {
            player = { id: 1, pieceColors: [BLACK_PIECES, WHITE_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are black-bye`, () => {
            player = { id: 1, pieceColors: [BLACK_PIECES, NO_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are bye-black`, () => {
            player = { id: 1, pieceColors: [NO_PIECES, BLACK_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(false);
        });
        it(`last two games are black-black`, () => {
            player = { id: 1, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 1};
            expect(calc_color.playedWithBlackPiecesInLastTwoGames(player)).toEqual(true);
        });
    });
    describe(`getHowManyGamesWithBlackPieces`, () => {
        describe(`with no games played`, () => {
            it(`with no games played`, () => {
                player = { id: 1, pieceColors: [], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(0);
            });
            it(`with one games played, with black pieces`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(1);
            });
            it(`with two games played, with black &  while pieces`, () => {
                player = { id: 1, pieceColors: [WHITE_PIECES, BLACK_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(1);
            });
            it(`with two games played, with black &  while pieces`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES, WHITE_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(1);
            });
            it(`with two games played, with black pieces`, () => {
                player = { id: 1, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(2);
            });
            it(`with two games played, with black pieces`, () => {
                player = { id: 1, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(0);
            });
            it(`with may games played, with mixed pieces`, () => {
                player = { id: 1, pieceColors: [WHITE_PIECES, BLACK_PIECES, WHITE_PIECES, BLACK_PIECES], rating: 1};
                expect(calc_color.getHowManyGamesWithBlackPieces(player)).toEqual(2);
            });
        });
    });
    describe(`flipPlayerPiecesColor`, () => {
        it(`with no games played and a WHITE_PIECES assignment`, () => {
            assignedColor = WHITE_PIECES;
            player = { id: 1, pieceColors: [], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(WHITE_PIECES);
        });
        it(`with no games played and a BLACK_PIECES assignment`, () => {
            assignedColor = BLACK_PIECES;
            player = { id: 1, pieceColors: [], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(BLACK_PIECES);
        });
        it(`with a bye round played and a WHITE_PIECES assignment`, () => {
            assignedColor = WHITE_PIECES;
            player = { id: 1, pieceColors: [NO_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(WHITE_PIECES);
        });
        it(`with a bye round played and a BLACK_PIECES assignment`, () => {
            assignedColor = BLACK_PIECES;
            player = { id: 1, pieceColors: [NO_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(BLACK_PIECES);
        });
        it(`with a gameplayed as WHITE_PIECES and a WHITE_PIECES assignment`, () => {
            assignedColor = WHITE_PIECES;
            player = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(BLACK_PIECES);
        });
        it(`with a gameplayed as WHITE_PIECES and a BLACK_PIECES assignment`, () => {
            assignedColor = BLACK_PIECES;
            player = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(BLACK_PIECES);
        });
        it(`with a gameplayed as BLACK_PIECES and a WHITE_PIECES assignment`, () => {
            assignedColor = WHITE_PIECES;
            player = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(WHITE_PIECES);
        });
        it(`with a gameplayed as BLACK_PIECES and a BLACK_PIECES assignment`, () => {
            assignedColor = BLACK_PIECES;
            player = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
            expect(calc_color.flipPlayerPiecesColor(assignedColor, player)).toEqual(WHITE_PIECES);
        });
    });
    describe(`calculateGameColors`, () => {
        describe(`no games played`, () => {
            it(`both players playig their first game`, () => {
                player1 = { id: 1, pieceColors: [], rating: 1};
                player2 = { id: 2, pieceColors: [], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
        });
        describe(`one game played`, () => {
            it(`player1 had a bye and player2 played WHITE_PIECES`, () => {
                player1 = { id: 1, pieceColors: [NO_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [WHITE_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 had a bye and player2 played BLACK_PIECES`, () => {
                player1 = { id: 1, pieceColors: [NO_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [BLACK_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 played WHITE_PIECES and player2 had a bye`, () => {
                player1 = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [NO_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 played BLACK_PIECES and player2 had a bye`, () => {
                player1 = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [NO_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 played WHITE_PIECES and player2 played WHITE_PIECES`, () => {
                player1 = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [WHITE_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 played WHITE_PIECES and player2 played BLACK_PIECES`, () => {
                player1 = { id: 1, pieceColors: [WHITE_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [BLACK_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player2.id);
                expect(game.blackPiecesPlayer).toEqual(player1.id);
            });

            it(`player1 played BLACK_PIECES and player2 played BLACK_PIECES`, () => {
                player1 = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [BLACK_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 played BLACK_PIECES and player2 played WHITE_PIECES`, () => {
                player1 = { id: 1, pieceColors: [BLACK_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [WHITE_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
        });
        describe(`two games played`, () => {
            it(`player1 WW and player2 WW`, () => {
                player1 = { id: 1, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 WW and player2 BB`, () => {
                player1 = { id: 1, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player2.id);
                expect(game.blackPiecesPlayer).toEqual(player1.id);
            });
            it(`player1 BB and player2 WW`, () => {
                player1 = { id: 1, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [WHITE_PIECES, WHITE_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
            it(`player1 BB and player2 BB`, () => {
                player1 = { id: 1, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 1};
                player2 = { id: 2, pieceColors: [BLACK_PIECES, BLACK_PIECES], rating: 2};
                game = calc_color.calculateGameColors(player1, player2);
                expect(game.whitePiecesPlayer).toEqual(player1.id);
                expect(game.blackPiecesPlayer).toEqual(player2.id);
            });
        });
    });
});
