const header = $("ul").append('<div class="screen screen-start" id="start"><h1>Tic Tac Toe</h1> <a href="#" class="button">Start game</a> </header></div>');
const boxes = $(".box");

/*Win conditions*/
const topWin = [boxes[0], boxes[1], boxes[2]];
const midWin = [boxes[3], boxes[4], boxes[5]];
const bottomWin = [boxes[6], boxes[7], boxes[8]];

function test1(box) {
	return $(box).hasClass("box-filled-" + player1.number);
}

function player(name, position, symbol) {
	this.name = name;
	this.number = position;
	this.position = "player"+position;
	this.symbol = symbol;
	this.inRow = 0;
	this.inPlay = 0;
	console.log(this.number) // Returns the number, example 1.
	console.log(this) // Returns the class object {name: "Computer", number: 2, position: "player2", symbol: "x", inRow: 0, …}
};

player.prototype.element = function() {
	return document.getElementById(this.position);
};
player.prototype.check = function(box) {
	console.log($(box).hasClass("box-filled-" + this.number)); //Returns false
	console.log("box-filled-" + this.number) // returns box-filled-undefined
	console.log(this); // Returns Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
	return $(box).hasClass("box-filled-" + this.number);
}
player.prototype.checkForWin = function(array) {
	//this.check(array);
	//return array.every(test1);
	return array.every(this.check);
};
player.prototype.winCondition = function() {
}


let player1 = new player("Tomas", 1, "o");
let player2 = new player("Computer", 2, "x")

function changePlayer() {
	const player = player1.element();
	if($(player).hasClass("active")) {
		$(player).removeClass("active");
		$("#player2").addClass("active");
	} else {
		$(player).addClass("active");
		$("#player2").removeClass("active");
	}
}
function Hover() {
	$(".box").mouseenter((e) => {
		let player;
		if($("#player1").hasClass("active")) {
			player = player1;
		} else {
			player = player2;
		}
		const target = e.target;
		if(target.className !== "box box-filled-1" && target.className !== "box box-filled-2" ){
		$(target).addClass("hover");
		$(target).css("background-image", "url('img/" + player.symbol  +".svg')");
		} 
	}).mouseleave((e) => {
		const target = e.target;
		$(target).removeClass("hover");
		$(target).css("background-image", "");
	}); 
};
$(".box").click((e) => {
	let target = e.target;
	if($(player1.element()).hasClass("active")) {
	$(target).removeClass("hover");
	if(!$(target).hasClass("box-filled-2") && !$(target).hasClass("box-filled-1")){
	$(target).addClass("box-filled-1");
	changePlayer();
	}
	if(player1.checkForWin(topWin)) {
		console.log("Yay you win!")
	}
	} else {
		$(target).removeClass("hover");
		if(!$(target).hasClass("box-filled-2") && !$(target).hasClass("box-filled-1")){
			$(target).addClass("box-filled-2");
			changePlayer();
		}
		if(player2.checkForWin(topWin)) {
			console.log("Yay you win!")
		}
	}
});
$(".button").click(() => {
	$(".screen-start").remove();
	$(player1.element()).addClass("active");
	Hover();
})





