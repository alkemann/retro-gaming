
function Star() {
	var x = random(-width, width),
		y = random(-height, height),
    z = random(width),
    pz = z;

  this.render = function(speed) {
    z -= speed || 3;
    if (z < 1) {
      z = width;
      pz = z;
    }
    sx = map(x / z, 0, 1, 0, width);
    sy = map(y / z, 0, 1, 0, height);

    stroke(150);
    px = map(x / pz, 0, 1, 0, width);
    py = map(y / pz, 0, 1, 0, height);
    line (px, py, sx, sy);

    pz = z;
  }
}

function Background(count) {
  var stars = [];
  for (var i = 0; i < count; i++) {
    stars[i] = new Star();
  }

  this.render = function(ship) {
    push();
    var speed = ship ? ship.vel.mag()*2 : 15,
        x = ship ? ship.pos.x : width/2,
        y = ship ? ship.pos.y : height/2;
    //     a = ship.vel.mag(),
    //     x = width/2 - ship.vel.x*a,
    //     y = height/2 - ship.vel.y*a;
    translate(x, y);
    for (var i = 0; i < stars.length; i++) {
      stars[i].render(speed);
    }
    pop();
  }
}