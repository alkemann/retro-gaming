var Views = {
  play: function() {
    bg.render(ship);
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].update().render();
    }
    ship.update().render();
    push();
    textSize(20);
    noStroke();
    fill(230);
    text("SCORE: " + score, 20, 20);
    textAlign(CENTER);
    text(level + ":" + asteroids.length, width/2, 20);
    textAlign(RIGHT);
    text("HI-SCORE: " + hiscore, width - 20, 20);
    pop();
    this.music();
  },

  start: function() {
    bg.render();
    push();
    noStroke();
    fill(230);
    textAlign(CENTER);
    textSize(50);
    text("ASTEROIDS", width/2, height/4);
    textSize(32);
    text("PRESS <SPACE> TO START", width/2, (height/2)+32);
    textSize(20);
    text("CONTROLL SHIP WITH <UP>,<LEFT>,<RIGHT>\nAND SHOOT WITH <SPACE>\nPAUSE WITH <ESC>", width/2,(height/6)*5);
    pop();
    this.music();
  },

  pause: function() {
    bg.render(ship);
    for (var i = 0; i < asteroids.length; i++) {
      asteroids[i].render();
    }
    ship.render();
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
    bg.render();
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

  music: function() {
    push();
    noStroke();
    fill(180);
    textSize(10);
    textAlign(RIGHT);
    text("<M>USIC: " + ((song.isPlaying()?"ON":"OFF")), width - 15, height-10);
    pop();
  }
}
