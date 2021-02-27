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
import { CircleParams, Game, Games, Tournament, TournamentRound, TournamentRounds} from "./types";

/**
 * The circle method is the standard algorithm to create a schedule for a
 * round-robin tournament. See README for details
 *
 * @param {numberOfPlayers: number} - The number of round robin tournament players
 * @return {TournamentRound} An array of TournamentRound, as explained above
 *
 */
export const calculateColors = (tournment: Tournament): void => {
    // Allocate round 1.  It allocates the first round colors based on players'
    // ratings, with the highest rated player playing black pieces;
}
