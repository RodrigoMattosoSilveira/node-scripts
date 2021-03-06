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
import { BLACK_PIECES, Color, Game, Games, NO_PIECES, Player, Tournament, WHITE_PIECES} from "./types";

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param  {number} numberOfPlayers The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateRoundRobinColors = (tournament: Tournament): void => {
    // console.log(`calculateRoundRobinColors/players: ` + JSON.stringify(tournament.players));
    for (const tournamentRound of tournament.tournamentRounds) {
        let player1: Player;
        let player2: Player;
        const games: Games = tournamentRound.games;
        let calculatedGame: Game;

        // console.log("\ntournamentRound.games: " + JSON.stringify(tournamentRound.games))
        // console.log("\ngames: " + JSON.stringify(games))

        for (let i = 0; i < games.length; i++) {
            // console.log(`calculateRoundRobinColors before: ` + JSON.stringify(game));
            // get the players and their pirces' colors
            const game: Game = games[i];
            player1 = tournament.players.find((el) => game.whitePiecesPlayer === el.id);
            player2 = tournament.players.find((el) => game.blackPiecesPlayer === el.id);
            if (player1.id === 0 || player2.id === 0) {
              // console.log("\ncalculateRoundRobinColors/player :" + JSON.stringify(player1));
              // console.log("calculateRoundRobinColors/player :" + JSON.stringify(player2));

            }
            calculatedGame = calculateGameColors(player1, player2);
            // console.log(`game: ` + JSON.stringify(game) + ", calculatedGame: " + JSON.stringify(calculatedGame))
            if (player1.id === 0 || player2.id === 0) {
                // console.log("calculateRoundRobinColors/game :" + JSON.stringify(game));
                // console.log("calculateRoundRobinColors/calculatedGame :" + JSON.stringify(calculatedGame));
            }
            tournamentRound.games[i] = calculatedGame;
            // game = {...game, ...calculatedGame};
            // console.log(`calculateRoundRobinColors after: ` + JSON.stringify(game));
        }
    }
    // for (let i = 0; i < tournament.players.length; i++) {
    //   console.log("\nttournament.players " + i + ": " + JSON.stringify( tournament.players[i].pieceColors))
    // }
};

/**
 * Selects colors for a game's players:
 * - When calculating the first game for the player, allocates WHITE_PIECES to the
 *   lowest ranking player and BLACK_PIECES to the highest ranking player;
 * - When calculating games other than the first game:
 *   - Allocates players' piece colors by flipping their last game's piece color
 *   - If both players end up with opposite colors we are done;
 *   - It flips the color of a player playing with the BLACK_PIECES, if
 *     they played their last game with the BLACK_PIECES
 *   - If both players end up with opposite colors we are done;
 *   - It flips the color of a player playing with the BLACK_PIECES, if
 *     they played their last two game with the BLACK_PIECES;
 *   - If both players end up with opposite colors we are done;
 *   - Calculates the difference between the number of games played with
 *     WHITE_PIECES and BLACK_PIECES by each player; assign the WHITE_PIECES to
 *     the players who played the least amount of games with the WHITE_PIECES;
 *   - If both players end up with opposite colors we are done;
 *   - Aallocate WHITE_PIECES to the lowest ranking player and BLACK_PIECES to
 *     the highest ranking player;
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
    let player1PieceScore: number;
    let player2PieceScore: number;

    if (player1.pieceColors.length === 0) {
        //  allocates WHITE_PIECES to the lowest ranking player and BLACK_PIECES
        // to the highest ranking player;
        if (player1.rating <= player2.rating) {
            player1NextGameColor = WHITE_PIECES;
            player2NextGameColor = BLACK_PIECES;
        } else {
            player1NextGameColor = BLACK_PIECES;
            player2NextGameColor = WHITE_PIECES;
        }
        // console.log("calculateGameColors/First round");
    } else {
      if (player1.id === 0 || player2.id === 0) {
        // console.log("calculateGameColors/2+ round/player1 pieceColors: " + JSON.stringify(player1.pieceColors));
        // console.log("calculateGameColors/2+ round/player2 pieceColors: " + JSON.stringify(player2.pieceColors));
      }
      // Allocates players' piece colors by flipping their last game's piece
      // color
      player1NextGameColor = flipPlayerPiecesColor(player1, player2);
      player2NextGameColor = flipPlayerPiecesColor(player2, player1);

      if (player1NextGameColor === player2NextGameColor ) {
        // It flips the color of a player playing with the BLACK_PIECES, if
        // they played their last two game with the BLACK_PIECES
        if (player1NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastGame(player1)) {
            player1NextGameColor = WHITE_PIECES;
        }
        if (player2NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastGame(player2)) {
            player2NextGameColor = WHITE_PIECES;
        }

        if (player1NextGameColor === player2NextGameColor ) {
          // It flips the color of a player playing with the BLACK_PIECES, if
          // they played their last two game with the BLACK_PIECES;
          if (player1NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastTwoGames(player1)) {
              player1NextGameColor = WHITE_PIECES;
          }
          if (player2NextGameColor === BLACK_PIECES && playedWithBlackPiecesInLastTwoGames(player2)) {
              player2NextGameColor = WHITE_PIECES;
          }
        }
        if (player1NextGameColor === player2NextGameColor ) {
          // Calculates the difference between the number of games played with
          // WHITE_PIECES and BLACK_PIECES by each player; assign the
          // WHITE_PIECES to the players who played the least amount of games
          // with the WHITE_PIECES;
          if (player1NextGameColor === player2NextGameColor ) {
            // If both players end up with opposite colors we are done;
            // Allocates WHITE_PIECES to the lower ranking player and BLACK_PIECES
            // to the higher ranking one;

            player1PieceScore = player1.pieceColors.reduce((acc, el) => acc + el);
            player2PieceScore = player2.pieceColors.reduce((acc, el) => acc + el);
            if (player1PieceScore < player2PieceScore)  {
              player1NextGameColor = WHITE_PIECES;
              player2NextGameColor = BLACK_PIECES;
            } else {
              if (player1PieceScore > player2PieceScore)  {
                player1NextGameColor = BLACK_PIECES;
                player2NextGameColor = WHITE_PIECES;
              }
            }
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
        }
      } else {
        // console.log("Flipped Colors and got different colors");
      }
    }
    if (player1NextGameColor === WHITE_PIECES) {
        game.whitePiecesPlayer = player1.id;
        game.blackPiecesPlayer = player2.id;
    } else {
        game.whitePiecesPlayer = player2.id;
        game.blackPiecesPlayer = player1.id;
    }
    player1.pieceColors.push(player1NextGameColor);
    player2.pieceColors.push(player2NextGameColor);
    if (player1.id === 0 || player2.id === 0) {
      // console.log("calculateGameColors/allocation: " + JSON.stringify(game))
    }

    return game;
};

/**
 * flipPlayerPiecesColor - If the player had a previous round bye, we will
 * assign their pieces color to their opponent's previous round pieces color;
 * otherwise, we will assign their pieces color to their previous round pieces
 * color
 *
 * @param  {Player} player the player for which we are assigning colors
 * @param  {Player} opponent the player's opponent
 * @return {Color} The computed color
 */
export const flipPlayerPiecesColor = (player: Player, opponent: Player): Color => {
    let color: Color;
    const ppcl = player.pieceColors.length;
    if (player.pieceColors[ppcl - 1] === NO_PIECES) {
        color = opponent.pieceColors[ppcl - 1];
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
