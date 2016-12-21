
function Game() {
  var g = {
    score: 0,
    level: 0,
    levels: []
  }

  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.open("get", "levels/levels.json", true);
  oReq.send();

  function reqListener(e) {
      data = JSON.parse(this.responseText);
      for (var i = 0; i < data.layers.length; i++) {
        var walls = [], fruits = [], start = createVector(width/2, height/2);
        for (var j = 0; j < data.layers[i].objects.length; j++) {
          var od = data.layers[i].objects[j]; // object data
          if (od.type == "start") {
            start = createVector(od.x, od.y);
          } else if (od.type == "fruit") {
            fruits.push(new Fruit(1, createVector(od.x, od.y)));
          } else { // assume od.type == "wall"
            walls[j] = new Wall(od.x, od.y, od.width, od.height);
          }
        }
        g.levels[data.layers[i].name] = new Level(walls, fruits, start);
        snake.reset();
      }
  }
  g.start = function() {
    this.level = 0;
    this.score = 0;
    hiscore = hiscore > this.score ? hiscore : this.score;
    for (var i = 0; i < this.levels.length; i++) {
      this.levels[i].reset();
    }
    this.current_level = this.levels[this.level];
  }
  g.next_level = function() {
    console.log("NEXT LEVEL");
    this.level += 1;
    if (!this.levels[this.level]) {
      return this.over();
    }
    this.current_level = this.levels[this.level];
    snake.pos = this.current_level.start;
    snake.reset();
    state = "READY";
  }
  g.over = function() {
    state = "END";
  }
  g.check = function() {
    var hit_block = false,
        blocks = this.current_level.fruits;
    for (var i = 0; i < this.current_level.fruits.length; i++) {
      if (this.current_level.fruits[i].eaten) continue;
      var p = this.current_level.fruits[i].pos;
      if (p.x == snake.pos.x && p.y == snake.pos.y) {
        hit_block = this.current_level.fruits[i];
      }
      break;
    }
    if (hit_block) {
      hit_block.eaten = true;
      this.current_level.fruit_left -= 1;
      this.score += hit_block.reward * snake.tail.length * CONF.SNAKE.SPEED;
      snake.grow += Math.floor(this.level / 3);
      if (this.current_level.fruit_left == 0) {
        this.next_level();
      }
    }

    for (var i = 0; i < snake.tail.length; i++) {
      var p = snake.tail[i];
      if (p.x == snake.pos.x && p.y == snake.pos.y) {
        this.over();
        return; // no need to continue, game over
      }
    }
    for (var i = 0; i < this.current_level.walls.length; i++) {
      if (this.current_level.walls[i].check()) {
        state = 'READY';
        this.over();
        return; // game over
      }
    }
  }

  return g;
}
