var state = "PLAY",
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 480,
      // BLOCK: 35, ROWS: 12, COLS: 12,
      BLOCK: 20, ROWS: 20, COLS: 20,
      WALL_ODDS: 0.25
    },
    pathfinder = null;
;

function reset() {
  pathfinder = new PathFinder();
}


function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(15);
  lastFrame = millis();
  window.seed = 99733; //Math.floor(random(0, 100000));
  reset();
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(50);
  fill(0);
  noStroke();
  textFont("Arial");

  if (state == "PLAY") {
    pathfinder.tick();
    Views.play();
  } else if (state == "READY") {
    Views.play();
  } else if (state == "START") {
    Views.start();
  } else if (state == "PAUSE") {
    Views.pause();
  } else if (state == "END") {
    Views.play();
    noLoop();
  } else {
    console.error("UNKNOWN STATE: " + state);
  }
}

function keyPressed() {
  if (state == "PLAY" || state == "READY") {
    state = "PLAY";
    if (keyCode === UP_ARROW) {
    } else if (keyCode === DOWN_ARROW) {
      noLoop();
    } else if (keyCode === LEFT_ARROW) {
    } else if (keyCode === RIGHT_ARROW) {
    }
  }

  if (key == ' ' && state == "START") {
    state = "READY";
  } else if (key == ' ') { //  && state == "PLAY"
    state = "PLAY";
    reset();
    loop();
  }
  if (keyCode === ESCAPE && state == "PLAY") {
    // if (music) song.pause();
    state = "PAUSE";
  } else if (keyCode === ESCAPE && state == "PAUSE") {
    // if (music) song.loop();
    state = "PLAY";
  }

  if (keyCode === ENTER && state == "END") {
    state = "READY";
  }

  return false;
}
