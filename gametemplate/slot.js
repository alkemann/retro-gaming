function Slot()
{
	this.render_tile = function(tile) {
		push();
		// stroke(200, 20);
		noStroke();


		const COLORS = {
			1: color(200, 200, 50),
			2: color(130, 62, 17),
			3: color(200, 50, 50),
			4: color(50, 200, 250),
			5: color(0, 0, 200),
			6: color(20, 20, 20)
		};

		fill(COLORS[tile.type]);

		if (tile.type == TILE_TYPES.FARM) {
			const COLORS = {
				1: color(200, 200, 50),
				2: color(164, 207, 56),
				3: color(200, 50, 50),
				4: color(156, 117, 78),
			}
			fill(COLORS[tile.seed]);
		}

		// fill(tile.color, tile.color, tile.color);
		let w = CONF.WIDTH / CONF.WORLD.WIDTH,
			h = CONF.HEIGHT / CONF.WORLD.HEIGHT,
			x = tile.pos.x * w,
			y = tile.pos.y * h;

		rect(x, y, w, h);

		fill(5);
		textSize(10);
		textAlign(CENTER);

		let tekst = NAMES.TILES[tile.type];
		if (tile.type == TILE_TYPES.ROCK || tile.type == TILE_TYPES.WATER){
			fill(240);
		}
		if (tile.type == TILE_TYPES.FARM) {
			tekst = tekst + "\n" + NAMES.STAGES[tile.stage] +
			"\n" + NAMES.PLANTS[tile.seed];

		}
		text(tekst, x + (w/2), y + 10);
		fill(5);

		pop();
	};
}
