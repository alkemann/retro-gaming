function Asteroid(sourcePos, sourceRadius, sourceVel) {
  var VERTS = 13,
      MIN_SIZE = 10,
      MIN_START_SIZE = 30;
      MAX_SIZE = 40,
      DRAG = 0.975;

  obj = {
    r: sourceRadius || random(MIN_START_SIZE, MAX_SIZE),
    orientation: 0,
    offsets: []
  }

  var max_rotate_speed = map(obj.r, 1, MAX_SIZE, 0.04, 0.0001);
  obj.rot_speed = random(-1*max_rotate_speed, max_rotate_speed);

  if (sourcePos) {
    obj.pos = sourcePos.copy();
  } else {
    do {
      obj.pos = createVector(random(width), random(height));
    } while (obj.pos.dist(ship.pos) < 100);
  }

  if (sourceVel) {
    obj.vel = sourceVel;
  } else {
    obj.vel = createVector(ship.pos.x-obj.pos.x, ship.pos.y-obj.pos.y);
    obj.vel.normalize();
    obj.vel.mult(-1);
    obj.vel.rotate(random(-1, 1))
  }

  var speed_size_adjust = map(obj.r, MAX_SIZE, MIN_SIZE, 0.25, 2),
      speed_random_adjust = random(0.6, 0.8),
      speed_adjust = speed_random_adjust + speed_size_adjust;

  // TODO more speed for smaller rocks

  obj.speed = speed_adjust;
  obj.vel.mult(speed_adjust);
  var o = obj.r / 4;
  for (var i = 0; i < VERTS; i++) {
    obj.offsets[i] = random(o*-1, o);
  }

  obj.hit = function() {
    if (this.r <= MIN_SIZE) {
      return false;
    }
    var out = [],
      newPos1 = this.pos.copy(),
      newPos2 = this.pos.copy(),
      newAngle1 = createVector(ship.pos.x-this.pos.x, ship.pos.y-this.pos.y),
      newAngle2 = createVector(ship.pos.x-this.pos.x, ship.pos.y-this.pos.y);


    newAngle1.normalize();
    newAngle1.mult(-3);
    newAngle1.rotate(random(0.1, 1));
    newAngle2.normalize();
    newAngle2.rotate(random(-0.1, -1));
    newAngle2.mult(-3);

    newPos1.add(newAngle1);
    newPos2.add(newAngle2);

    out[0] = new Asteroid(newPos1, this.r / 2, newAngle1);
    out[1] = new Asteroid(newPos2, this.r / 2, newAngle2);

    return out;
  }

  obj.collideCheck = function(other) {
    var min_distance = this.r + other.r,
        r = this.r, x = this.pos.x, y = this.pos.y,
        dx = x, dy = y;

    if (x > width - r) {
      dx = x - width;
    } else if (x < 0 + r) {
      dx = width + x;
    }
    if (y > height - r) {
      dy = y-height;
    } else if (y < 0 + r) {
      dy = height + y;
    }
    if (dx != x || dy != y) {
      var double = createVector(dx, dy);
      if (double.dist(other.pos) <= min_distance) {
        return true;
      }
    }
    return this.pos.dist(other.pos) <= min_distance;
  }

  obj.update = function() {
    this.pos.add(this.vel);
    if (this.vel.mag() > this.speed) {
      this.vel.mult(DRAG);
    }
    this.orientation += this.rot_speed;
    this.edge();
    return this;
  }

  obj.render = function() {
    this.draw(this.pos.x, this.pos.y);
    this.double();
  }

  obj.draw = function(x, y) {
    push();
    fill(0);
    translate(x, y);
    rotate(this.orientation);
    beginShape();
    for (var i = 0; i < VERTS; i++) {
      var angle = map(i, 0, VERTS, 0, TWO_PI),
        r = this.r + this.offsets[i];
        x = r * cos(angle),
        y = r * sin(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
  
  obj.__proto__ = base_object;
  return obj;
}
