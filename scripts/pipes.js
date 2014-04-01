window.Pipes = (function() {
	'use strict';

	var SPEED = 200; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 20;
	var Controls = window.Controls;

	var Pipes = function(game){
		this.game = game;
		this.el = $(document.createElement('div'));
		this.el.addClass('Pipes');
		this.game.el.append(this.el[0]);
		this.pos = { x: game.WORLD_WIDTH, y: 0 }
	}

	Pipes.prototype.reset = function() {
		this.pos.x = 100;
		this.pos.y = 0;
		HEIGHT = Math.floor((Math.random()*20)+1)
	};

//if x+wordl width þá initial position

	Pipes.prototype.onFrame = function(delta){

		if (Controls.isPlaying) {
			this.pos.x -= delta * SPEED;
		}

		if((this.pos.x + WIDTH) < 0){
			this.reset();
		}

		this.pos.x -= (delta * SPEED/10);
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipes.prototype.checkCollisionWithBounds = function(player) {

		var birdXmax = player.pos.x + 12.5;
		var birdXmin = player.pos.x;
		var birdYmax = player.pos.y;
		var birdYmin = player.pos.y + 5;

		var pipeYmax = this.game.WORLD_HEIGHT - HEIGHT;
		var pipeXmax = this.pos.x + WIDTH;
		var pipeXmin = this.pos.x;
		console.log(birdXmax + "    Bxmax");
		console.log(birdYmin + "    Bymin");
		console.log(pipeXmin + "    MINx");
		console.log(pipeYmax + "    Ypiop");

		/*if(((birdXmax < pipeXmin) && (birdYmin > pipeYmax)) ||
			((birdXmin < pipeXmax) && (birdYmin > pipeYmax))){
			return this.game.gameover();
		} */
		if(((birdXmax >= pipeXmin) && (birdYmin >= pipeYmax) && (birdXmin <= pipeXmax)) ||
			((birdXmin >= pipeXmin) && (birdYmin >= pipeYmax) && (birdYmax <= pipeXmax))){
			return this.game.gameover();
		}

	};

	return Pipes;

})();