function Platform(x, y, w, h) {
  return {
    pos: createVector(x, y),
    width: w,
    height: h,
    render: function() {
      push();
      stroke(230);
      noFill();
      rect(this.pos.x, this.pos.y, this.width, this.height);
      pop();
    },
    ground: function(mover_pos) {
      var px =  this.pos.x, py = this.pos.y,
          x = mover_pos.x, y = mover_pos.y;
      if (x < px || x > px + this.width) {
        // not the platform, too far away
        return false;
      }
      if (y > py + this.height) {
        // not the platform we are too far below
        return false;
      }
      return this.pos.y;
    }
  }
}

function ShapedPlatform(verts) {
  var obj = {
      verts: verts
    },
    x_max = 0, x_min = CONF.WIDTH,
    y_max = 0, y_min = CONF.HEIGHT
  ;

  for (var i = verts.length - 1; i >= 0; i--) {
    if (verts[i][0] < x_min) x_min = verts[i][0];
    if (verts[i][0] > x_max) x_max = verts[i][0];
    if (verts[i][1] < y_min) y_min = verts[i][1];
    if (verts[i][1] > y_max) y_max = verts[i][1];
  }

  obj.bounds = {
    min: {x: x_min, y: y_min},
    max: {x: x_max, y: y_max}
  }

  obj.ground = function(mover_pos) {
    var x = mover_pos.x, y = mover_pos.y;

    if (x < this.bounds.min.x || x > this.bounds.max.x) {
      // not the platform, too far away
      return false;
    }

    if (y > this.bounds.max.y) {
      // not the platform we are too far below
      return false;
    }

    // math for highest y position at x
    // find intersect, which requires that x is between x1 and x2 and
    // less than highest y
    // start at the last since the first lines should be on the bottom
    // and the 'closing' line goes vertical back to start, ie does not
    // check last line
    for (var i = this.verts.length - 1; i >= 1; i--) {
      var j   = i - 1,
          v1x = this.verts[i][0],
          v1y = this.verts[i][1],
          v2x = this.verts[j][0],
          v2y = this.verts[j][1],
          hy  = v1y > v2y ? v1y : v2y,
          mx  = v1x < v2x ? v1x : v2x,
          hx  = v1x > v2x ? v1x : v2x;


      var col = collideLineLine(
            v1x, v1y, v2x, v2y, // platform
            mover_pos.x, mover_pos.y, mover_pos.x, CONF.HEIGHT, // mover
            true
          ),
          pground = col.y;
      if (pground === false) continue;
      return pground;

    }

    return this.bounds.min.y;
  };

  obj.render = function() {
      push();
      stroke(230);
      noFill();
      beginShape();
      for (var i = this.verts.length - 1; i >= 0; i--) {
        vertex(this.verts[i][0], this.verts[i][1]);
      }
      endShape(CLOSE);
      pop();
  };

  obj.__proto__ = new Platform(
    x_min,
    y_max,
    x_max - x_min,
    y_max - y_min
  );
  return obj;
}
