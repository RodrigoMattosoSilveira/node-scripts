# Introduction
The circle method is the standard algorithm to create a schedule for a round-robin tournament.

For simplicity sake, lets assume a round-robin tournament with ten tournament players. Note that we will start with the simpler case of an even number of tournament players. We will address the more complex case of an odd number of tournament players later.

# Set up
The tournament player are assigned to numbers, from `0` to `n-1`, where `n` is the number of tournament players, and `(n-1)` is the number of `rounds` to schedule, and `gamesPerRound` is the number of games per round:
````typescript
// index       0  1  2  3  4  5  6  7  8  0
let players = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let n = players.length;
let rounds = players - 1;
let gamesPerRound = n / 2;
````

We will also use two auxiliary arrays, which are at the heart of the `circle algorithm`:
````typescript
let top: number[] = [];
let bottom: number[] = [];
````
# Schedule round 1
To calculate the first round, starting with the first player, we will assign `n/2` players to the `top` array, from left to right, then assign the remaining `n/2` players to the `bottom` array, from right to left:
````typescript
// Round 1
let top    = [0, 1, 2, 3, 4];
let bottom = [9, 8, 7, 6, 5];
````
Then we pair players in the to and bottom arrays:
````typescript
// Round 1
// Player 0 plays Player 9
// Player 1 plays Player 8
// Player 2 plays Player 7
// Player 3 plays Player 6
// Player 4 plays Player 5
````

# Schedule other rounds
Next:
* Fix we player 0 in the `top` array at position `0`
* Remove the `bottom` array first element, `9`;
* Insert in the `top` array immediately after player `0`;

This shift all subsequent `top` array elements to the right and `bottom` array elements to the left, in a clockwise fashion:
````typescript
top    = [0, 9, 1, 2, 3, 4];
bottom = [8, 7, 6, 5]
````

Next, we pop the last element from the `top` array and push it into the `bottom` array:
````typescript
top    = [0, 9, 1, 2, 3];
bottom = [8, 7, 6, 5, 4]
````

Then we pair players in the to and bottom arrays:
````typescript
// Round 2
// Player 0 plays Player 8
// Player 9 plays Player 7
// Player 1 plays Player 6
// Player 2 plays Player 5
// Player 3 plays Player 4
````

We repeat this process until for a the number of rounds;

# Handling an odd number of tournament players
In cases of an odd number of players, we add a `ghost player` to reduce the problem to handling an even number of player; players playing against the ghost player have a `round bye`. In the case we have 9 players, the tenth player is the ghost player and we represent it in our top and bottom array's as player `-1`:
````typescript
// Round 1
let top    = [ 0, 1, 2, 3, 4];
let bottom = [-1, 8, 7, 6, 5];
````

Then we pair players in the to and bottom arrays:
````typescript
// Round 1
// Player 0 has a round bye
// Player 1 plays Player 8
// Player 2 plays Player 7
// Player 3 plays Player 6
// Player 4 plays Player 5
````
and for Round 2 we would have
````typescript
// Round 2
let top    = [0, -1, 1, 2, 3];
let bottom = [8,  7, 6, 5, 4];
````

Then we pair players in the to and bottom arrays:
````typescript
// Round 2
// Player 0 plays Player 8
// Player 7 has a round bye
// Player 1 plays Player 6
// Player 2 plays Player 4
// Player 3 plays Player 4
````
# Representing a tournament round
The round describes the `game pairings` and whether a `player has a round bye`:
````typescript
type TournamentRound = {
  // The index represents the player and the cell their opponent
  gamesPairings: number[];
  // If present, it  represents the player with round bye
  byePlayer?: number;
}
````
