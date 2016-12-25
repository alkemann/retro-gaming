var state = "PLAY",
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 540,
      PADDLE: {SPEED: 250, HEIGHT: 80, WIDTH: 10},
      BALL: {SPEED: 300, SIZE: 20}
    },
    ball, playerOne, playerTwo
;

function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  lastFrame = millis();
  angleMode(DEGREES);
  ball = new Ball();
  playerOne = new Paddle(10);
  playerTwo = new Paddle(width-10);
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();

  background(50);
  noStroke();
  fill(230);
  textFont("Arial");

  if (state == "PLAY") {
    playerOne.update();
    playerTwo.update();
    ball.update();
    var inGoal = ball.inGoal();
    if (inGoal != false) {
      if (inGoal == -1) {
        playerTwo.score += 1;
      } else {
        playerOne.score += 1;
      }
      delete ball;
      ball = new Ball();
    }

    if (hitOne = ball.hitPaddle(playerOne.rect())) {
      ball.reflectOnPaddle(1);
    } else if (hitTwo = ball.hitPaddle(playerTwo.rect())) {
      ball.reflectOnPaddle(-1);
    }

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
      delete ball;
      ball = new Ball();
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
