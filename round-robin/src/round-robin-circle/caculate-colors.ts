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
import { BLACK_PIECES, Color, Game, NO_PIECES, Player, Tournament, WHITE_PIECES} from "./types";

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param  {number} numberOfPlayers The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateRoundRobinColors = (tournament: Tournament): void => {
    for (const tournamentRound of tournament.tournamentRounds) {
        let player1: Player;
        let player2: Player;
        for (let game of tournamentRound.games) {
            // console.log(`calculateRoundRobinColors before: ` + JSON.stringify(game));
            // get the players and their pirces' colors
            player1 = tournament.players.find((el) => game.whitePiecesPlayer === el.id);
            player2 = tournament.players.find((el) => game.blackPiecesPlayer === el.id);
            game = {...game, ...calculateGameColors(player1, player2)};
            // console.log(`calculateRoundRobinColors after: ` + JSON.stringify(game));

            // update the players pieceColors arrays
            console.log(`calculateRoundRobinColors player1 pieceColors before: ` + JSON.stringify(player1.pieceColors));
            if (game.whitePiecesPlayer === player1.id) {
                player1.pieceColors.push(WHITE_PIECES);
                player2.pieceColors.push(BLACK_PIECES);
            } else {
                player1.pieceColors.push(BLACK_PIECES);
                player2.pieceColors.push(WHITE_PIECES);
                console.log(`calculateRoundRobinColors player1 pieceColors after: ` + JSON.stringify(player1.pieceColors));
            }
        }
    }
};

/**
 * Selects colors for a game's players:
 * - Allocates WHITE_PIECES to the lowest ranking player and BLACK_PIECES to the
 *   highest one;
 * - It assigns colors based on the players based on their last game, flipping
 *   them;
 * - If both players end up with opposite colors we are done;
 * - It flips the color of a player playing with the BLACK_PIECES, if
 *   they played their last game with the BLACK_PIECES
 * - If both players end up with opposite colors we are done;
 * - It flips the color of a player playing with the BLACK_PIECES, if
 *   they played their last two game with the BLACK_PIECES;
 * - If both players end up with opposite colors we are done;
 * - Allocates WHITE_PIECES to the lowest ranking player and BLACK_PIECES to the
 *   highest one;
 *
 * @param  {Player} player1 A game player
 * @param  {Player} player2 A game player
 * @return {Game} A game
 *
 */
export const calculateGameColors = (player1: Player, player2: Player): Game => {
    const game: Game = {
        blackPiecesPlayer: Number.MAX_SAFE_INTEGER,
        whitePiecesPlayer: Number.MAX_SAFE_INTEGER,
    };
    let player1NextGameColor: number;
    let player2NextGameColor: number;

    // Allocates WHITE_PIECES to the lwer ranking player and BLACK_PIECES to
    // the higher ranking one;
    if (player1.rating <= player2.rating) {
        player1NextGameColor = WHITE_PIECES;
        player2NextGameColor = BLACK_PIECES;
    } else {
        player2NextGameColor = WHITE_PIECES;
        player1NextGameColor = BLACK_PIECES;
    }
    // console.log(`calculateGameColors/after rating: P1 - ` + player1NextGameColor + ", P2 - " + player2NextGameColor);

    // It assigns colors based on the players based on their last game, flipping
    // them;
    player1NextGameColor = flipPlayerPiecesColor(player1NextGameColor, player1);
    player2NextGameColor = flipPlayerPiecesColor(player2NextGameColor, player1);
    // console.log(`calculateGameColors/after flip: P1 - ` + player1NextGameColor + ", P2 - " + player2NextGameColor);

    // If both players end up with opposite colors we are done;
    // It flips the color of a player playing with the BLACK_PIECES, if
    // they played their last two game with the BLACK_PIECES;
    if (player1NextGameColor === player2NextGameColor ) {
        // Flip the color of the player with the black pieces, it they played
        // their last game with the black pieces
        if (player1NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastGame(player1)) {
            player1NextGameColor = WHITE_PIECES;
        }
        if (player2NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastGame(player2)) {
            player2NextGameColor = WHITE_PIECES;
        }

        // If both players end up with opposite colors we are done;
        // It flips the color of a player playing with the BLACK_PIECES, if
        // they played their last two game with the BLACK_PIECES;
        if (player1NextGameColor === player2NextGameColor ) {
            // Flip the color of the player with the black pieces, it they played
            // their last game with the black pieces
            if (player1NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastTwoGames(player1)) {
                player1NextGameColor = WHITE_PIECES;
            }
            if (player2NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastTwoGames(player2)) {
                player2NextGameColor = WHITE_PIECES;
            }
        }

        // If both players end up with opposite colors we are done;
        // Allocates WHITE_PIECES to the lower ranking player and BLACK_PIECES
        // to the higher ranking one;
        if (player1NextGameColor === player2NextGameColor ) {
            if (player1.rating <= player2.rating) {
                player1NextGameColor = WHITE_PIECES;
                player2NextGameColor = BLACK_PIECES;
            } else {
                player2NextGameColor = WHITE_PIECES;
                player1NextGameColor = BLACK_PIECES;
            }
        }
    }

    if (player1NextGameColor === WHITE_PIECES) {
        game.whitePiecesPlayer = player1.id;
        game.blackPiecesPlayer = player2.id;
    } else {
        game.whitePiecesPlayer = player2.id;
        game.blackPiecesPlayer = player1.id;
    }
    return game;
};

/**
 * flipPlayerPiecesColor - Reverses the pieces' color assigned to a player based
 * on their last game's pirces color. Keep the assigned color ff this is the
 * player's first game or the player had a round bye; flip otherwise
 *
 * @param  {Color} currentColor the player's current pieces' color
 * @param  {Player} player the player
 * @return {Color} The computed color
 */
export const flipPlayerPiecesColor = (currentColor: Color, player: Player): Color => {
    let color: Color;
    const ppcl = player.pieceColors.length;
    if (ppcl === 0 || player.pieceColors[ppcl - 1] === NO_PIECES) {
        color = currentColor;
    } else {
        if (player.pieceColors[ppcl - 1] === WHITE_PIECES) {
            color = BLACK_PIECES;
        } else {
            color = WHITE_PIECES;
        }
    }
    return color;
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
