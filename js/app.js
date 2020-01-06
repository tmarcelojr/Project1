const game = {
	randomTile: 0,
	tileNumbers: [],

	newGame() {
		this.randomTiles()
		this.createGrid()
		this.createSecondGrid()
		this.firstTwoTiles()
		this.tileColor()
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
	// Creates the gameboard
	createSecondGrid() {
		for(let i = 0; i < 4; i++) {
			const row = document.createElement('div')
			row.setAttribute('class', 'secondGridRow')
			$('#secondGridContainer').append(row)
			for(let j = 0; j < 4; j++) {
				const tile = document.createElement('div')
				tile.setAttribute('class', 'secondGridTile') // .classList.add('') or .addClass()
				$('.secondGridRow')[i].append(tile)
			}
		}
		for(let i = 0; i < 16; i++) {
			$('.secondGridTile')[i].setAttribute('id', `second${i}`)
		}

	},

	tileColor() {
		$('.tile').each((index) => {
			const tile = $(`#${index}`).html()
			if(tile == '') {
				$(`#${index}`).css('background-color', 'rgb(203, 193, 182)')
			}
			if(tile <= 4) {
				$(`#${index}`).css('color', 'rgb(118, 110, 102)')
				$(`#${index}`).css('font-size', '50px')
			}
			if(tile > 4) {
				$(`#${index}`).css('color', 'rgb(249, 246, 243)')
			}
			if(tile == 2) {
				$(`#${index}`).css('background-color', 'rgb(237, 228, 219)')
			}
			if(tile == 4) {
				$(`#${index}`).css('background-color', 'rgb(233, 224, 203)')
			}
			if(tile == 8) {
				$(`#${index}`).css('background-color', 'rgb(233, 179, 130)')
			}
			if(tile == 16) {
				$(`#${index}`).css('background-color', 'rgb(233, 153, 109)')
			}
			if(tile == 32) {
				$(`#${index}`).css('background-color', 'rgb(233, 131, 103)')
			}
			if(tile == 64) {
				$(`#${index}`).css('background-color', 'rgb(233, 104, 72)')
			}
			if(tile >= 128) {
				$(`#${index}`).css('font-size', '45px')
			}
			if(tile == 128) {
				$(`#${index}`).css('background-color', 'rgb(233, 208, 127)')
			}
			if(tile == 256) {
				$(`#${index}`).css('background-color', 'rgb(233, 203, 116)')
			}
			if(tile == 512) {
				$(`#${index}`).css('background-color', 'rgb(233, 199, 101)')
			}
			if(tile >= 1024) {
				$(`#${index}`).css('font-size', '40px')
			}
			if(tile == 1024) {
				$(`#${index}`).css('background-color', 'rgb(233, 200, 93)')
			}
			if(tile == 2048) {
				$(`#${index}`).css('background-color', 'rgb(230, 195, 80)')
			}
		})	
	},
	left() {
		let movement = 0;
		// Combine all cells to the left
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
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
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor(); 
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
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor()
		}
	},
	
	up() {
		let movement = 0;
		// Combine all cells to the up
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html();
				const next = $(`#${j + 4}`).html();
				// Combine if bottom under current tile is equal
				// Use j < 12 since 3rd row stops at 11. 4th row, no tiles underneath
				if(curr != '' && curr == next && j < 12) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j + 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j < 12) {
					// If current tile has no value or tile under, no combining
					if(curr != '' || next != '' && j < 12) {
						movement = 1;
					}
					$(`#${j}`).html(next);
					$(`#${j + 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor()	
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
				// j > 3 since no tiles above first row 
				if(curr != '' && (curr == next) && j > 3) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j > 3) {
					let newValue = next
					// If current tile no value and tile above, no combining
					if(curr != '' || next != '' && j > 3) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made 
		if(movement) {
			this.newTile();
			this.tileColor()	
		}
	},
		
	playerTwoLeft() {
		let movement = 0;
		// Combine all cells to the left
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
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
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor(); 
		}
	},

	playerTwoRight() {
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
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor()
		}
	},
	
	playerTwoUp() {
		let movement = 0;
		// Combine all cells to the up
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html();
				const next = $(`#${j + 4}`).html();
				// Combine if bottom under current tile is equal
				// Use j < 12 since 3rd row stops at 11. 4th row, no tiles underneath
				if(curr != '' && curr == next && j < 12) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j + 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j < 12) {
					// If current tile has no value or tile under, no combining
					if(curr != '' || next != '' && j < 12) {
						movement = 1;
					}
					$(`#${j}`).html(next);
					$(`#${j + 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor()	
		}
	},

	playerTwoDown() {
		let movement = 0;
		// Combine all cells to the down
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#${j}`).html()
				const next = $(`#${j - 4}`).html();
				// Combine if current tile  and tile above is equal
				// j > 3 since no tiles above first row 
				if(curr != '' && (curr == next) && j > 3) {
					let newValue = (2 * parseInt(curr));
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
					movement = 1;
				// update score here later
				}
				if(curr == '' && j > 3) {
					let newValue = next
					// If current tile no value and tile above, no combining
					if(curr != '' || next != '' && j > 3) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#${j}`).html(newValue);
					$(`#${j - 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made 
		if(movement) {
			this.newTile();
			this.tileColor()	
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

        case 87: // w - up
        	game.up()
        break; 

        case 68: // d - right
        	game.right()
        break; 

        case 83: // s - down
        	game.down()
        break; 

        case 65: // a - left
        	game.left()
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});






