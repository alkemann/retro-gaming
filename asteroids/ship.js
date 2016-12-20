function Ship() {
  var ROT_POWER = 0.095,
      THRUST_POWER = 0.75,
      DRAG = 0.99,
      FORCE_LIMITER = 0.35,
      MAX_WARP = 5,
      SIZE = 35
      obj = {
    heading: 0,
    vel: createVector(0,0),
    pos: createVector(width/2, height/2),
    r: SIZE,
    rotLeft: 0,
    rotRight: 0,
    warp: false,
    missiles: [],

    engage: function() {this.warp = true;},
    halt: function() {this.warp = false;},
    turnLeft: function() {this.rotLeft = ROT_POWER * -1;},
    turnRight: function() {this.rotRight = ROT_POWER;},
    stopTurningLeft: function() {this.rotLeft = 0;},
    stopTurningRight: function() {this.rotRight = 0;},

    shoot: function() {
      this.missiles.push(new Missile(this));
    },

    update: function() {
      rot = this.rotLeft + this.rotRight;
      this.heading += rot;
      this.rot = 0;
      if (this.warp && this.vel.mag() < MAX_WARP) {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(FORCE_LIMITER);
        this.vel.add(force);
      }
      this.vel.mult(DRAG);
      this.pos.add(this.vel);
      this.edge();

      this.updateMissiles();

      return this;
    },

    updateMissiles: function() {
      for (var i = this.missiles.length - 1; i >= 0; i--) {
        m = this.missiles[i];
        if (m.expired()) {
          this.missiles.splice(i, 1);
          delete m;
        } else {
          m.update();
        }
      }
    },

    render: function() {
      this.renderMissiles();
      this.draw(this.pos.x, this.pos.y);
      this.double();
    },

    draw: function(x, y) {
      push();
      translate(x, y);
      rotate((PI/2) + this.heading);
      r = this.r;
      triangle(0, -r, r, r, -r, r);
      pop();
    },

    renderMissiles: function() {
      for (var m = 0; m < this.missiles.length; m++) {
        this.missiles[m].render();
      }
    }
  };
  obj.__proto__ = base_object;
  return obj;
}