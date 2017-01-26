var
    Views = {
      play: function() {
        push();
        textSize(20);
        noStroke();
        fill(230);
        // text("SCORE: " + score, 20, 20);
        // textAlign(RIGHT);
        // text("HI-SCORE: " + hiscore, width - 20, 20);
        pop();
        this.music();
        for (var x = 0; x < pathfinder.map.length; x++) {
            for (var y = 0; y < pathfinder.map[x].length; y++) {
                var node = pathfinder.map[x][y];
                if (node.wall == false)
                    node.render();
            }
        }
        for (var i = 0; i < pathfinder.closedSet.length; i++) {
            pathfinder.closedSet[i].render(color(CONF.COL.VISITED));
        }
        for (var i = 0; i < pathfinder.openSet.length; i++) {
            pathfinder.openSet[i].render(color(CONF.COL.HIGH));
        }

        pathfinder.goal.render(CONF.COL.GOAL);

        var pnode = pathfinder.current;
        var b = CONF.BLOCK, a = b / 2;
        while (pnode.parent != null) {
            push();
            noFill()
            stroke(CONF.COL.GOAL);
            strokeWeight(4);
            translate(50, 50);
            line(pnode.x * b + a, pnode.y * b + a, pnode.parent.x * b + a, pnode.parent.y * b + a);
            pop();
            pnode = pnode.parent;
        }


        // for (var x = 0; x < pathfinder.map.length; x++) {
        //     for (var y = 0; y < pathfinder.map[x].length; y++) {
        //         pathfinder.map[x][y].renderCoords();
        //     }
        // }
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
        this.play();
        push();
        textSize(20);
        noStroke();
        fill(color(130, 130, 0));
        textAlign(CENTER);
        text("GAME PAUSED", width/2, (height/2)-50);
        textSize(20);
        text("PRESS <ESC> TO RESUME", width/2, (height/2)+10);
        pop();
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
