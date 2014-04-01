window.Pipes = (function() {
	'use strict';

	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 20;
	var HEIGHT = 15;
	var POSITION_X = 10;
	var POSITION_Y = 10;
	var Controls = window.Controls;

	var Pipes = function(game){
		this.game = game;
		this.el = $(document.createElement('div'));
		this.el.addClass('Pipes');
		this.game.el.append(this.el[0]);
		this.pos = { x: 0, y: 0 }
	}

	Pipes.prototype.reset = function() {
		this.pos.x = Math.random()*WIDTH;;
		this.pos.y = Math.random()*WIDTH;;
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
		console.log(player.pos.y + " y of the player");
		console.log(this.pos.y + " y of the pipe");
		if ((player.pos.x + 5 > this.pos.x && player.pos.y < this.pos.y + HEIGHT) ||
			(player.pos.x < this.pos.x + WIDTH && player.pos.y < this.pos.y)){
			return this.game.gameover();
		}
	};

	return Pipes;

})();