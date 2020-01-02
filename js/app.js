const game = {

	/* ===== new game =====
	Goal: randomly pick two tiles with values 2 or 4


	*/

	$gameBox: [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],

	tileNumbers: [],
	tileCoordinates: [],

	newGame() {
	},

	newTile() {
		/* ==== Assign coordinates to array =====
		Goal: write a nested for loop, assign x and y values
		*/
		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 4; j++) {
				if(this.$gameBox[i][j] === 0) {
					this.tileNumbers.push({
						x: i,
						y: j
					})
				}
			}
		}

		/* ===== Random Assignment =====
		Goal: random coordinates and assign values
		*/
		if(this.tileNumbers.length > 0) {
			// console.log($tileNumbers);
			let randomTile = this.tileNumbers[Math.floor(Math.random() * this.tileNumbers.length)]
			// console.log(randomTile);
			let randomValue = Math.random()

			// if($random > 0.5){
			// 	this.$gameBox[$randomTile.x][$randomTile.y] = 2
			// }
			// else {
			// 	this.$gameBox[$randomTile.x][$randomTile.y] = 4
			// }

			// $random > 0.5 ? this.$gameBox[$randomTile.x][$randomTile.y] = 2
			// : this.$gameBox[$randomTile.x][$randomTile.y] = 4

			// gray = 5 ? red = 3 ? red= 10 : red=  0 : undefined
			let random = this.$gameBox[randomTile.x][randomTile.y] = randomValue > 0.5 ? 2 : 4
			// console.log(randomTile.x);
			// console.log(randomTile.y);
			let assignTile = `${randomTile.x}${randomTile.y}`
			console.log(assignTile);

			for(let i = 0; i < this.tileCoordinates.length; i++) {
				const coordinate = this.tileCoordinates[i]
				// console.log(coordinate);
				if(this.tileCoordinates[i] == assignTile) {
					console.log('works');
					console.log('this is random', random)
					if(assignTile ==  $('.tile')[i].id) {
						// $('#').css('background-color', 'red')
					}
				}
			}
			
		}
		
	},

	createGrid() {
		for(let i = 0; i < 16; i++) {
			const tile = document.createElement('div')
			tile.setAttribute('class', `tile`)
			const id = `${this.tileNumbers[i].x}${this.tileNumbers[i].y}`
			tile.setAttribute('id', id)
			tile.innerText = 2
			this.tileCoordinates.push(id)
			$('#container').append(tile)
			// console.log($('.tile')[i].id)
		}
		console.log(this.tileCoordinates);
	},

	combineTile() {
		for(let i = 0; i < 16; i++) {
			console.log($('.tile')[i].innerText);
			if($('.tile')[i].innerText % 2 === 0) {
				console.log('works');
				$('')
			}
		}
	}

}

game.newTile()
game.newTile()
console.table(game.$gameBox); // LIFE SAVER...See changes as table
game.createGrid()
game.newTile()
// game.combineTile()

console.log($('#00')[0].innerText);
console.log($('#01')[0].innerText);

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        alert('left pressed')
        if($('#00')[0].innerText === $('#01')[0].innerText) {
        	$('#01')[0].innerText = 0
        	$('#00')[0].innerText = 4
        }
        
        break;

        case 38: // up
        break;

        case 39: // right
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});






