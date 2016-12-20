function Block() {
	return {
		pos: createVector(5,5),
		render: function() {
			Views.block(pos2cord(this.pos), "RED");
		}
	}
}
