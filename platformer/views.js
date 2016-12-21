var
    COLORS = {
        RED: [250, 40, 40],
        HEAD: [100, 250, 100],
        TAIL: [50, 180, 50]
    },
    Views = {
      play: function() {
        player.render();
        push();
        textSize(20);
        noStroke();
        fill(230);
        text("JUMP POWER", 20, 20);
        textAlign(RIGHT);
        text("GRAVITY", width - 20, 20);
        noFill();
        stroke(230, 230, 230, 100);
        line(0, CONF.GROUND, CONF.WIDTH, CONF.GROUND);
        pop();
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].render();
        }
        this.music();
      },

      start: function() {
        push();
        noStroke();
        fill(230);
        textAlign(CENTER);
        textSize(50);
        text("<INSERT GAME NAME>", width/2, height/4);
        textSize(32);
        text("PRESS <SPACE> TO START", width/2, (height/2)+32);
        textSize(20);
        text("CONTROLL <SOMETHING WITH <UP>,<DOWN>,<LEFT>,<RIGHT>\nPAUSE WITH <ESC>", width/2,(height/6)*5);
        pop();
        this.music();
      },

      pause: function() {
        player.render();
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
