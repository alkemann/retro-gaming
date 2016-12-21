function Level(walls, fruits, starting) {
  return {
    start: starting,
    fruits: fruits,
    fruit_left: fruits.length,
    walls: walls,
    reset: function() {
      this.fruit_left = this.fruits.length;
      for (var i = 0; i < this.fruits.length; i++) {
        this.fruits[i].reset();
      }
    },
    render: function() {
      for (var i = 0; i < this.walls.length; i++) {
        this.walls[i].render()
      }
      for (var i = 0; i < this.fruits.length; i++) {
        if (this.fruits[i].eaten) continue
        this.fruits[i].render();
        break; // only render first uneaten fruit
      }
    }
  }
}

function Wall(x, y, width, height) {
  return {
    x: x,
    y: y,
    cord: pos2cord({x: x, y: y}),
    width: width,
    height: height,
    check: function() {
      if ((snake.pos.x >= this.x && snake.pos.x <= this.x + this.width)
          &&
          (snake.pos.y >= this.y && snake.pos.y <= this.y + this.height)) {
        console.log("Crashed with WALL!");
        console.info(this);
        return true;
      }
    },
    render: function() {
      Views.wall(this.cord, this.width, this.height);
    }
  }
}
