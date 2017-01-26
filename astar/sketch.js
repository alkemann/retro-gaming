var state = "PLAY",
    score = 0, hiscore = 0,
    DIR = { UP: "UP", DOWN: "DOWN", LEFT: "LEFT", RIGHT: "RIGHT"},
    CONF = {
      WIDTH: 720, HEIGHT: 640,
      // BLOCK: 35, ROWS: 12, COLS: 12,
      BLOCK: 9, ROWS: 65, COLS: 65,
      WALL_ODDS: 0.35,
      DIAG: true, HEURISTIC: "DISTANCE", WEIGHT: 0.39,
      COL: {}
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
  frameRate(20);
  lastFrame = millis();

  // my life
  /*
  CONF.COL.NODE = color(100, 56, 29);
  CONF.COL.GOAL  = color(255, 110, 89);
  CONF.COL.HIGH = color(252, 209, 88);
  CONF.COL.MED  = color(172, 184, 183);
  */
  // my life
  CONF.COL.NODE = color(95, 133, 134);
  CONF.COL.GOAL  = color(232, 217, 201);
  CONF.COL.HIGH = color(249, 145, 140);
  CONF.COL.MED  = color(218, 143, 109);
  CONF.COL.VISITED = color(193, 79, 56);

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

  createP("Considered").style("color: rgb(193, 79, 56)");
  createP("Candidates").style("color: rgb(249, 145, 140)");
  createP("Goal").style("color: rgb(232, 217, 201)");
}

function draw() {
  deltaTime = (millis() - lastFrame) / 1000;
  lastFrame = millis();
  background(20);

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
