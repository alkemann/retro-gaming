function Paddle(x) {
  this.pos = createVector(x, height/2);
  this.speed = CONF.PADDLE.SPEED;
  this.score = 0;
  this.update = function() {
    this.pos.y = mouseY;
  }
  this.rect = function() {
    return [
      this.pos.x - (CONF.PADDLE.WIDTH / 2),
      this.pos.y - (CONF.PADDLE.HEIGHT / 2),
      CONF.PADDLE.WIDTH,
      CONF.PADDLE.HEIGHT
    ];
  }
  this.render = function() {
    push();
    translate(this.pos.x - (CONF.PADDLE.WIDTH / 2), this.pos.y - (CONF.PADDLE.HEIGHT / 2));
    rect(0, 0, CONF.PADDLE.WIDTH, CONF.PADDLE.HEIGHT);
    pop();
  }
}