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
  switch  (CONF.HEURISTIC) {
    case "MANHATTEN":
      this.h = abs(g.x-this.x) + abs(g.y-this.y) * CONF.WEIGHT;
      break;
    case "DISTANCE":
    default:
      this.h = dist(g.x, g.y, this.x, this.y) * CONF.WEIGHT;
      break;
  }
  // this.h = dist(g.x, g.y, this.x, this.y) * 2.5; // Strong distance
  // this.h = dist(g.x, g.y, this.x, this.y); // distance
  // 
  // this.h = abs(g.x-this.x) + abs(g.y-this.y); // Manhatten
  // this.h = abs(g.x-this.x) + abs(g.y-this.y) / 2; // Weak Manhatten
  this.parent = null;

  this.setG = function(g) {
    this.g = g;
    this.f = g + this.h;
  }

  this.render = function(color) {
    push();
    translate(50, 50);
    color = color || CONF.COL.NODE;
    fill(color);
    // stroke(100);
    noStroke();
    var b = CONF.BLOCK, w = b * 0.5;
    // rect(this.x * b, this.y * b, b, b);
    ellipse(this.x * b + b/2, this.y * b + b/2, w, w);
    pop();
  }
  this.renderCoords = function() {
    push();
    textSize(8);
    translate(50, 50);
    fill(50);
    noStroke();
    var b = CONF.BLOCK;
    text(this.x+","+this.y, (this.x * b) + 4, (this.y * b) + b-4);
    pop();
  }
}