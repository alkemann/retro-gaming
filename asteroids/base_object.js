var base_object = {
  
  edge: function() {
    var r = this.r, x = this.pos.x, y = this.pos.y, dx = x, dy = y;
    if (x > width) {
      this.pos.x = 0;
    } else if (x < 0) {
      this.pos.x = width;
    }
    if (y > height) {
      this.pos.y = 0;
    } else if (y < 0) {
      this.pos.y = height;
    }
  },

  double: function() {
    var r = this.r, x = this.pos.x, y = this.pos.y, dx = x, dy = y;
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
    if (dx != x && dy != y) {
      this.draw(dx, y);
      this.draw(x, dy);
    }
    if (dx != x || dy != y) {
      this.draw(dx, dy);
    }
  }
}
