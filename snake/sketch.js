var snake,
    score = 0, hiscore = 0, level = 0,
    deltaTime = 0,
    lastFrame = 0,
    state = "PLAY",
    DIR = {
      UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"
    },
    CONF = {
      WIDTH: 720,
      HEIGHT: 540,
      SNAKE: {
        SIZE: 25,
        SPEED: 4
      },
      PLAY: {
        X: 110,
        Y: 30,
        SIZE: 500,
      }
    }
;
CONF.BOARD = {
  MAX: (CONF.PLAY.SIZE / CONF.SNAKE.SIZE)
};


function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  reset();
  lastFrame = millis();
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(50);
  fill(0);
  noStroke();
  textFont("Arial");
  rect(CONF.PLAY.X, CONF.PLAY.Y, CONF.PLAY.SIZE, CONF.PLAY.SIZE);

  if (state == "PLAY") {
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
  snake = new Snake();
  level = 0
  next_level();
}

function next_level() {
  level += 1;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.move.up();
  } else if (keyCode === DOWN_ARROW) {
    snake.move.down();
  } else if (keyCode === LEFT_ARROW) {
    snake.move.left();
  } else if (keyCode === RIGHT_ARROW) {
    snake.move.right();
  }

  if (key == ' ' && state == "START") {
    state = "PLAY";
  } else if (key == ' ' && state == "PLAY") {
    snake.grow += 1;
  }
  if (keyCode === ESCAPE && state == "PLAY") {
    // if (music) song.pause();
    state = "PAUSE";
  } else if (keyCode === ESCAPE && state == "PAUSE") {
    // if (music) song.loop();
    state = "PLAY";
  }
  if (keyCode === ENTER && state == "END") {
    reset();
    state = "PLAY";
  }
  /*
  if (key == 'M') {
    music = !music;
    if (music) song.loop();
    else song.stop();
  }
  */
  return false;
}
/*
function keyReleased() {
  if (keyCode === UP_ARROW) {
  }
  if (keyCode === LEFT_ARROW) {
  }
  if (keyCode === RIGHT_ARROW) {
  }
  return false;
}
*/