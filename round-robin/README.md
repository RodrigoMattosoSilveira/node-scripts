This thread was copied from http://www.math.niu.edu/~rusin/known-math/97/roundrobin


From: Adam Florence <aflorenc@cs.cornell.edu>
Newsgroups: sci.math.num-analysis
Subject: Re: RoundRobin tournament problem solvable?
Date: Fri, 31 Oct 1997 16:42:17 -0500

Michael O'Donnell wrote:

> Once upon a time I devised a simple (if devious) and apparently
> bulletproof (hah!) algorithm for generating RoundRobin tournament
> schedules (arranging an arbitrary number of contestants in pairs,
> pitting each against the other exactly once in a series of rounds
> with nobody ever sitting idle) but now I've heard that this
> problem is supposed to be either very hard or even unsolvable (NP
> complete?).  Since I can't believe that a math-ninny like me has
> achieved anything notable in this discipline I'm looking for
> confirmation that this problem is indeed just another simple,
> oft-solved puzzle, and not actually difficult for anyone but me...
>
> As seeming confirmation of its supposed difficulty I have found:
>  http://hermes.dis.uniroma1.it/~aschaerf/abstracts/ecai-96.html
> but I have not actually looked at a copy of the proceedings
> described therein.
>
> Regards,
>  -------------------------------------------
>  Michael O'Donnell     m o d @ s t d . K o m
>  -------------------------------------------
>
> P.S.  If replying via email please note the  e x p a n d e d
>       address supplied in my signature line, where K=c

I have an algorithm for generating a schedule. The algorithm is quadratic, so
this problem is certainly not NP hard or NP complete. The algorithm took me 3
days to come up with, so I also wouldn't say it's trivial. My algorithm is
given in the function "roundrobin", below.

I coded up the algorithm in C. It asks you for the number of teams, then
prints out the schedule. Just to make sure that the schedule is correct,
another function checks its validity.

Suppose there are n teams. If n is even, then the schedule has n-1 rounds. If
n is odd, then the schedule has n rounds, and each team is idle in exactly one
round. For example, if n = 10, then the schedule is
````
       team
     \      1     2     3     4     5     6     7     8     9    10
round \............................................................
1:    10     9     8     7     6     5     4     3     2     1
2:     6    10     9     8     7     1     5     4     3     2
3:     2     1    10     9     8     7     6     5     4     3
4:     7     3     2    10     9     8     1     6     5     4
5:     3     4     1     2    10     9     8     7     6     5
6:     8     5     4     3     2    10     9     1     7     6
7:     4     6     5     1     3     2    10     9     8     7
8:     9     7     6     5     4     3     2    10     1     8
9:     5     8     7     6     1     4     3     2    10     9
````
To read the schedule, notice that each round is listed in a row. So, in round
1, team 1 plays team 10, team 2 plays team 9, team 3 plays team 8, team 4
plays team 7, and team 5 plays team 6. In round 2, team 1 plays team 6, team 2
plays team 10, etc.

If n = 11, the schedule is:
````
       team
     \      1     2     3     4     5     6     7     8     9    10    11
round \..................................................................
1:     0    11    10     9     8     7     6     5     4     3     2
2:     7     0    11    10     9     8     1     6     5     4     3
3:     2     1     0    11    10     9     8     7     6     5     4
4:     8     3     2     0    11    10     9     1     7     6     5
5:     3     4     1     2     0    11    10     9     8     7     6
6:     9     5     4     3     2     0    11    10     1     8     7
7:     4     6     5     1     3     2     0    11    10     9     8
8:    10     7     6     5     4     3     2     0    11     1     9
9:     5     8     7     6     1     4     3     2     0    11    10
10:   11     9     8     7     6     5     4     3     2     0     1
11:    6    10     9     8     7     1     5     4     3     2     0
````
A team being idle is indicated by the schedule listing that it plays team
number 0. Notice that team 1 is idle in round 1, team 2 in round 2, etc.

The code is given below. The main function reads n and then prints out a nice
table. The function "roundrobin" computes the schedule (note that it indexes
teams and rounds from 0). The function "check" makes sure that a schedule is
valid (by making sure that every team plays every other team; no team plays
themselves; each team plays at most once per round; and whenever team i plays
team j, then team j also plays team i).

Currently, the program has a hard-coded maximum number of teams of 1000. This
could easily be increased.

