const game = {
	randomTile: 0,
	secondPlayerRandomTile: 0,
	tileNumbers: [],
	secondPlayerTileNumbers: [],
	playerOneTotalScore: 0,
	playerTwoTotalScore: 0,
	playerOneName: false,
	playerTwoName: false,
	timerId: 0,
	timerOff: false,
	playerOneTotalMoves:0,
	playerTwoTotalMoves:0,
	playerOneMoveLeft: true,
	playerOneMoveUp: true,
	playerOneMoveDown: true,
	playerOneMoveRight: true,
	playerTwoMoveLeft: true,
	playerTwoMoveUp: true,
	playerTwoMoveDown: true,
	playerTwoMoveRight: true,

	newGame() {
		this.timer()
		this.randomTiles()
		this.secondPlayerRandomTiles()
		this.firstTwoTiles()
		this.secondPlayerFirstTwoTiles()
		this.tileColor()
		this.secondPlayerTileColor()
	},
	timer() {
		if(this.timerOff == true) {
			let totalTime = '5:01'
			let interval = setInterval(() => {
				let timer = totalTime.split(':')
				let minutes = parseInt(timer[0],10)
				let seconds = parseInt(timer[1],10)
				seconds--;
				minutes = seconds < 0 ? --minutes: minutes;
				seconds = seconds < 0 ? 59: seconds;
				seconds = seconds < 10 ? '0' + seconds : seconds;
				$('#timer').html(minutes + ':' + seconds);
				if(minutes < 0) clearInterval(interval);
				if((seconds <= 0) && (minutes <= 0)) {
					clearInterval(interval);
					this.gameOver()
				}
				totalTime = minutes + ':' + seconds;
			}, 1000) 
			this.timerId = interval
		}
	},
	clearInterval() {
		clearInterval(this.timerId)
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
		this.randomTiles()
		$('.tile').eq(secondTile).text(this.randomTile)
	},	
	// Display two random tiles on board with values 2 or 4
	secondPlayerFirstTwoTiles() {
		let firstTile = Math.floor((Math.random() * 15))
		let secondTile = Math.floor((Math.random() * 15))
		// Avoids error if both tiles land on the same div
		if(firstTile === secondTile) {
			secondTile = firstTile++
		}
		$('.secondGridTile').eq(firstTile).text(this.secondPlayerRandomTile)
		this.secondPlayerRandomTiles()
		$('.secondGridTile').eq(secondTile).text(this.secondPlayerRandomTile)
	},
	// Assigns 2 or 4 value to variable
	randomTiles() {
		const randomValue = Math.random()
		this.randomTile = randomValue > 0.5 ? 2 : 4
		// console.log(this.randomTile);
	},
	secondPlayerRandomTiles() {
		const randomValue = Math.random()
		this.secondPlayerRandomTile = randomValue > 0.5 ? 2 : 4
		// console.log(this.randomTile);
	},
	// Creates a single tile after each move
	newTile() {
		// Arr to put all the tiles without a number
		const emptyTiles = []
		for(let i = 0; i < 16; i++) {
			if($(`#first${i}`).html() == '') {
				emptyTiles.push(i)
			}
		}
		const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]
		this.randomTiles()
		$(`#first${randomEmptyTile}`).html(this.randomTile)
		// console.log(emptyTiles);
	},
	secondPlayerNewTile() {
		// Arr to put all the tiles without a number
		const secondPlayerEmptyTiles = []
		for(let i = 0; i < 16; i++) {
			if($(`#second${i}`).html() == '') {
				secondPlayerEmptyTiles.push(i)
			}
		}
		const randomEmptyTile = secondPlayerEmptyTiles[Math.floor(Math.random() * secondPlayerEmptyTiles.length)]
		this.secondPlayerRandomTiles()
		$(`#second${randomEmptyTile}`).html(this.secondPlayerRandomTile)
	},
	// CSS properties changed in JS since colors change when values change
	tileColor() {
		$('.tile').each((index) => {
		const tile = $(`#first${index}`).html()
		if(tile == '') {
			$(`#first${index}`).css('background-color', 'rgb(203, 193, 182)')
		}
		if(tile <= 4) {
			$(`#first${index}`).css('color', 'rgb(118, 110, 102)')
			$(`#first${index}`).css('font-size', '50px')
		}
		if(tile > 4) {
			$(`#first${index}`).css('color', 'rgb(249, 246, 243)')
		}
		if(tile == 2) {
			$(`#first${index}`).css('background-color', 'rgb(237, 228, 219)')
		}
		if(tile == 4) {
			$(`#first${index}`).css('background-color', 'rgb(233, 224, 203)')
		}
		if(tile == 8) {
			$(`#first${index}`).css('background-color', 'rgb(233, 179, 130)')
		}
		if(tile == 16) {
			$(`#first${index}`).css('background-color', 'rgb(233, 153, 109)')
		}
		if(tile == 32) {
			$(`#first${index}`).css('background-color', 'rgb(233, 131, 103)')
		}
		if(tile == 64) {
			$(`#first${index}`).css('background-color', 'rgb(233, 104, 72)')
		}
		if(tile >= 128) {
			$(`#first${index}`).css('font-size', '45px')
		}
		if(tile == 128) {
			$(`#first${index}`).css('background-color', 'rgb(233, 208, 127)')
		}
		if(tile == 256) {
			$(`#first${index}`).css('background-color', 'rgb(233, 203, 116)')
		}
		if(tile == 512) {
			$(`#first${index}`).css('background-color', 'rgb(233, 199, 101)')
		}
		if(tile >= 1024) {
			$(`#first${index}`).css('font-size', '40px')
		}
		if(tile == 1024) {
			$(`#first${index}`).css('background-color', 'rgb(233, 200, 93)')
		}
		if(tile >= 2048) {
			$(`#first${index}`).css('background-color', 'rgb(230, 195, 80)')
			this.gameOver()
		}
		})	
	},
	// CSS properties changed in JS since colors change when values change
	secondPlayerTileColor() {
		$('.secondGridTile').each((index) => {
			const tile = $(`#second${index}`).html()
			if(tile == '') {
				$(`#second${index}`).css('background-color', 'rgb(203, 193, 182)')
			}
			if(tile <= 4) {
				$(`#second${index}`).css('color', 'rgb(118, 110, 102)')
				$(`#second${index}`).css('font-size', '50px')
			}
			if(tile > 4) {
				$(`#second${index}`).css('color', 'rgb(249, 246, 243)')
			}
			if(tile == 2) {
				$(`#second${index}`).css('background-color', 'rgb(237, 228, 219)')
			}
			if(tile == 4) {
				$(`#second${index}`).css('background-color', 'rgb(233, 224, 203)')
			}
			if(tile == 8) {
				$(`#second${index}`).css('background-color', 'rgb(233, 179, 130)')
			}
			if(tile == 16) {
				$(`#second${index}`).css('background-color', 'rgb(233, 153, 109)')
			}
			if(tile == 32) {
				$(`#second${index}`).css('background-color', 'rgb(233, 131, 103)')
			}
			if(tile == 64) {
				$(`#second${index}`).css('background-color', 'rgb(233, 104, 72)')
			}
			if(tile >= 128) {
				$(`#second${index}`).css('font-size', '45px')
			}
			if(tile == 128) {
				$(`#second${index}`).css('background-color', 'rgb(233, 208, 127)')
			}
			if(tile == 256) {
				$(`#second${index}`).css('background-color', 'rgb(233, 203, 116)')
			}
			if(tile == 512) {
				$(`#second${index}`).css('background-color', 'rgb(233, 199, 101)')
			}
			if(tile >= 1024) {
				$(`#second${index}`).css('font-size', '40px')
			}
			if(tile == 1024) {
				$(`#second${index}`).css('background-color', 'rgb(233, 200, 93)')
			}
			if(tile >= 2048) {
				$(`#second${index}`).css('background-color', 'rgb(230, 195, 80)')
				this.gameOver()
			}
		})	
	},
	playerOneLeft() {
		let movement = 0;
		// Combine all cells to the left
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#first${j}`).html()
				const next = $(`#first${j + 1}`).html();
				/*
					3, 7, 11 , 15 are the indexes of farthest right tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr > 0 && j != 3 && j != 7 && j != 11 && j != 15 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#first${j}`).html(newValue);
					$(`#first${j + 1}`).html('');
					movement = 1;
					this.tileColor()
					this.playerOneTotalScore += newValue;
				}
				// If current tile has no value and adj tile, no combining
				if(curr == '' && next != '' && j != 3 && j != 7 && j != 11 && j != 15) {
					let newValue = next
					$(`#first${j}`).html(newValue);
					$(`#first${j + 1}`).html('');
					this.tileColor()
					movement = 1
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor();
			this.playerOneTotalMoves++
			this.firstPlayerScore()
		}
		else{
			movement = 0
			this.playerOneMoveLeft = false
			this.playersCanMove()
		}
	},

	playerOneRight() {
		let movement = 0;
		// Combine all cells to the right
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#first${j}`).html()
				const next = $(`#first${j - 1}`).html();
				/*
					0, 4, 8, 12 are the indexes of farthest left tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr != '' && j != 0 && j != 4 && j != 8 && j != 12 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#first${j}`).html(newValue);
					$(`#first${j - 1}`).html('');
					movement = 1;
					this.playerOneTotalScore += newValue;
				}
				// If current tile has no value and adj tile, no combining
				// Current and next tile both empty
				if(curr == '' && next != '' && j != 0 && j != 4 && j != 8 && j != 12) {
					let newValue = next
					$(`#first${j}`).html(newValue);
					$(`#first${j - 1}`).html('');
					movement = 1;
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor();
			this.playerOneTotalMoves++
			this.firstPlayerScore()
		}
		else{
			movement = 0
			this.playerOneMoveRight = false
			this.playersCanMove()
		}
	},
	
	playerOneUp() {
		let movement = 0;
		// Combine all cells to the up
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#first${j}`).html();
				const next = $(`#first${j + 4}`).html();
				// Combine if bottom under current tile is equal
				// Use j < 12 since 3rd row stops at 11. 4th row, no tiles underneath
				if(curr != '' && curr == next && j < 12) {
					let newValue = (2 * parseInt(curr));
					$(`#first${j}`).html(newValue);
					$(`#first${j + 4}`).html('');
					movement = 1;
					this.playerOneTotalScore += newValue;
				}
				if(curr == '' && j < 12) {
					// If current tile has no value or tile under, no combining
					if(curr != '' || next != '' && j < 12) {
						movement = 1;
					}
					$(`#first${j}`).html(next);
					$(`#first${j + 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.newTile();
			this.tileColor();
			this.playerOneTotalMoves++
			this.firstPlayerScore()	
		}
		else{
			movement = 0
			this.playerOneMoveUp = false
			this.playersCanMove()
		}
	},

	playerOneDown() {
		let movement = 0;
		// Combine all cells to the down
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#first${j}`).html()
				const next = $(`#first${j - 4}`).html();
				// Combine if current tile  and tile above is equal
				// j > 3 since no tiles above first row 
				if(curr != '' && (curr == next) && j > 3) {
					let newValue = (2 * parseInt(curr));
					$(`#first${j}`).html(newValue);
					$(`#first${j - 4}`).html('');
					movement = 1;
					this.playerOneTotalScore += newValue;
					
				}
				if(curr == '' && j > 3) {
					let newValue = next
					// If current tile no value and tile above, no combining
					if(curr != '' || next != '' && j > 3) {
						movement = 1;
					}
					// Current and next tile both empty
					$(`#first${j}`).html(newValue);
					$(`#first${j - 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made 
		if(movement) {
			this.newTile();
			this.tileColor();
			this.playerOneTotalMoves++
			this.firstPlayerScore()
		}
		else{
			movement = 0
			this.playerOneMoveDown = false
			this.playersCanMove()
		}
	},
	playerTwoLeft() {
		let movement = 0;
		// Combine all cells to the left
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#second${j}`).html()
				const next = $(`#second${j + 1}`).html();
				/*
					3, 7, 11 , 15 are the indexes of farthest right tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr > 0 && j != 3 && j != 7 && j != 11 && j != 15 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#second${j}`).html(newValue);
					$(`#second${j + 1}`).html('');
					movement = 1;
					this.playerTwoTotalScore += newValue;
				}
				// If current tile has no value and adj tile, no combining
				if(curr == '' && next != '' && j != 3 && j != 7 && j != 11 && j != 15) {
					let newValue = next
					$(`#second${j}`).html(newValue);
					$(`#second${j + 1}`).html('');
					movement = 1
					this.playerTwoScore += newValue
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.secondPlayerNewTile();
			this.secondPlayerTileColor();
			this.playerTwoTotalMoves++;
			this.secondPlayerScore()
		}
		else{
			movement = 0
			this.playerTwoMoveLeft = false
			this.playersCanMove()
		}
	},
	playerTwoRight() {
		let movement = 0;
		// Combine all cells to the right
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#second${j}`).html()
				const next = $(`#second${j - 1}`).html();
				/*
					0, 4, 8, 12 are the indexes of farthest left tiles 
					Prevents tiles from going to the row above.
					Combine if adjacent tiles are equal
				*/
				if(curr != '' && j != 0 && j != 4 && j != 8 && j != 12 && (curr == next)) {
					let newValue = (2 * parseInt(curr));
					$(`#second${j}`).html(newValue);
					$(`#second${j - 1}`).html('');
					movement = 1;
					this.playerTwoTotalScore += newValue;
				}
				// If current tile has no value and adj tile, no combining
				// Current and next tile both empty
				if(curr == '' && next != '' && j != 0 && j != 4 && j != 8 && j != 12) {
					let newValue = next
					$(`#second${j}`).html(newValue);
					$(`#second${j - 1}`).html('');
					movement = 1;
					this.playerTwoScore += newValue
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.secondPlayerNewTile();
			this.secondPlayerTileColor()
			this.playerTwoTotalMoves++;
			this.secondPlayerScore()
		}
		else{
			movement = 0
			this.playerTwoMoveRight = false
			this.playersCanMove()
		}
	},
	
	playerTwoUp() {
		let movement = 0;
		// Combine all cells to the up
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#second${j}`).html();
				const next = $(`#second${j + 4}`).html();
				// Combine if bottom under current tile is equal
				// Use j < 12 since 3rd row stops at 11. 4th row, no tiles underneath
				if(curr != '' && curr == next && j < 12) {
					let newValue = (2 * parseInt(curr));
					$(`#second${j}`).html(newValue);
					$(`#second${j + 4}`).html('');
					movement = 1;
					this.playerTwoTotalScore += newValue;
				}
				if(curr == '' && j < 12) {
					// If current tile has no value or tile under, no combining
					if(curr != '' || next != '' && j < 12) {
						movement = 1;
					}
					$(`#second${j}`).html(next);
					$(`#second${j + 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made
		if(movement) {
			this.secondPlayerNewTile();
			this.secondPlayerTileColor();
			this.playerTwoTotalMoves++;
			this.secondPlayerScore()	
		}
		else{
			movement = 0
			this.playerTwoMoveUp = false
			this.playersCanMove()
		}
	},

	playerTwoDown() {
		let movement = 0;
		// Combine all cells to the down
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 16; j++) {
				const curr = $(`#second${j}`).html()
				const next = $(`#second${j - 4}`).html();
				// Combine if current tile  and tile above is equal
				// j > 3 since no tiles above first row 
				if(curr != '' && (curr == next) && j > 3) {
					let newValue = (2 * parseInt(curr));
					$(`#second${j}`).html(newValue);
					$(`#second${j - 4}`).html('');
					movement = 1;
					this.playerTwoTotalScore += newValue;
				}
				if(curr == '' && j > 3) {
					let newValue = next
					// If current tile no value and tile above, no combining
					if(curr != '' || next != '' && j > 3) {
						movement = 1;
						this.playersTwoTotalMoves++
					}
					// Current and next tile both empty
					$(`#second${j}`).html(newValue);
					$(`#second${j - 4}`).html('');
				}
			}
		}
		// New tile and update tile colors if movement is made 
		if(movement) {
			this.secondPlayerNewTile();
			this.secondPlayerTileColor();
			this.playerTwoTotalMoves++;
			this.secondPlayerScore()	
		}
		else{
			movement = 0
			this.playerTwoMoveDown = false
			this.playersCanMove()
		}
	},
	// Scores are based on the total value of the tiles combined
	firstPlayerScore() {
		$('#player-one-score').text('Score: ' + this.playerOneTotalScore)
		$('#player-one-moves').text('Moves: ' + this.playerOneTotalMoves)
	},
	secondPlayerScore() {
		$('#player-two-score').text('Score: ' + this.playerTwoTotalScore)
		$('#player-two-moves').text('Moves: ' + this.playerTwoTotalMoves)
	},
	// Checks to see if both players can still move
	playersCanMove() {
		if(
			this.playerOneMoveUp == false && 
			this.playerOneMoveDown == false && 
			this.playerOneMoveLeft == false && 
			this.playerOneMoveRight == false &&
			this.playerTwoMoveUp == false && 
			this.playerTwoMoveDown == false && 
			this.playerTwoMoveLeft == false && 
			this.playerTwoMoveRight == false 
		){
			this.gameOver()
		}
	},
	gameOver() {
		if(this.playerOneTotalScore > this.playerTwoTotalScore) {
			$('#first-overlay').fadeIn(300);
			game.clearInterval()
		}
		if(this.playerTwoTotalScore > this.playerOneTotalScore) {
			$('#second-overlay').fadeIn(300)
			game.clearInterval()
		}
	}
}

