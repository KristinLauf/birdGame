window.Pipes = (function() {
	'use strict';

	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 10;
	var HEIGHT = 20;
	var POSITION_X = 100;
	var POSITION_Y = 50;
	var Controls = window.Controls;

	var Pipes = function(game){
		this.game = game;
		this.el = $(document.createElement('div'));
		this.el.addClass('Pipes');
		this.game.el.append(this.el[0]);
		this.pos = { x: 0, y: 0 }
	}

	Pipes.prototype.reset = function() {
		this.pos.x = POSITION_X;
		this.pos.y = POSITION_Y;
	};

//if x+wordl width þá initial position

	Pipes.prototype.onFrame = function(delta){
		if (Controls.isPlaying) {
			this.pos.x += delta * SPEED;
		}
		this.pos.x += (delta * SPEED/10);
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipes.prototype.checkCollisionWithBounds = function(player) {
		console.log(this.game.WORLD_HEIGHT);
		console.log(this.game.WORLD_WIDTH);

		var birdXmax = player.pos.x + 5;
		var birdXmin = player.pos.x;
		var birdYmax = player.pos.y + 5;
		var birdYmin = player.pos.y;

		var pipeYmax = this.game.WORLD_HEIGHT - HEIGHT;
		var pipeXmax = this.pos.x + WIDTH;
		var pipeXmin = this.pos.x;

		console.log(birdXmax + " bird x max");
		console.log(pipeXmin + " pipe x min");
		console.log(birdYmin + " bird y min");
		console.log(pipeYmax + " pipe y max");

		if(((birdXmax < pipeXmin) && (birdYmin > pipeYmax)) ||
			((birdXmin < pipeXmax) && (birdYmin > pipeYmax))){
			return this.game.gameover();
		} 


	};

	return Pipes;

})();