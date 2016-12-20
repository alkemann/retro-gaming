function Snake(MODE) {
  var MODE = 'JUST_IN_TIME',
      snake = {
        grow: 0,
        pos: createVector(4, 1),
        dir: DIR.RIGHT,
        tail: [], // {x: 3, y: 1}, {x: 2, y: 1}
        update: function() {
          var prev_x = grid(this.pos.x),
              prev_y = grid(this.pos.y);
          if (this.dir == DIR.RIGHT) {
            this.pos.x += CONF.SNAKE.SPEED * deltaTime;
          } else if (this.dir == DIR.LEFT) {
            this.pos.x -= CONF.SNAKE.SPEED * deltaTime;
          } else if (this.dir == DIR.UP) {
            this.pos.y -= CONF.SNAKE.SPEED * deltaTime;
          } else if (this.dir == DIR.DOWN) {
            this.pos.y += CONF.SNAKE.SPEED * deltaTime;
          }
          if (this.pos.x > CONF.BOARD.MAX) {
            this.pos.x = 0;
          } else if (this.pos.x < 0) {
            this.pos.x = CONF.BOARD.MAX;
          }
          if (this.pos.y > CONF.BOARD.MAX) {
            this.pos.y = 0;
          } else if (this.pos.y < 0) {
            this.pos.y = CONF.BOARD.MAX;
          }
          var new_x = grid(this.pos.x),
              new_y = grid(this.pos.y);
          if (prev_x != new_x || prev_y != new_y) {
            if (this.grow == 0) {
              this.tail.splice(this.tail.length - 1, 1);
            } else {
              this.grow -= 1;
            }
            // this.tail.unshift({x: prev_x, y: prev_y});
          }
          return this;
        },
        render: function() {
          push();
          noStroke();
          fill(220);
          var posx = grid(this.pos.x),
              posy = grid(this.pos.y),
              x = (posx * CONF.SNAKE.SIZE) + CONF.PLAY.X,
              y = (posy * CONF.SNAKE.SIZE) + CONF.PLAY.Y;
          if (x >= CONF.PLAY.SIZE + CONF.PLAY.X) {
            console.error(x, y, posx, posy);
            delete draw;
          }
          rect(x, y, CONF.SNAKE.SIZE, CONF.SNAKE.SIZE);

          // @TODO switch on MODE
          for (var i = this.tail.length - 1; i >= 0; i--) {
            var posx = grid(this.tail[i].x),
                posy = grid(this.tail[i].y),
                x = (posx * CONF.SNAKE.SIZE) + CONF.PLAY.X,
                y = (posy * CONF.SNAKE.SIZE) + CONF.PLAY.Y;
            rect(x, y, CONF.SNAKE.SIZE, CONF.SNAKE.SIZE);
          }
          pop();
        }
      }
  ;

  // floor/round/ceil
  function grid(i) {
    // return Math.ceil(i);
    // return Math.round(i);
    return Math.floor(i);
  }

  // @TODO switch on MODE
  snake.move = {
    up: function() {
      snake.dir = DIR.UP;
    },
    down: function() {
      snake.dir = DIR.DOWN;
    },
    left: function() {
      snake.dir = DIR.LEFT;
    },
    right: function() {
      snake.dir = DIR.RIGHT;
    }
  }

  return snake;
}