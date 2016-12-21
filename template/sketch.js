var state = "START",
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 540
    }
;



function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  lastFrame = millis();
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(50);
  fill(0);
  noStroke();
  textFont("Arial");

  if (state == "PLAY") {
    Views.play();
  } else if (state == "READY") {
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

function keyPressed() {
  if (state == "PLAY" || state == "READY") {
    state = "PLAY";
    if (keyCode === UP_ARROW) {
    } else if (keyCode === DOWN_ARROW) {
    } else if (keyCode === LEFT_ARROW) {
    } else if (keyCode === RIGHT_ARROW) {
    }
  }

  if (key == ' ' && state == "START") {
    state = "READY";
  } else if (key == ' ' && state == "PLAY") {
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
