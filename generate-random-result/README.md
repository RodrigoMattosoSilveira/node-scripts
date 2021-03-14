# Introduction
This is a script to generate a random result from a game between ranked players with three possible outcomes: player 1 wins, player 1 and player 2 draw, player 2 wins.
This algorithm establishes the probability of each outcome based on the players' rankings, then using a `binning` technique to generate the outcome randomly.
# Establish outcomes probability
I used the [Elo Win Probability Calculator](https://wismuth.com/elo/calculator.html#rating1=1546&rating2=1654&first_move=player1&best_of=1) and the suggested approximate formulas.

## Prerequisite function
Where The first function is from FIDE, and the second function is from the author:
````text
eloNormal(eloDiff) = erfc(-eloDiff / ((2000.0/7) * sqrt(2))) / 2
eloPerPawnAtElo(elo) = exp(elo/1020) * 26.59
````
## Calculation
The input is rating1 and rating2, where **rating1 ≤ rating2**.
````text
diff = rating1 - rating2
ave = (rating1 + rating2) / 2
expected_score = eloNormal(diff)
````

We compute what an advantage of 0.6 pawns corresponds to in Elo:
````text
eloPerPawn = eloPerPawnAtElo(ave)
eloShift = eloPerPawn * 0.6
````

We consider the chess variant where a draw counts as a loss for player1 by penalizing rating1 by eloShift:

````text
player1_win_probability = eloNormal(diff - eloShift)
````

Remember that the expected score is the probability of winning plus half of the probability of drawing, so:

````text
draw_probability = (expected_score - player1_win_probability)*2
````
# Binning
It is described in the [Random thoughts on randomization in TypeScript](https://medium.com/ngconf/random-thoughts-on-randomization-in-typescript-2fab94ea0f12) article.

It is a technique to selection of specific outcome a specified percentage of the time (on average). We are given a list of named actions and each action must be selected a certain percentage of the time. The percentages must sum to 100.
As an example, consider the following:
* Choose `player 1` wins 50% approximately of the time;
* Choose `draw` approximately 35% of the time;
* Choose `player 2` wins approximately 15% of the time;

The idea is to normalize the percentages to the interval [0,1] and create a `bin` for each outcome. Each `bin` contains a running sum, which is best illustrated by example. For the above problem, the normalized percentages are 0.50, 0.35, and 0.15. The bins may be stored in an array where each array element contains the sum of its value and all prior values, with an initial value of zero. So, the bins are
````typescript
[
	binValue: 0.50, outcome: 'lower rating player wins',
	binValue: 0.85, outcome: 'draw',
	binValue: 1.0, outcome: 'higher rating player wins'
]
````

Now, generate a uniform iterate from `Math.random()` and choose the first bin in which the iterate is less than or equal to the bin value. The index of that bin indicates which outcome to select.

For example, suppose the value from Math.random() is `0.65`. The second bin with a value of `0.85` is chosen, so an index of `1` is used to select `draw` from the array of outcomes.
