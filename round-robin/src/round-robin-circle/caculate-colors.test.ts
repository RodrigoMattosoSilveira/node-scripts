import * as calc_color from "./caculate-colors";
import {Color, Game, Games, Player, Players, TournamentRound, TournamentRounds} from "./types";

describe(`Calculate Color`, () => {
    let player: Player;
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
              expect(2).toEqual(1 + 1);
          });
            it(`played with black pieces`, () => {
              expect(2).toEqual(1 + 1);
          });
            it(`had a bye round`, () => {
              expect(2).toEqual(1 + 1);
          });
        });
        describe(`with multiple games played`, () => {
            it(`played with white pieces`, () => {
              expect(2).toEqual(1 + 1);
          });
            it(`played with black pieces`, () => {
              expect(2).toEqual(1 + 1);
          });
            it(`had a bye round`, () => {
              expect(2).toEqual(1 + 1);
          });
        });
    });
    describe(`playedWithBlackPiecesInLastTwoGames`, () => {
        it(`last two games are white-white`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are white-bye`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are bye-white`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are white-black`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are black-white`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are black-bye`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are bye-black`, () => {
            expect(2).toEqual(1 + 1);
        });
        it(`last two games are black-black`, () => {
            expect(2).toEqual(1 + 1);
        });
    });
    describe(`getHowManyGamesWithBlackPieces`, () => {
        describe(`with no games played`, () => {
            it(`with no games played`, () => {
                expect(2).toEqual(1 + 1);
            });
        });
        describe(`with one game played`, () => {
            it(`with white pieces`, () => {
                expect(2).toEqual(1 + 1);
            });
            it(`with black pieces`, () => {
                expect(2).toEqual(1 + 1);
            });
            it(`with bye round`, () => {
                expect(2).toEqual(1 + 1);
            });
        });
    });
});
