function Movement() {
  return {
    pos: createVector(0, 0),
    vel: createVector(0, 0),
    acc: createVector(0, 0),
    applyForce: function(f) {
      this.acc.add(f);
    },
    ground: function() {
      var chosen = null, distance = 0;
      for (var i = 0; i < platforms.length; i++) {
        var px = platforms[i].pos.x, py = platforms[i].pos.y,
            width = platforms[i].width, height = platforms[i].height,
            x = this.pos.x, y = this.pos.y,
            iter_distance = py - y;
        if (x < px || x > px + width) {
          // not the platform, too far away
          continue;
        }
        if (y > py + height) {
          // not the platform we are too far below
          continue;
        }
        if (chosen == null && iter_distance >= 0) {
          chosen = platforms[i];
          distance = iter_distance;
          continue;
        }
        if (iter_distance >= 0 && iter_distance < distance) { // absolute?
          chosen = platforms[i];
          distance = iter_distance;
        }
      }
      return chosen ? chosen.pos.y : CONF.HEIGHT;
    },
    move: function() {
      var ground = this.ground();
      // reduce the added velocity over time

      // add gravity to acc
      if (this.pos.y <= ground) {
        this.acc.add(createVector(0, CONF.GRAVITY));
      }

      this.vel.add(this.acc);

      var move = this.vel.copy();
      // Devide the force over a second
      move.mult(deltaTime);
      if (move.y + this.pos.y >= ground && this.pos.y <= ground) {
        move.y = 0;
        this.pos.y = ground;
        this.vel.y = 0;
      }
      this.pos.add(move);
      // if (this.pos.y > ground) {
      //   this.pos.y = ground;
      //   this.vel.y = 0;
      // }

      this.acc.mult(0);
    }
  }
}