Unfortunately, I do not have a proof that my algorithm is correct. I'll try
coming up with one, though I probably won't post it here.

````
#include <stdio.h>
#include <stdlib.h>

#define MAX 1000

int roundrobin(int schedule[MAX][MAX], int n);

void main(void)
{
int schedule[MAX][MAX];
int n, r, i, rounds;

/* Input number of teams in the schedule. */
printf("Enter the number of teams that you want a schedule for: ");
scanf("%d", &n);

/* If the number of teams is even, requires n-1 rounds; if odd, requires n. */

if (n % 2)
rounds = n;
else
rounds = n-1;

roundrobin(schedule, n);

/* Print a nice table. */
printf("\n       team\n     \\ ");
for (i = 0; i < n; i++)
printf("%6d", i+1);
printf("\n");
printf("round \\");
for (i = 0; i < 6 * n; i++)
printf(".");
printf("\n");
for (r = 0; r < rounds; r++)
{
printf("%6d:", r+1);
for (i = 0; i < n; i++)
printf("%6d", schedule[r][i] + 1);
printf("\n");
}
printf("\n");

/* Check the schedule and print whether or not it's valid. */
if (check(schedule, n))
printf("Schedule is valid.\n");
else
printf("Schedule is not valid.\n");
}

/*************************************************************************
Compute the round-robin tournament schedule for n teams. If n is even,
then there are n-1 rounds; if n is odd, there are n rounds and each team
is idle in exactly one round. A team being idle is indicated by the
schedule saying that it plays team number -1 in a round.
*************************************************************************/
int roundrobin(int s[MAX][MAX], int n)
{
int rounds, m, r, i;

/* m is the lowest even number greater than or equal to n. */
if (n % 2)
m = n + 1;
else
m = n;

/* If the number of teams is even, requires n-1 rounds; if odd, requires n. */

if (n % 2)
rounds = n;
else
rounds = n-1;

/* Fill in the table with a nice diagonal pattern. */
for (r = 0; r < rounds; r++)
{
for (i = 0; i < r; i++)
s[r][i] = ((rounds+r-i+1) + m) % m;
for (i = r; i < n; i++)
s[r][i] = ((rounds+r-i) + m) % m;
}

/* Now, do knight-like moves with the 0 in the first row. Every time the 0
lands on a number, put that number in the first column. */
r = 0;
for (i = m-2; i > 0; i--)
{
r = ((r - 2) + rounds) % rounds;
s[r][0] = s[r][i];
s[r][i] = 0;
}

/* If m != n, then remove team n from all the games, and replace with -1. */
if (m != n)
for (i = 0; i < rounds; i++)
s[i][i] = -1;
}

/*************************************************************************
Looks at a schedule and determines whether it is valid.
*************************************************************************/
int check(int s[MAX][MAX], int n)
{
int game[MAX][MAX];
int rounds, r, i, j;

for (i = 0; i < n; i++)
for (j = 0; j < n; j++)
game[i][j] = 0;

/* If the number of teams is even, requires n-1 rounds; if odd, requires n. */

if (n % 2)
rounds = n;
else
rounds = n-1;

/* Count the number of times every team plays every other team. */
for (r = 0; r < rounds; r++)
for (i = 0; i < n; i++)
{
j = s[r][i];
if (j > -1)
/* A value of -1 would mean that team i is idle this round. */
{
/* Record that teams i and j played. */
game[i][j] ++;
game[j][i] ++;
/* Note that we will double-count the games, because we record it
when team i plays j, as well as when j plays i. */
}
}

/* Make sure that every pair played exactly once, and nobody ever played
themselves. */
for (i = 0; i < n; i++)
{
if (game[i][i] != 0)
/* If a team plays themselves, it's not a valid schedule. */
{ printf("Team %d played itself.\n", i); return 0; }
for (j = i+1; j < n; j++)
/* We have to check for a 2, because games are double-counted. */
if (game[i][j] != 2)
/* If two teams didn't play exactly one time, it's not valid. */
return 0;
}

/* Make sure that each team plays at most once per round. */
for (r = 0; r < rounds; r++)
{
/* We will use game[0] to count the number of times each team appears in
a round. */
for (i = 0; i < n; i++)
game[0][i] = 0;
/* Count number of times each teams appears in round r. */
for (i = 0; i < n; i++)
{
j = s[r][i];
/* Team i played team j in round r. */
if (j >= 0)
/* -1 means that team i was idle this round. */
game[0][j] ++;
}
/* Make sure each team appears at most once. */
for (i = 0; i < n; i++)
if (game[0][i] > 1)
/* Team i appeared more than once in round r. Not valid. */
return 0;
}

/* Make sure that when team i plays team j, team j also plays team i. */
for (r = 0; r < rounds; r++)
for (i = 0; i < n; i++)
{
j = s[r][i];
/* Team i played team j in round r. */
if (j >= 0)
/* -1 means that team i was idle this round. */
if (s[r][j] != i)
/* If team j didn't play team i, not valid. */
return 0;
}

/* Otherwise, the schedule is valid. */
return 1;
}
````
------------------------------------------------
Adam Florence
Cornell University
Ph.D. student in Computer Science
aflorenc@cs.cornell.edu or aflorenc@acm.org

