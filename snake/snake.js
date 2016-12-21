function Snake(MODE) {
  var MODE = 'JUST_IN_TIME',
      ss = {
        grow: 0,
        timer: 0,
        pos: {x: 6, y: 6},
        dir: null,
        tail: [],
        reset: function(pos) {
          this.grow = 0;
          this.timer = 0;
          this.dir = null;
          this.pos = pos ? pos.copy() : {x: 6, y: 6};
          this.tail = [];
        },
        update: function() {
          this.timer += CONF.SNAKE.SPEED * deltaTime;
          if (this.timer >= 1) {
            this.move.update();
            this.timer = 0;
          }
          return this;
        },
        render: function() {
          for (var i = this.tail.length - 1; i >= 0; i--) {
            Views.block(pos2cord(this.tail[i]), COLORS.TAIL);
          }
          Views.block(pos2cord(this.pos), COLORS.HEAD);
        }
      }
  ;

  // @TODO switch on MODE
  ss.move = {
    up: function() {
      if (ss.dir != DIR.DOWN)
        ss.dir = DIR.UP;
    },
    down: function() {
      if (ss.dir != DIR.UP)
        ss.dir = DIR.DOWN;
    },
    left: function() {
      if (ss.dir != DIR.RIGHT)
        ss.dir = DIR.LEFT;
    },
    right: function() {
      if (ss.dir != DIR.LEFT)
        ss.dir = DIR.RIGHT;
    },
    update: function() {
      var prev_x = ss.pos.x, prev_y = ss.pos.y;

      if (ss.dir == DIR.RIGHT) {
        ss.pos.x += 1;
      } else if (ss.dir == DIR.LEFT) {
        ss.pos.x -= 1;
      } else if (ss.dir == DIR.UP) {
        ss.pos.y -= 1;
      } else if (ss.dir == DIR.DOWN) {
        ss.pos.y += 1;
      }

      if (ss.pos.x >= CONF.BOARD.MAX) {
        ss.pos.x = 0;
      } else if (ss.pos.x < 0) {
        ss.pos.x = CONF.BOARD.MAX - 1;
      }
      if (ss.pos.y >= CONF.BOARD.MAX) {
        ss.pos.y = 0;
      } else if (ss.pos.y < 0) {
        ss.pos.y = CONF.BOARD.MAX - 1;
      }
      if (ss.grow == 0) {
        ss.tail.splice(ss.tail.length - 1, 1);
      } else {
        ss.grow -= 1;
      }
      ss.tail.unshift({x: prev_x, y: prev_y});
    },
  }

  return ss;
}