function Player() {
  this.moveLeft = this.moveRight = null;

  this.__proto__ = new Movement();
  this.pos = createVector(50, CONF.GROUND - 2);
  this.update = function() {
    if (this.moveLeft) {
      this.pos.x -= 5;
    }
    if (this.moveRight) {
      this.pos.x += 5;
    }
    this.move();
  };
  this.render = function() {
    push();
    noStroke();
    fill(200);
    translate(this.pos.x, this.pos.y);
    rect(0, 0, CONF.PLAYER.WIDTH, -CONF.PLAYER.HEIGHT);
    pop();
  };
  this.up = function() {
    if (this.pos.y < CONF.GROUND - 2) return; // No double jump!
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