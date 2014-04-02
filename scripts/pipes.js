window.Pipes = (function() {
	'use strict';

	var SPEED = 400; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 20;
	var Controls = window.Controls;
	var defX = 0;

	var Pipes = function(upperEl, lowerEl, game, x){
		this.upperEl = upperEl;
		this.lowerEl = lowerEl;
  		this.game = game;
 		this.posT = { x: x, y: 0 };
 		this.posB = { x: x, y: 0};
 		defX = x;
	}


	Pipes.prototype.reset = function() {
		this.posB.x = defX;
		this.posB.y = 0;
		this.posT.x = defX;
		this.posT.y = 0;
		//HEIGHT = Math.floor((Math.random()*20)+1);
		//this.el.height(Math.floor((Math.random()*20)+1));
	};

	Pipes.prototype.onFrame = function(delta){

		if (Controls.isPlaying) {
			this.posB.x -= delta * SPEED;
			this.posT.x -=delta * SPEED;
		}

		if((this.posB.x + WIDTH) < 0){
			this.reset();
		}

		this.posB.x -= (delta * SPEED/10);
		this.posT.x -= (delta * SPEED/10);
		
		this.upperEl.css('transform', 'translate3d(' + this.posT.x + 'em, ' + this.posT.y + 'em, 0em)');
		this.lowerEl.css('transform', 'translate3d(' + this.posB.x + 'em, ' + this.posB.y + 'em, 0em)');

	};

	Pipes.prototype.checkCollisionWithBounds = function(player) {

		var birdXmax = player.pos.x + 12.5;
		var birdXmin = player.pos.x;
		var birdYmax = player.pos.y;
		var birdYmin = player.pos.y + 5;

		var pipeYmax = this.game.WORLD_HEIGHT - HEIGHT;
		var pipeXmax = this.posB.x + WIDTH;
		var pipeXmin = this.posB.x;


		
		if(((birdXmax >= pipeXmin) && (birdYmin >= pipeYmax) && (birdXmin <= pipeXmax)) ||
			((birdXmin >= pipeXmin) && (birdYmin >= pipeYmax) && (birdYmax <= pipeXmax))){
			return this.game.gameover();
		}

	};

	return Pipes;

})();