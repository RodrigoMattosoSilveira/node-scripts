import * as calc_color from "./caculate-colors";
import {BLACK_PIECES,
    Color,
    NO_PIECES,
    Player,
    WHITE_PIECES,
 } from "./types";

describe(`Calculate Color`, () => {
    let player: Player;
    let assignedColor: Color;
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
});
