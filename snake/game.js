
function Game() {
  var g = {
    score: 0,
    level: 0,
    levels: []
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
    
  g.blocks = [new Block()];
  
  g.over = function() {
    state = "END";
  }
  g.check = function() {
    var hit_block = false;
    for (var i = this.blocks.length-1; i >= 0; i--) {
      var p = this.blocks[i].pos;
      if (p.x == snake.pos.x && p.y == snake.pos.y) {
        hit_block = this.blocks[i];
        this.blocks.splice(i, 1);
        break;
      }
    }
    if (hit_block) {
      this.score += hit_block.reward * snake.tail.length * CONF.SNAKE.SPEED;
      snake.grow += Math.floor(this.level / 3);
    }
    if (this.blocks.length === 0) {
      this.next_level();
      this.blocks = [new Block(level)];
    }

    for (var i = 0; i < snake.tail.length; i++) {
      var p = snake.tail[i];
      if (p.x == snake.pos.x && p.y == snake.pos.y) {
        this.over();
        return; // no need to continue, game over
      }

    }
  }

  return g;
}