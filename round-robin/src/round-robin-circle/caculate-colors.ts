/**
 * Given a scheduled round robin tournament, it attempts to balance the number
 * of times its players play with white and black pieces.
 *
 * It assumes player 0 is the highest rated player, player 1 is the second
 * highest rated player, and so forth.
 *
 * It allocates the first round colors based on players' ratings, with the
 * highest rated player playing black pieces;
 *
 * From then on it attempts to allocate the black pieces to a player who played
 * with the white pieces in the prevous round, and the white pieces to a player
 * who played with the black pieces in the previous round.
 *
 * If it allocates the same color pieces to both player, it allocated the white
 * pieces to the lowest ranked player and the black pieces to the highest
 * ranked;
 *
 * If one of the players played the same color twice, it switches the players'
 * colors.
 *
 * In cases where two players played the same color twice, it assigns the white
 * pieces to the lowest rated player and the black pieces to the highest rated
 * player;
 */

import printf from "printf";
import { BLACK_PIECES, Player, Tournament} from "./types";

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param {numberOfPlayers: number} - The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateColors = (tournament: Tournament): void => {
    // Allocate round 1.  It allocates the first round colors based on players'
    // ratings, with the highest rated player playing black pieces;
};

/**
 * playedWithBlackPiecesInLastGame - Asserts whether the player played with
 * the black pieces in the last game
 *
 * @param  {Player} player the player
 * @return {boolean} true if the  player played with the black pieces in the
 * last game; false otherwise
 */
export const playedWithBlackPiecesInLastGame = (player: Player): boolean => {
    const ppcl = player.pieceColors.length;
    // console.log(`playedWithBlackPiecesInLastGame/player: ` + JSON.stringify(player));
    return  ppcl === 0 ? false : player.pieceColors[ppcl - 1] === BLACK_PIECES;
};

/**
 * playedWithBlackPiecesInLastTwoGames - Asserts whether the player played with
 * the black pieces in the last two games
 *
 * @param  {Player} player the player
 * @return {boolean} true if the  player played with the black pieces in the
 * last two games; false otherwise
 */
export const playedWithBlackPiecesInLastTwoGames = (player: Player): boolean => {
    let returnVal: boolean;
    const ppcl = player.pieceColors.length;
    if (ppcl < 2) {
        returnVal =  false;
    } else {
        const lastTwoGames = player.pieceColors.slice(-2);
        const lastTwoGamesAcc = lastTwoGames.reduce((acc: number, el: number ) => acc += el);
        returnVal = (lastTwoGamesAcc === (BLACK_PIECES + BLACK_PIECES));
    }
    return returnVal;
};

/**
 * getHowManyGamesWithBlackPieces - calculates how many time the `player` played
 * with the black pieces.
 *
 * @param  {Player} player the player
 * @return {number} the number of time the player played with the black pieces
 */
export const getHowManyGamesWithBlackPieces = (player: Player): number => {
    let timesWithBlack: number = 0;
    // console.log(`getHowManyGamesWithBlackPieces/player: ` + JSON.stringify(player));
    player.pieceColors.forEach( (el) => el === BLACK_PIECES ? timesWithBlack += el : timesWithBlack += 0);
    return Math.abs(timesWithBlack);
};
