var state = "PLAY",
    player,
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 540, GROUND: 520,
      DRAG: 0.985, GRAVITY: 9.8,
      PLAYER: {
        WIDTH: 10, HEIGHT: 30,
        JUMP: 250, // Jump power, pixels over 1 second
      }
    }
;


function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  lastFrame = millis();
  player = new Player();
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(50);
  fill(0);
  noStroke();
  textFont("Arial");

  if (state == "PLAY") {
    player.update();
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
      player.up();
    // } else if (keyCode === DOWN_ARROW) {
    //   player.down();
    } else if (keyCode === LEFT_ARROW) {
      player.startLeft();
    } else if (keyCode === RIGHT_ARROW) {
      player.startRight();
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

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    player.stopLeft();
  }
  if (keyCode === RIGHT_ARROW) {
    player.stopRight();
  }
  return false;
}
