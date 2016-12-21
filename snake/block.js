function Block(reward, pos) {
  return {
    eaten: false,
    pos: pos || createVector(Math.floor(random(CONF.BOARD.MAX)), Math.floor(random(CONF.BOARD.MAX))),
    reward: reward || 1,
    reset: function() {
      eaten: true
    },
    render: function() {
      Views.block(pos2cord(this.pos), COLORS.RED);
    }
  }
}
