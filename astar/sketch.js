var state = "PLAY",
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 640,
      // BLOCK: 35, ROWS: 12, COLS: 12,
      BLOCK: 28, ROWS: 20, COLS: 20,
      WALL_ODDS: 0.25,
      DIAG: true, HEURISTIC: "MANHATTEN", WEIGHT: 1
    },
    pathfinder = null,

    wSlider, diagChecker, heurRadio, wSpan

;

function reset() {
  pathfinder = new PathFinder();
  state = "PLAY";
}


function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(15);
  lastFrame = millis();

  ui();

  window.seed = 99733; //Math.floor(random(0, 100000));
  reset();
}

function ui() {
  var x = 20, y = CONF.HEIGHT + 20; // offsets

  // 
  // wSlider.position(x, y);

  heurRadio = createRadio();
  heurRadio.option("MANHATTEN");
  heurRadio.option("DISTANCE");
  heurRadio.value(CONF.HEURISTIC);
  heurRadio.changed(function() {
    CONF.HEURISTIC = this.value();
    window.seed = pathfinder.previousSeed;
    reset();
  });
  // heurRadio.style('width', '120px');

  diagChecker = createCheckbox('DIAGONAL ALLOWED', CONF.DIAG);
  diagChecker.changed(function() { 
    CONF.DIAG = this.checked(); 
    window.seed = pathfinder.previousSeed;
    reset();
  });

  wSlider = createSlider(0, 300, CONF.WEIGHT * 100);
  wSlider.changed(function() {
    CONF.WEIGHT = this.value() / 100;
    wSpan.html("Weight: " + CONF.WEIGHT);
    window.seed = pathfinder.previousSeed;
    reset();
  });
  wSpan = createSpan("Weight: " + CONF.WEIGHT);

  createP("Considered").style("color: red");
  createP("Candidates").style("color: blue");
  createP("Goal").style("color: green");
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
