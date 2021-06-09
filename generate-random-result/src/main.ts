/**
 * A very simple boilerplate to write Node.js scripts using Typescript
 */
// @ts-ignore
import printf from "printf";
import yargs from "yargs";

import * as util from "./utils/util";

import {OddsBin, OddsBins} from "./utils/types"

// @ts-ignore
const input = yargs.argv;
const wppRanking = Number(input.wppRanking);
const bppRanking = Number(input.bppRanking);
let oddsBins: OddsBins;

// Login
console.log(`Generate Random Chess Game Result@0.0.1`);
console.log(printf("%s%d", "White Pieces Player Ranking: ", wppRanking));
console.log(printf("%s%d", "Black Pieces Player Ranking: ", bppRanking));

oddsBins = util.getTheAnswer(Math.min(wppRanking, bppRanking), Math.max(wppRanking, bppRanking));
console.log(`oddsBins: ` + JSON.stringify(oddsBins));
//  Simulate 10 games
for (let i = 0; i < 10; i++) {
	const random: number = Math.random();
	// console.log(`random: ` + random);
	oddsBins.forEach((oddsbin: OddsBin) => {
		if (random <= oddsbin.binValue) {
			console.log(`outcome : ` + oddsbin.binOutcome);
		}
	});
}