$(document).on('keydown', (e) => {
	let timeoutId = 0
    switch(e.which) {
    	case 87: // w - up
        	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerOneUp()
			}, 100)
        break; 

        case 68: // d - right
        	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerOneRight()
			}, 100)
        break; 

        case 83: // s - down
        	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerOneDown()
			}, 100)
        break; 

        case 65: // a - left
        	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerOneLeft()
			}, 100)    	
        break;

        case 37: // left
    		clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerTwoLeft()
			}, 100)
        break;

        case 38: // up
        	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerTwoUp()
			}, 100)
        break;

        case 39: // right
          	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerTwoRight()
			}, 100)
        break;

        case 40: // down
          	clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
	        	game.playerTwoDown()
			}, 100)
        break;

        default: return; // exit this handler for other keys
    }
    // e.preventDefault(); // prevent the default action (scroll / move caret)
})


$('#one-submit').on('click', (event) => {
	event.preventDefault()
	// console.log($("#one-myText")[0].value);
	// console.log($('#one-myText').val());
	if($("#one-myText").val() < 1) {
		$('#one-myText').css('background-color', 'rgba(255, 0, 0, 0.5')
		setTimeout("$('#one-myText').css('background-color', 'white');", 200);
	}
	else{
		const name = ($("#one-myText").val()).toUpperCase();
	  	$("#player-one-display-name").text('Player One: ' + name);
		$('#one-submit').hide()
		$('#one-myText').hide()
		game.playerOneName = true
	}
})

