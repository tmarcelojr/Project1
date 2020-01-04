const game = {
	randomTile: 0,
	tileNumbers: [],
	firstLeftMove: false,
	firstRightMove: false,
	firstUpMove: false,
	firstDownMove: false,
	movement: false,

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
	left() {
		let movement = 0;
		// Combine all cells to the left
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 15; j++) {
				const curr = $(`#${j}`).html()
				const next = $(`#${j + 1}`).html();
				/*
					3, 7, 11 , 15 are the indexes of farthest right tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr > 0 && j != 3 && j != 7 && j != 11 && j != 15 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j + 1}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j != 3 && j != 7 && j != 11 && j != 15) {
					let newValue = next
					// If current tile has no value and adj tile, no combining
					if(j != 3 && j != 7 && j != 11 && j != 15 && ((curr != '') || (next != ''))) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j + 1}`).html('');
				}
			}
		}
		// New tile if movement is made
		if(movement) {
			this.newTile();
		}
	},
	right() {
		let movement = 0;
		// Combine all cells to the right
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html()
				const next = $(`#${j - 1}`).html();
				/*
					0, 4, 8, 12 are the indexes of farthest left tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr != '' && j != 0 && j != 4 && j != 8 && j != 12 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j - 1}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j != 0 && j != 4 && j != 8 && j != 12) {
					let newValue = next
					// If current tile has no value and adj tile, no combining
					if(j != 0 && j != 4 && j != 8 && j != 12 && ((curr != '') || (next != ''))) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j - 1}`).html('');
				}
			}
		}
		// New tile if movement is made
		if(movement) {
			this.newTile();
		}	
	},
	
	up() {
		let movement = 0;
		// Combine all cells to the up
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html()
				const next = $(`#${j + 4}`).html();
				// Combine if bottom under current tile is equal
				if(curr != '' && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j + 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '') {
					let newValue = next
					// If current tile has no value or tile under, no combining
					if(((curr != '') || (next != ''))) {
						movement = 1;
					}
					// Current and bottom tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j + 4}`).html('');
				}
			}
		}
		// New tile if movement is made
		if(movement) {
			this.newTile();
		}	
	},

	down() {
		let movement = 0;
		// Combine all cells to the down
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html()
				const next = $(`#${j - 4}`).html();
				// Combine if current tile  and tile above is equal
				if(curr != '' && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '') {
					let newValue = next
					// If current tile no value and tile above, no combining
					if(((curr != '') || (next != ''))) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
				}
			}
		}
		// New tile if movement is made
		if(movement) {
			this.newTile();
		}	
	},

}

game.newGame()

$(document).on('keydown', (e) => {
    switch(e.which) {
        case 37: // left
        	game.left()
        break;

        case 38: // up
        	game.up()
        break;

        case 39: // right
          	game.right()
        break;

        case 40: // down
          	game.down()
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});






