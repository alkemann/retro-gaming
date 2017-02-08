var 
    COLORS = {
        RED: [250, 40, 40],
        HEAD: [100, 250, 100],
        TAIL: [50, 180, 50]
    },
    slot = new Slot(),
    Views = {
      play: function() {
        for (var x = 0; x < tiles.length; x++) {
            for (var y = 0; y < tiles[x].length; y++) {
                slot.render_tile(tiles[x][y]);
            }
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
