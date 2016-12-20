var Views = {
  play: function() {
    snake.render();
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].render();
    }
    push();
    textSize(20);
    noStroke();
    fill(230);
    text("SCORE: " + score, 20, 20);
    textAlign(CENTER);
    text(level, width/2, 20);
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
    snake.render();
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
        fill(240, 200, 200);
    } else {
        fill(220);
    }
    rect(0, 0, CONF.SNAKE.SIZE, CONF.SNAKE.SIZE);
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
