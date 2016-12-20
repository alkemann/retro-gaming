function Missile(ship) {
  obj = {
    pos: createVector(ship.pos.x, ship.pos.y),
    cr: 255,
    cg: random(50, 155),
    cb: random(50, 155),
    angle: p5.Vector.fromAngle(ship.heading),
    travelled: 0,
    r: 4
  };

  // obj.angle.add(ship.vel); // @TODO adjust for speed of ship
  obj.angle.mult(CONF.MISSILE.SPEED);

  obj.update = function() {
    this.travelled += this.angle.mag();
    this.pos.add(this.angle);
    this.edge();
  }

  obj.render = function() {
    push();
    strokeWeight(this.r);
    stroke(this.cr, this.cg, this.cb);
    point(this.pos.x, this.pos.y);
    pop();
  }

  obj.expired = function() {
    return this.travelled >= CONF.MISSILE.RANGE;
  }

  obj.__proto__ = base_object;
  return obj;
}
