function Player() {
  this.__proto__ = new Movement(); // inherit the movement ability

  this.moveLeft = this.moveRight = null;
  this.pos = createVector(50, CONF.GROUND - 2);
  this.double = false;
  this.update = function() {
    if (this.moveLeft) {
      this.pos.x -= CONF.PLAYER.SPEED;
    }
    if (this.moveRight) {
      this.pos.x += CONF.PLAYER.SPEED;
    }
    if (this.pos.x < (CONF.PLAYER.WIDTH/2)) {
      this.pos.x = (CONF.PLAYER.WIDTH/2);
    }
    if (this.pos.x > CONF.WIDTH-(CONF.PLAYER.WIDTH/2)) {
      this.pos.x = CONF.WIDTH-(CONF.PLAYER.WIDTH/2);
    }
    if (this.pos.y == CONF.GROUND) {
      this.double = false;
    }
    this.move();
  };
  this.render = function() {
    var air = CONF.GROUND - this.pos.y;
    var width = map(air, 0, 150, CONF.PLAYER.WIDTH, (CONF.PLAYER.WIDTH*2)/3);
    var height = map(air, 0, 150, CONF.PLAYER.HEIGHT, CONF.PLAYER.HEIGHT*2);

    push();
    noStroke();
    fill(200);
    translate(this.pos.x - (width/2), this.pos.y);
    rect(0, 0, width, -height);
    pop();
  };
  this.up = function() {
    if (this.pos.y < CONF.GROUND - 2) {
      if (this.double || CONF.PLAYER.DOUBLE_JUMP == false) {
        return; // No more double jump!
      } else {
        this.double = true;
      }
    }
    this.applyForce(createVector(0, -1 * CONF.PLAYER.JUMP));
  };
  this.startRight = function() {
    this.moveRight = true;
  };
  this.startLeft = function() {
    this.moveLeft = true;
  };
  this.stopRight = function() {
    this.moveRight = false;
  };
  this.stopLeft = function() {
    this.moveLeft = false;
  };
}

function Movement() {
  return {
    pos: createVector(0, 0),
    vel: createVector(0, 0),
    acc: createVector(0, 0),
    applyForce: function(f) {
      this.acc.add(f);
    },
    move: function() {
      // reduce the added velocity over time
      // this.vel.mult(CONF.DRAG);

      // add gravity to acc
      if (this.pos.y <= CONF.GROUND) {
        this.acc.add(createVector(0, CONF.GRAVITY));
      } else {
        this.acc.add(createVector(0, -1 * CONF.GRAVITY));
      }

      this.vel.add(this.acc);

      var move = this.vel.copy();
      // Devide the force over a second
      move.mult(deltaTime);

      this.pos.add(move);
      if (this.pos.y > CONF.GROUND) {
        this.pos.y = CONF.GROUND;
        this.vel.y = 0;
      }

      this.acc.mult(0);
    }
  }
}