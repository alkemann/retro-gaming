function Ball() {
  this.pos = createVector(width/2, random(height/4, 3*height/4));
  this.vel = p5.Vector.random2D();
  this.vel.mult(CONF.BALL.SPEED);
  this.circ = function() {
    return [
      this.pos.x, this.pos.y, CONF.BALL.SIZE
    ];
  };

  this.update = function() {
    var move = this.vel.copy();
    move.mult(deltaTime);
    this.pos.add(move);
    if (this.pos.y >  height - (CONF.BALL.SIZE/2)) {
      this.reflectOnSide()
    } else if (this.pos.y <  0 + (CONF.BALL.SIZE/2)) {
      this.reflectOnSide();
    }

  };

  this.reflect = function(n) {
    var incidence = this.vel.mult(-1).normalize(),
        dot = incidence.dot(n);
    this.vel.set(2 * n.x * dot - incidence.x, 2 * n.y * dot - incidence.y, 0); //.mult(-1);
    this.vel.mult(CONF.BALL.SPEED);
  }

  this.reflectOnPaddle = function(dir) {
    this.reflect(createVector(dir, 0));
  };

  this.reflectOnSide = function() {
    this.reflect(createVector(0, 1));
  };

  this.hitPaddle = function(paddle) {
    var circ = ball.circ();
    return collideRectCircle(
      paddle[0], paddle[1], paddle[2], paddle[3],
      this.pos.x, this.pos.y, CONF.BALL.SIZE,
      true
    );
  };

  this.inGoal = function() {
    if (this.pos.x < 0) {
      return -1;
    } else if (this.pos.x > width) {
      return 1;
    }
    return false;
  };

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, CONF.BALL.SIZE);
    pop();
  };
}