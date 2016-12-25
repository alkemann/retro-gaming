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
        var pground = platforms[i].ground(this.pos),
            iter_distance = pground - this.pos.y;
        if (pground === false) continue;
        if (chosen == null && iter_distance >= 0) {
          cground = pground;
          chosen = platforms[i];
          distance = iter_distance;
          continue;
        }
        if (iter_distance >= 0 && iter_distance < distance) { // absolute?
          cground = pground;
          chosen = platforms[i];
          distance = iter_distance;
        }
      }
      return chosen ? cground : CONF.HEIGHT;
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