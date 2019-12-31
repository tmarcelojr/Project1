const game = {

	/* ===== new game =====
	Goal: randomly pick two tiles with values 2 or 4


	*/

	$newTileValues: [2, 4],
	$gameBox: [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],

	newGame() {
	},

	newTile() {
		const $totalTiles = $('.tile').length;
		// console.log('this is how many tiles on the board', $totalTiles);
		// $('.tile').eq($randomTile).text(2);

		const $tileNumbers = [];
		// console.log('tile numbers arr', $tileNumbers);


		/* ==== Assign coordinates to array =====
		Goal: write a nested for loop, assign x and y values
		*/
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 4; j++) {
				if(this.$gameBox[i][j] === 0) {
					$tileNumbers.push({
						x: i,
						y: j
					})
				}
			}
		}

		/* ===== Random Assignment =====
		Goal: random coordinates and assign values
		*/
		if($tileNumbers.length > 0) {
			// console.log($tileNumbers);
			let $randomTile = $tileNumbers[Math.floor(Math.random() * $tileNumbers.length)]
			// console.log($randomTile);
			let $randomValue = Math.random()
			// console.log($randomValue);
		
			let $random = Math.random()
			if($random > 0.5){
				this.$gameBox[$randomTile.x][$randomTile.y] = 2
			}
			else {
				this.$gameBox[$randomTile.x][$randomTile.y] = 4
			}
		}
	},

}

game.newTile()
game.newTile()
console.table(game.$gameBox); // LIFE SAVER...See changes as table



