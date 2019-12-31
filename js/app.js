const game = {

	/* ===== new game =====
	Goal: randomly pick two tiles with values 2 or 4


	*/
	newGame() {
	},

	newTile() {
		const $totalTiles = $('.tile').length;
		console.log('this is how many tiles on the board', $totalTiles);
		const $randomTile = Math.floor( Math.random() * $totalTiles );
		console.log('this is random tile on the baord', $randomTile);
		$(".tile").eq($randomTile).css("background-color", "red");
	}
}

const $length = $('.tile').length
console.log($length);

game.newTile()
