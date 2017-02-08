function Slot()
{
	this.render_tile = function(tile) {
		push();
		// stroke(200, 20);
		noStroke();
		fill(tile.color, tile.color, tile.color);
		let w = CONF.WIDTH / CONF.WORLD.WIDTH,
			h = CONF.HEIGHT / CONF.WORLD.HEIGHT,
			x = tile.pos.x * w,
			y = tile.pos.y * h;
		
		rect(x, y, w, h);

		pop();
	};
}
