window.Pipes = (function() {
	'use strict';

	var SPEED = 500; 
	var WIDTH = 10;
	var HEIGHT = 25;
	var Controls = window.Controls;
	var defX = 0;
	var score = 0;

	var Pipes = function(upperEl, lowerEl, game, x){
		this.upperEl = upperEl;
		this.lowerEl = lowerEl;
  		this.game = game;
 		this.posT = { x: x, y: 0 }; // Position of top pipe
 		this.posB = { x: x, y: 0}; // Position of bottom pipe
 		defX = x;
	}

	Pipes.prototype.reset = function() {
		// Reset gets the pipe to the beginning of the canvas
		this.posB.x = defX;
		this.posB.y = 0;
		this.posT.x = defX;
		this.posT.y = 0;

		// Adding a scoreboard
		score++;
		console.log("score " + ((score / 2) - 1));
		$(".Scoreboard .value").html((score/2)-1);
		
	};

	Pipes.prototype.onFrame = function(delta){

		// Pipes start rolling when the game is playing
		if (Controls.isPlaying) {
			this.posB.x -= delta * SPEED;
			this.posT.x -=delta * SPEED;
		}
		// If the pipes are out of the canvas we call reset
		if((this.posB.x + WIDTH) < 0){
			this.reset();
		}

		// Formula for placing positions of the x
		this.posB.x -= (delta * SPEED/10);
		this.posT.x -= (delta * SPEED/10);
		
		// Moving the pipes across the canvas, hardware accelerated 3d
		this.upperEl.css('transform', 'translateZ(0) translate3d(' + this.posT.x + 'em, ' + this.posT.y + 'em, 0em)');
		this.lowerEl.css('transform', 'translateZ(0) translate3d(' + this.posB.x + 'em, ' + this.posB.y + 'em, 0em)');

	};

	Pipes.prototype.checkCollisionWithBounds = function(player) {
		// Making variables for all positions of the bird and pipes
		var birdXmax = player.pos.x + 12.5;
		var birdXmin = player.pos.x;
		var birdYmax = player.pos.y;
		var birdYmin = player.pos.y + 5;

		var pipeYmax = this.game.WORLD_HEIGHT - HEIGHT;
		var pipeXmax = this.posB.x + WIDTH;
		var pipeXmin = this.posB.x;

		var pipeYmaxT = HEIGHT;
		var pipeXmaxT = this.posT.x + WIDTH;
		var pipeXminT = this.posT.x;

		// Long and beaufiful if sentance that checks if the "bird" (or cat) is colliding
		// With the top or bottom pipe
		if(((birdXmax >= pipeXmin) && (birdYmin >= pipeYmax) && (birdXmin <= pipeXmax)) ||
			((birdXmin <= pipeXmax) && (birdYmin >= pipeYmax) && (birdXmax >= pipeXmax)) || 
			((birdXmax >= pipeXminT) && (birdYmin <= pipeYmaxT) && (birdXmin <= pipeXminT)) ||
			((birdXmin <= pipeYmaxT) && (birdYmax <= pipeYmaxT) && (birdXmax >= pipeXmax))){
			return this.game.gameover();
		}
	};
	return Pipes;
})();