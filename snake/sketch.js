var snake, game = {score: 0},
    hiscore = 0, deltaTime = 0, lastFrame = 0,
    state = "START",
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 540,
      SNAKE: { SIZE: 25, SPEED: 12 },
      PLAY: { X: 110, Y: 30, SIZE: 500}
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

  if (state == "PLAY") {
    game.check();
    snake.update();
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

function reset() {
  hiscore = hiscore > game.score ? hiscore : game.score;
  snake = new Snake();
  level = 0
  game = new Game();
  game.next_level();
}

function keyPressed() {
  if (state == "PLAY" || state == "READY") {
    state = "PLAY";
    if (keyCode === UP_ARROW) {
      snake.move.up();
    } else if (keyCode === DOWN_ARROW) {
      snake.move.down();
    } else if (keyCode === LEFT_ARROW) {
      snake.move.left();
    } else if (keyCode === RIGHT_ARROW) {
      snake.move.right();
    }
  }

  if (key == ' ' && state == "START" && game.levels) {
    state = "READY";
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

  if (key == '1') {
    CONF.SNAKE.SPEED = 7;
    game.start();
  } else if (key == '2') {
    CONF.SNAKE.SPEED = 12;
    game.start();
  } else if (key == '3') {
    CONF.SNAKE.SPEED = 20;
    game.start();
  }

  if (keyCode === ENTER && state == "END") {
    reset();
    state = "READY";
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

function pos2cord(pos) {
  return {
    x: CONF.PLAY.X + (pos.x * CONF.SNAKE.SIZE),
    y: CONF.PLAY.Y + (pos.y * CONF.SNAKE.SIZE)
  }
}
