var
    COLORS = {
        RED: [250, 40, 40],
        HEAD: [100, 250, 100],
        TAIL: [50, 180, 50]
    },
    Views = {
  play: function() {
    rect(CONF.PLAY.X, CONF.PLAY.Y, CONF.PLAY.SIZE, CONF.PLAY.SIZE);
    snake.render();
    game.current_level.render();
    push();
    textSize(20);
    noStroke();
    fill(230);
    text("SCORE: " + game.score, 20, 20);
    textAlign(CENTER);
    text(game.level + 1, width/2, 20);
    textAlign(RIGHT);
    text("HI-SCORE: " + hiscore, width - 20, 20);
    pop();
    this.music();
  },

  start: function() {
    push();
    noStroke();
    fill(230);
    textAlign(CENTER);
    textSize(50);
    text("SNAKE", width/2, height/4);
    textSize(32);
    text("PRESS <SPACE> TO START", width/2, (height/2)+32);
    textSize(20);
    text("CONTROLL SNAKE WITH <UP>,<DOWN>,<LEFT>,<RIGHT>\nPAUSE WITH <ESC>", width/2,(height/6)*5);
    pop();
    this.music();
  },

  pause: function() {
    rect(CONF.PLAY.X, CONF.PLAY.Y, CONF.PLAY.SIZE, CONF.PLAY.SIZE);
    snake.render();
    game.current_level.render();
    push();
    textSize(40);
    stroke(50);
    fill(230);
    textAlign(CENTER);
    text("GAME PAUSED", width/2, (height/2)-50);
    textSize(20);
    text("PRESS <ESC> TO RESUME", width/2, (height/2)+10);
    pop();
    this.music();
  },

  game_over: function() {
    var score = game.score
    push();
    noStroke();
    fill(230);
    textAlign(CENTER);
    textSize(50);
    text("GAME OVER", width/2, height/4);
    textSize(32);
    if (score > hiscore) {
      text("NEW HI-SCORE!\nSCORE: " + score + "\nHIGH SCORE: " + hiscore, width/2,(height/2));
    } else {
      text("YOUR SCORE: " + score + "\nHIGH SCORE: " + hiscore, width/2,(height/2)+32);
    }
    textSize(18);
    text("PRESS <ENTER> TO RESTART", width/2, (height/6)*5);
    pop();
    this.music();
  },

  block: function(cord, color) {
    push();
    translate(cord.x, cord.y);
    noStroke();
    if (color) {
        fill(color[0], color[1], color[2]);
    } else {
        fill(220);
    }
    rect(0, 0, CONF.SNAKE.SIZE, CONF.SNAKE.SIZE);
    pop();
  },

  wall: function(cord, width, height, color) {
    push();
    noFill();
    noStroke();
    if (color) {
        fill(color[0], color[1], color[2]);
    } else {
        fill(220);
    }
    rect(cord.x, cord.y, CONF.SNAKE.SIZE * (width||1), CONF.SNAKE.SIZE * (height||1));
    pop();
  },

  music: function() {

    // push();
    // noStroke();
    // fill(180);
    // textSize(10);
    // textAlign(RIGHT);
    // text("<M>USIC: " + ((song.isPlaying()?"ON":"OFF")), width - 15, height-10);
    // pop();
  }
}
