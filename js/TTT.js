/*Divs*/
let boxes = $(".box");
const first = '<div class="screen screen-start" id="start"> <header> <h1>Tic Tac Toe</h1> <a href="#" class="button" id="startButton">Start game</a> </header> </div>';
const winning = function(numb, txt) { 
	return '<div class="screen screen-win screen-win-' + numb + '" id="finish"> <header> <h1>Tic Tac Toe</h1> <p class="message">' + txt + '</p> <a href="#" class="button" id="finishButton">New game</a> </header> </div>';
}
	
/*Win conditions*/
/*Horizontal*/
const topWin = [boxes[0], boxes[1], boxes[2]];
const midWin = [boxes[3], boxes[4], boxes[5]];
const bottomWin = [boxes[6], boxes[7], boxes[8]];

/*Vertical*/

const left = [boxes[0], boxes[3], boxes[6]]
const mid = [boxes[1], boxes[4], boxes[7]]
const right = [boxes[2], boxes[5], boxes[8]]

/*Diagonal */
const topLeft = [boxes[0], boxes[4], boxes[8]]
const topRight = [boxes[2], boxes[4], boxes[6]]

/*Player object*/
function player(position, symbol) {
	this.number = position;
	this.position = "player"+position;
	this.symbol = "url('img/" + symbol + ".svg')";
	this.inPlay = 0;
};

player.prototype.element = function() {
	return document.getElementById(this.position);
};
player.prototype.check = function(box) {
	return $(box).hasClass("box-filled-" + this.number);
}
player.prototype.checkForWin = function(array) {
	return array.every((box) => this.check(box));
};

let player1 = new player(1, "o");
let player2 = new player(2, "x");

/*Game UI*/	
function board() {
	this.boxes = $(".box");
	this.playerBoxes = $(".players");
}

board.prototype.welcomeScreen = function() {
	$("body").append(first);
	$("#startButton").click(() => {
	$(".screen-start").toggle();
	$(player1.element()).addClass("active");
});
};
board.prototype.changePlayer = function() {
	const player = player1.element();
	if($(player).hasClass("active")) {
		$(player).removeClass("active");
		$("#player2").addClass("active");
	} else {
		$(player).addClass("active");
		$("#player2").removeClass("active");
	}
};
board.prototype.win = function(numb) {
	if(numb !== "tie") {
		$("body").append(winning(numb, "Winner"));
	} else {
		$("body").append(winning(numb, "Tie"));
	}
	$("#finishButton").click(() => {
		console.log("Hola")
		this.newGame();
		$("#finish").remove();		
	})
};
board.prototype.newGame = function() {
	boxes.each(function(box) {
		this.className="box";
	})
	player1.inPlay = 0;
	$("#player1").addClass("active");
	player2.inPlay = 0;
	$("#player2").removeClass("active");
};

/*Misc functions*/
$(".box").hover((e) => { //entering the hover for the LI
	let playerId = $(".active").attr("id"); //targets what id that is active at the moment.
	if(e.target.className === "box" && playerId === "player1") {
		$(e.target).css("background-image", player1.symbol);
	} else if(e.target.className === "box" && playerId === "player2") {
		$(e.target).css("background-image", player2.symbol);
	}
	}, (e) => { // when leaving the hover from the LI.
		$(e.target).removeClass("hover");
		$(e.target).css("background-image", "");
	})

$(".box").click((e) => { // When a user clicks on one of the li items
	let target = e.target; // Saves the target to this.
	const checkWin = function (player, array) { //Function for checking all the array items.
		return player.checkForWin(array)
	}
	/*Checks if a winnner has been crowned*/
	const horiZontalWin = function (player) {
		return checkWin(player, topWin) ||checkWin(player, midWin) || checkWin(player, bottomWin)
	}
	const verticalWin = function(player) {
		return checkWin(player, left) ||checkWin(player, mid) || checkWin(player, right)
	}
	const diagonalWin = function(player) {
		return checkWin(player, topLeft) ||checkWin(player, topRight)
	}
	
	/*Misc for DRY*/
	function allFilled() {
		return $(box).hasClass("box-filled-1") || $(box).hasClass("box-filled-2")
	}
	function winConditionals(player) {
		return horiZontalWin(player) || diagonalWin(player) || verticalWin(player)
	}
	let freeSpace = !$(target).hasClass("box-filled-2") && !$(target).hasClass("box-filled-1");
	
	if($(player1.element()).hasClass("active")) {
	if(freeSpace){
		$(target).addClass("box-filled-1");
		player1.inPlay++;
		if(winConditionals(player1) ) {
			gameOn.win("one");
		}else if (player1.inPlay + player2.inPlay === 9){
			gameOn.win("tie");
		} else {
			gameOn.changePlayer();
		}
	}
	} else {
		if(freeSpace){
			$(target).addClass("box-filled-2");
			player2.inPlay++;
		if(winConditionals(player2)){
			gameOn.win("two");
		}else if (player1.inPlay + player2.inPlay === 9){
			gameOn.win("tie");
		}else {
			gameOn.changePlayer();
				}
			}
		}
});
//Cals the game to start when loaded.
const gameOn = new board();
gameOn.welcomeScreen();







