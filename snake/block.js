function Block(reward, pos) {

  return {
    pos: pos || createVector(Math.floor(random(CONF.BOARD.MAX)), Math.floor(random(CONF.BOARD.MAX))),
    reward: reward || 1,
    render: function() {
      Views.block(pos2cord(this.pos), COLORS.RED);
    }
  }
}
