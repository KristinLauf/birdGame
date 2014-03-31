window.Ground = (function() {
	'use strict';

	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 1;
	var INITIAL_POSITION_Y = 0;

	var Ground = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};
	
	Ground.prototype.onFrame = function(delta) {

		this.pos.x += (delta * SPEED/10);


	};

	return Ground;
})();
