function Node(x, y, g) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;

  function r() {
    var x = Math.sin(window.seed++) * 10000;
    return x - Math.floor(x);
  }

  this.wall = r() < CONF.WALL_ODDS;
  // heuristic cost estimate
  this.h = dist(g.x, g.y, this.x, this.y) * 2.5; // Strong distance
  // this.h = dist(g.x, g.y, this.x, this.y) * 1; // Weak distance
  // this.h = abs(g.x-this.x) + abs(g.y-this.y) * 2; // Strong Manhatten
  // this.h = abs(g.x-this.x) + abs(g.y-this.y) / 2; // Weak Manhatten
  this.parent = null;

  this.setG = function(g) {
    this.g = g;
    this.f = g + this.h;
  }

  this.render = function(color) {
    push();
    translate(150, 50);
    color = color || 200;
    fill(color);
    stroke(100);
    var b = CONF.BLOCK;
    rect(this.x * b, this.y * b, b, b);
    pop();
  }
  this.renderCoords = function() {
    push();
    textSize(8);
    translate(150, 50);
    fill(50);
    noStroke();
    var b = CONF.BLOCK;
    text(this.x+","+this.y, (this.x * b) + 4, (this.y * b) + b-4);
    pop();
  }
}