==============================================================================
From: Adam Florence <aflorenc@cs.cornell.edu>
Newsgroups: sci.math.num-analysis
Subject: Re: RoundRobin tournament problem solvable?
Date: Sat, 01 Nov 1997 12:48:49 -0500

I have changed my algorithm slightly, and have a proof of its correctness.

Here is a formal statement of the problem: There are n teams which must be
scheduled in n * (n-1) / 2 games in some number of rounds. Multiple games can be
played simultaneously during a single round. We wish to minimize the number of
rounds, subject to the following 3 conditions: (1) every team must play every
other team; (2) each team can be involved in at most one game per round; and (3)
If during a round team i plays team j, then in that same round team j plays team
i.

A schedule only makes sense for n >= 2; however, the algorithm works for n=1 as
well. Notice that if n is even, then n-1 rounds are required; if n is odd, then n
rounds are required and each team is idle in exactly one round.

Here is the algorithm and its proof of correctness. I will number the teams from 0
to (n-1), and number the rounds beginning at 0.

-----------------------

Suppose n is odd. Make an n-by-n array called S, where S(r, i) = j iff team i
plays team j in round r. If S(r, i) = i, this means that team i is idle in round
r. Define S as
S(r, i) = (n + r - i - 1) mod n
Below is the array in the case where n = 5.
4 3 2 1 0
0 4 3 2 1
1 0 4 3 2
2 1 0 4 3
3 2 1 0 4

I will now show that this definition of S satisfies the three properties.

(1) Every team must play every other team.

The ith column of the array lists the teams which team i plays. By construction,
all of the numbers from 0 to (n-1) inclusive appear in each column. Thus, every
team plays every other team.

(2) Each team can be involved in at most one game per round.

The rth row of the array lists the teams which play in round r. By construction,
all of the numbers from 0 to (n-1) inclusive appear in each row exactly once.
Thus, each team is involved in exactly one game per round. (Recall that if the
array lists that a team plays itself, then it is actually idle during that round.)

(3) If during a round team i plays team j, then during that same round team j
plays team i.

Suppose that i >= r. Then S(r, i) = (n + r - i - 1) mod n = n + r - i - 1 = j.
Then S(r, j) = (n + r - [n + r - i - 1] - 1) mod n = i mod n = i.

Now suppose that i < r. Then S(r, i) = (n + r - i - 1) mod n = r - i - 1 = j. Then
S(r, j) = (n + r - [r - i - 1] - 1) mod n = (n + i) mod n = i.

Thus, if during a round team i plays team j, then during that same round team j
plays team i.

Therefore, the algorithm is correct for odd n.

-----------------------

Now suppose that n is even and n >= 2. Make an (n-1)-by-n array called S, where
S(r, i) = j iff team i plays team j in round r. Notice that S has (n-1) rows and n
columns.

Let S' the schedule for (n-1) teams. Notice that S' is (n-1)-by-(n-1). Set the
first (n-1) rows of S to be identical to S', and let the last column of S be all
(n-1)'s. For example, when n = 6, S looks like
````
4 3 2 1 0 5
0 4 3 2 1 5
1 0 4 3 2 5
2 1 0 4 3 5
3 2 1 0 4 5
````

