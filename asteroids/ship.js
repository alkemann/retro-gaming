function Ship() {
  var obj = {
    heading: 0,
    vel: createVector(0,0),
    pos: createVector(width/2, height/2),
    r: CONF.SHIP.SIZE,
    rotLeft: 0,
    rotRight: 0,
    reloading: 0,
    shooting: false,
    warp: false,
    missiles: [],

    engage: function() {this.warp = true;},
    halt: function() {this.warp = false;},
    turnLeft: function() {this.rotLeft = CONF.SHIP.ROT_POWER * -1;},
    turnRight: function() {this.rotRight = CONF.SHIP.ROT_POWER;},
    stopTurningLeft: function() {this.rotLeft = 0;},
    stopTurningRight: function() {this.rotRight = 0;},
    startShooting: function() {this.shooting = true;},
    stopShooting: function() {this.shooting = false;},

    shoot: function() {
      if (this.reloading <= 0) {
        this.missiles.push(new Missile(this));
        this.reloading = 1;
      }
    },

    update: function() {
      this.reloading -= deltaTime * CONF.SHIP.RELOAD_SPEED;
      if (this.shooting) this.shoot();
      rot = this.rotLeft + this.rotRight;
      this.heading += rot;
      this.rot = 0;
      if (this.warp && this.vel.mag() < CONF.SHIP.MAX_WARP) {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(CONF.SHIP.FORCE_LIMITER);
        this.vel.add(force);
      }
      this.vel.mult(CONF.SHIP.DRAG);
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