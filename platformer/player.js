function Player() {
  this.__proto__ = new Movement(); // inherit the movement ability

  this.moveLeft = this.moveRight = null;
  this.pos = createVector(150, 450);
  this.double = false;
  this.update = function() {
    if (this.moveLeft) {
      this.pos.x -= CONF.PLAYER.SPEED;
      this.pos.y -= 2;
    }
    if (this.moveRight) {
      this.pos.x += CONF.PLAYER.SPEED;
      this.pos.y -= 2;
    }
    if (this.pos.x < (CONF.PLAYER.WIDTH/2)) {
      this.pos.x = (CONF.PLAYER.WIDTH/2);
    }
    if (this.pos.x > CONF.WIDTH-(CONF.PLAYER.WIDTH/2)) {
      this.pos.x = CONF.WIDTH-(CONF.PLAYER.WIDTH/2);
    }
    if (this.pos.y == this.ground()) { // ineffiecent extra call
      this.double = false;
    }
    this.move();
  };
  this.render = function() {
    var air = 0; //this.ground() - this.pos.y;
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
    if (this.pos.y < this.ground() - 4  ) {
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