Now, for i = 0 to (n-2) inclusive, let r = (2i + 1) mod (n-1), and swap the
numbers at S(r, i) and S(r, n-1). When n = 6, the array becomes
````
4 3 5 1 0 2
5 4 3 2 1 0
1 0 4 5 2 3
2 5 0 4 3 1
3 2 1 0 5 4
````
This is the schedule for n teams. S can be written as a formula:
S(r, i) = { n-1,                            if r = (2i + 1) mod (n-1) and i <
(n-1)
{ p,                              if i = n-1; where p is defined
such that r = (2p+1) mod (n-1)
{ ( (n-1) + r - i - 1) mod (n-1), otherwise

I will now show this definition of S satisfies the three properties.

(1) Every team must play every other team.

Note that S' satisfies property (1). Thus, each column of S' contains the numbers
from  0 to (n-2) inclusive. Thus, in the original S, every team from 0 to (n-2)
plays every other team in this range, including itself. After the swapping, the
entry i in row i is changed to a (n-1). Thus, every team in the range 0 to (n-2)
inclusive plays every other team, and is never idle.

This swapping swaps the numbers from 0 to (n-2) inclusive into column (n-1). Thus,
team (n-1) plays all of the other teams, and is never idle.

Thus, every team plays every other team.

(2) Each team can be involved in at most one game per round.

Note that S' satisfies property (2). Thus, each row of S' contains the numbers
from  0 to (n-2) inclusive. The last column of the original S is all (n-1)'s. Thus,
each row of the original S contains the numbers from 0 to (n-2) inclusive.

(3) If during a round team i plays team j, then during that same round team j
plays team i.

Note that S' satisfies property (3). Thus, we only need to check on the occasions
where a swap occurred.

Suppose r = (2i + 1) mod (n-1) and i < (n-1). Then S(r, i) = n-1 = j. Then S(r, j)
= p where r = (2p+1) mod (n-1). However, notice that p = i satisfies r = (2p+1)
mod (n-1). Thus, S(r, j) = i.

Suppose i = n-1. Then S(r, i) = p = j where r = (2p+1) mod (n-1). Notice j <
(n-1). There are two cases. Either r = (2j+1) mod (n-1), or it doesn't. Let's take
the first case, so r = (2j+1) mod (n-1). Then S(r, j) = n-1, as desired. Let's
take the second case, so it is not true that r = (2j+1) mod (n-1). However, j = p,
and p is defined such that r = (2p+1) mod (n-1). Thus r != r, a contradiction, so
this case is impossible.

Therefore, the algorithm is correct for even n.

-----------------------

Generating the array S can be done in quadratic time.

-----------------------------------------------
Adam Florence
Cornell University
PhD student in Computer Science
aflorenc@cs.cornell.edu or aflorenc@acm.org

==============================================================================
From: shepard@tcg.anl.gov (Ron Shepard)
Newsgroups: sci.math.num-analysis
Subject: Re: RoundRobin tournament problem solvable?
Date: Mon, 03 Nov 1997 16:39:06 -0600

Michael O'Donnell wrote:

> Once upon a time I devised a simple (if devious) and apparently
> bulletproof (hah!) algorithm for generating RoundRobin tournament
> schedules (arranging an arbitrary number of contestants in pairs,
> pitting each against the other exactly once in a series of rounds
> with nobody ever sitting idle) but now I've heard that this
> problem is supposed to be either very hard or even unsolvable (NP
> complete?). [...]

It is not hard, but it is Np complete, which in this case means the effort
is O(N^2).  The usual way of doing round robin competitions, say in a
chess or bridge tournament, is simply to line up the contestants facing
each other.  Say there are 6 teams:

1  2  3
6  5  4

On the next round, one team stays fixed (say 6* in this example), and the
others rotate:

2  3  4
6* 1  5

On the next round it would be:

3  4  5
6* 2  1

and so on, for the 5 steps it takes for everyone to get back to where they
started.  The contestants can rotate either clockwise, or
counterclockwise, it doesn't matter.  And any one of them can stay fixed,
it doesn't matter.  If there are an odd number of teams, then just add a
"dummy" team to get to an even number, and whoever faces the dummy sits
out that round; usually the dummy is the fixed-position team, and the
board is not set up for that position.

I think this is why it is called a "round robin", because the teams cycle
around, facing all of the possible opponents.

The "proof" that this works is based on the fact that N and (N-1) are
relatively prime for all N.

$.02 -Ron Shepard
