window.Pipes = (function() {
	'use strict';

	var Pipes = function(game){
		this.game = game;
		this.el = $(document.createElement('div'));
		this.el.addClass('Pipes');
		this.game.el.append(this.el[0]);
	}

	Pipes.prototype.onFrame = function(delta){
		this.el.('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	}


	return Pipes;

})();