$('#two-submit').on('click', (event) => {
	event.preventDefault()
	if($("#two-myText").val() < 1) {
		$('#two-myText').css('background-color', 'rgba(255, 0, 0, 0.5')
		setTimeout("$('#two-myText').css('background-color', 'white');", 200);
	}
	else{
		// console.log($("#two-myText")[0].value);
		const name = ($("#two-myText").val()).toUpperCase();
	  	$("#player-two-display-name").text('Player Two: ' + name);
		$('#two-submit').hide()
		$('#two-myText').hide()
		game.playerTwoName = true
	}
})

$('#new-game').on('click', () => {
	if(game.playerOneName == true && game.playerTwoName == true) {
		game.newGame()
		$('#new-game').hide()
		$('#restart').show()
		$('#on-off').show()
	}
	else{
		$('#one-myText').css('background-color', 'rgba(255, 0, 0, 0.5')
		$('#two-myText').css('background-color', 'rgba(255, 0, 0, 0.5')
		setTimeout("$('#one-myText').css('background-color', 'white');", 200);
		setTimeout("$('#two-myText').css('background-color', 'white');", 200);
	}
})

$('#restart').on('click', () => {
	$('.tile').html('')
	$('.secondGridTile').html('')
	// console.log($('.tile'));
	game.clearInterval()
	game.playerOneTotalScore = 0
	game.playerTwoTotalScore = 0
	game.playerOneTotalMoves = 0
	game.playerTwoTotalMoves = 0
	game.firstPlayerScore()
	game.secondPlayerScore()
	game.newGame()
})

$('#first-close').on('click', () => {
	$('#first-overlay').fadeOut(300);
});

$('#second-close').on('click', () => {
	$('#second-overlay').fadeOut(300);
});

$('#on-off').on('click', () => {
	if($('#on-off').html() == 'TIMER ON') {
		$('#on-off').html('TIMER OFF')
		$('#on-off').css('background-color', '#434343')
		game.timerOff = false
		game.clearInterval()
		$('#timer').html('')
		// console.log('timer is off', game.timerOff);
	}
	else {
		$('#on-off').html('TIMER ON')
		$('#on-off').css('background-color', 'rgb(140, 123, 105)')
		game.timerOff = true
		game.timer()
		// console.log('timer is on', game.timerOff);
	}
})




