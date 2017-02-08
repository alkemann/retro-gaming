const CONF = {
        WIDTH: 800, HEIGHT: 800,
        WORLD: {
          WIDTH: 20, HEIGHT: 20,
        }
      }
;

let state = "PLAY", menu, menu2, tiles, inspector
;

function setup() {
  createCanvas(CONF.WIDTH, CONF.HEIGHT);
  frameRate(60);
  lastFrame = millis();

  inspector = createDiv().id("inspector");
  // menu = new Menu("Main Menu", createVector(50, 50), 400, 300);
  // menu.add(new Item('<div style="width: 100%; height: 150px; background: blue;margin-bottom: 1em;"> </div>'));
  // menu.add(new Button("Win", function() {console.log("WIN!");}));
  // menu2 = new Menu("Side Menu", createVector(550, 50), 400, 300);
  // menu2.add(new Image("tractor.jpg", function() {console.log("Du vil ha Traktor?!");}));
  // menu2.add(new Image("tractor.jpg", function() {console.log("Du vil ha Traktor?!");}));
  // menu2.add(new Button("Lose", function() {console.log("Lost!");}));
  // menu2.add(new Button("Tie", function() {console.log("Tied!");}));

  tiles = [];
  for (var x = 0; x < CONF.WORLD.WIDTH; x++) {
    tiles[x] = [];
    for (var y = 0; y < CONF.WORLD.HEIGHT; y++) {
      tiles[x][y] = new Tile(createVector(x, y));
    }
  }
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
    // menu.show();
    for (var x = 0; x < CONF.WORLD.WIDTH; x++) {
      for (var y = 0; y < CONF.WORLD.HEIGHT; y++) {
        tiles[x][y].tick();
      }
    }
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

function mouseClicked() {
  let x = Math.ceil(mouseX / CONF.WORLD.WIDTH / 2) - 1,
      y = Math.ceil(mouseY / CONF.WORLD.HEIGHT / 2) - 1,
      tile = tiles[x][y];
  inspector.html("["+x+","+y+"] TILE: " + tile.describe());

  if (tile.stage == STAGES.MATURE){
    console.log("WIN");
    tile.dirt();
    return;
  }

  if (tile.type == TILE_TYPES.PLOWED){
        tile.plant(Math.round(random(1,4)));

}
  if (tile.type == TILE_TYPES.DIRT){
      tile.plow();
  }

}

function keyPressed() {
  if (state == "PLAY" || state == "READY") {
    if (keyCode === UP_ARROW) {
      menu.show();
      menu2.show();
    } else if (keyCode === DOWN_ARROW) {
    } else if (keyCode === LEFT_ARROW) {
    } else if (keyCode === RIGHT_ARROW) {
    }
  }

  if (key == ' ' && state == "START") {
    state = "PLAY";
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
    state = "PLAY";
  }

  return false;
}
