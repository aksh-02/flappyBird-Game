var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables

var gap = 100;
var constant = pipeNorth.height + gap;

var bx = 10;
var by = 150;

var gravity = 1.5;
var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();
var smash = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
smash.src = "sounds/smash.mp3";
// keys

document.addEventListener("keydown", moveUp);

function moveUp(){
	by -= 25;
	fly.play();
}


// pipe coordinates

var pipe = [];

pipe[0] = {
	x : cvs.width,
	y : 0
}


// draw images

function draw(){
	ctx.drawImage(bg, 0, 0);
	for(var i = 0; i < pipe.length; i++){
		ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
		
		pipe[i].x--;

		if(pipe[i].x == 75){
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
			})
		}

		if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width 
			&& (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y + constant)
			|| by + bird.height >= cvs.height - fg.height){
				ctx.font = "20px Verdana";
				ctx.fillText("Game Over", 50, cvs.height-100);
				document.write('Game over');
				smash.play();
				setTimeout(function() {
    				location.reload() // reload the page
				}, (2 * 1000));
			}
		
		if(pipe[i].x == 5){
			score++;
			scor.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height-fg.height);

	ctx.drawImage(bird, bx, by);

	by += gravity;

	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : " + score, 10, cvs.height-20);

	requestAnimationFrame(draw);
}
draw();
