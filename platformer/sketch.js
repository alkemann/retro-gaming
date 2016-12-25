var state = "PLAY",
    player, platforms = [],
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 540,
      GRAVITY: 25,
      PLAYER: {
        WIDTH: 26, HEIGHT: 40,
        SPEED: 6,
        JUMP: 450, // Jump power, pixels over 1 second
        DOUBLE_JUMP: true,
      }
    },
    bgimage,
    jumpSlider, gavitySlider
;


function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  lastFrame = millis();
  player = new Player();
  bgimage = loadImage('donkey.png');

  jumpSlider = createSlider(100, 900, CONF.PLAYER.JUMP);
  jumpSlider.position(20, 40);
  gravitySlider = createSlider(0, 100, CONF.GRAVITY);
  gravitySlider.position(600, 40);

  platforms = [
    // new Platform(0, 520, 550, 5),
    // new Platform(600, 480, 119, 40),
    // new Platform(200, 400, 50, 5),
    // new Platform(400, 400, 50, 5),
    new ShapedPlatform([
      [20, 520], [360, 520], [700, 510],
      [700, 490], [360, 500], [20, 500]
    ]),
    new ShapedPlatform([
      [45, 432], [632, 452],
      [632, 432], [45, 412]
    ]),
  ];

}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(bgimage);
  fill(0);
  noStroke();
  textFont("Arial");

  CONF.PLAYER.JUMP = jumpSlider.value();
  CONF.GRAVITY = gravitySlider.value();

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
