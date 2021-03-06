var ship, bg, asteroids = [], 
    score = 0, hiscore = 0, level = 0,
    state = "START", turbo = true,
    song, music = true,
    deltaTime = 0, lastFrame = 0,
    CONF = {
      WIDTH: 720, HEIGHT: 540,
      MISSILE: {
        SPEED: 25,
        RANGE: 300,
        SIZE: 5,
      },
      SHIP: {
        ROT_POWER: 0.085,
        THRUST_POWER: 0.75,
        DRAG: 0.99,
        FORCE_LIMITER: 0.35,
        MAX_WARP: 5,
        SIZE: 23,
        RELOAD_SPEED: 5
      }
    };

function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  song = loadSound("spacemix.mp3", function() { 
    song.setVolume(0.1);
    if (music) {
      song.loop();
    }
  });
  bg = new Background(200);
  reset();
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(0);
  fill(0);
  stroke(255);
  textFont("Arial");

  if (state == "PLAY") {
    check_collisions();
    if (asteroids.length === 0) {
      next_level();
    }
    Views.play();
  } else if (state == "START") {
    Views.start();
  } else if (state == "PAUSE") {
    Views.pause();
  } else if (state == "END") {
    Views.game_over();
  } else {
    console.error("UNKNOWN STATE: " + state);
  }
}

function reset() {
  hiscore = hiscore > score ? hiscore : score;
  score = 0;
  ship = new Ship();
  level = 0
  next_level();
}

function next_level() {
  asteroids = [];
  var level_count = Math.floor(width * height / 120000);

  for (var i = 0; i < level_count ; i++) {
    asteroids[i] = new Asteroid();
  }
  level += 1;
}

function check_collisions() {
  var ship_hit = false;
  for (var i = asteroids.length - 1; i >= 0 ; i--) {
    var hit = false,
        as = asteroids[i];

    if (typeof(as) == 'undefined') break;

    if (as.collideCheck(ship)) {
      state = "END";
    }

    for (var j = 0; j < ship.missiles.length; j++) {
      hit = as.collideCheck(ship.missiles[j]);
      if (hit) {
        ship.missiles.splice(j, 1);
        break;
      }
    }

    if (hit) {
      var new_asteroids = as.hit(),
          score_value = Math.ceil(40 - as.r);

      score += score_value;

      if (new_asteroids) {
        for (var t = 0; t < new_asteroids.length; t++) {
          asteroids.push(new_asteroids[t]);
        }
      }
      asteroids.splice(i, 1);
    }

  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    ship.engage();
  }
  if (key == ' ') {
    if (state == "START") {
      state = "PLAY";
    } if (state == "PLAY") {
      ship.shoot();
      ship.startShooting();
    }
  }
  if (keyCode === LEFT_ARROW) {
    ship.turnLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    ship.turnRight();
  }
  if (keyCode === ESCAPE && state == "PLAY") {
    if (music) song.pause();
    state = "PAUSE";
  } else if (keyCode === ESCAPE && state == "PAUSE") {
    if (music) song.loop();
    state = "PLAY";
  }
  if (keyCode === ENTER && state == "END") {
    reset();
    state = "PLAY";
  }
  if (key == 'M') {
    music = !music;
    if (music) song.loop();
    else song.stop();
  }
  if (key == 'T') {
    turbo = !turbo;
    if (turbo) {
      CONF.MISSILE.SPEED = 25;
      CONF.SHIP.MAX_WARP = 5;
    } else {
      CONF.MISSILE.SPEED = 15;
      CONF.SHIP.MAX_WARP = 2;
    }
  }
  return false;
}

function keyReleased() {
  if (key == ' ') {
    ship.stopShooting();
  }
  if (keyCode === UP_ARROW) {
    ship.halt();
  }
  if (keyCode === LEFT_ARROW) {
    ship.stopTurningLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    ship.stopTurningRight();
  }
  return false;
}
