const game = {

	/* ===== new game =====
	Goal: randomly pick two tiles with values 2 or 4


	*/

	randomTile: 0,
	tileNumbers: [],

	newGame() {
		this.randomTiles()
		this.createGrid()
		this.firstTwoTiles()
	},

	// Display two random tiles on board with values 2 or 4
	firstTwoTiles() {
		let firstTile = Math.floor(Math.random() * 15)
		let secondTile = Math.floor(Math.random() * 15)
		// Avoids error if both tiles land on the same div
		if(firstTile === secondTile) {
			secondTile = firstTile++
		}
		$('.tile').eq(firstTile).text(this.randomTile)
		$('.tile').eq(secondTile).text(this.randomTile)
	},
	// Assigns 2 or 4 value to variable
	randomTiles() {
		const randomValue = Math.random()
		this.randomTile = randomValue > 0.5 ? 2 : 4
		// console.log(this.randomTile);
	},
	// Creates a single tile after each move
	newTile() {
		// Arr to put all the tiles without a number
		const emptyTiles = []
		for(let i = 0; i < 16; i++) {
			if($(`#${i}`).html() == '') {
				emptyTiles.push(i)
			}
		}
		const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
		this.randomTiles()
		$(`#${randomEmptyTile}`).html(this.randomTile)
	},
	// Creates the gameboard
	createGrid() {
		for(let i = 0; i < 4; i++) {
			const row = document.createElement('div')
			row.setAttribute('class', 'row')
			$('#container').append(row)
			for(let j = 0; j < 4; j++) {
				const tile = document.createElement('div')
				tile.setAttribute('class', 'tile') // .classList.add('') or .addClass()
				$('.row')[i].append(tile)
			}
		}
		for(let i = 0; i < 16; i++) {
			$('.tile')[i].setAttribute('id', i)
		}

	},
	// Goal: Use this to update the board after tiles move
	displayGrid() {
	},
	
	// ===== Goal: Use these functions for keydown presses =====
	//			Use: $(`#${i}`).html() to call 
	left() {
		let combineOnce = 0
		// Loop 4 times since there are 4 tiles per row
		for(let j = 0; j < 4; j++) { 
			// Loop 16 times for each tile
			for(let i = j * 4; i <= (j * 4) + 3 ; i++) {
				/*
				1) If current div has a value & the div before it has no value
					switch positions

				2) Will only shift in the same row

				3) Combine tiles if same value
				*/
				const a = i - 1
				const b = parseInt($(`#${i}`).html())
				const c = parseInt($(`#${a}`).html())
				const d = $(`#${i}`).html() //2
				const e = $(`#${a}`).html() //''
				// if a and i are not on diff rows
				if(d > 0 && e == '' && a != 3 && a != 7 && a != 11 && a != 15) {
					$(`#${a}`).html(d)
					$(`#${i}`).html('')
				}
				if(d == e) {
					$(`#${a}`).html(b + c)
					$(`#${i}`).html('')
				}
			}
		}
	},
	
	right() {

	},
	
	top() {

	},

	down() {

	},

}

game.newGame()

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        	game.left() 
        break;

        case 38: // up
        	game.newTile()
        break;

        case 39: // right
          	game.newTile()
        break;

        case 40: // down
          	game.newTile()
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});






