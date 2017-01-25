function PathFinder(goal) {
  // goal = goal || createVector(CONF.COLS-1, CONF.ROWS-1);
  goal = createVector(17, 18);
  console.info("SEED: " + window.seed)
  this.previousSeed = window.seed;


  this.closedSet = [];
  this.cameFrom = {};
  // create graph
  this.map = [];
  for (var x = 0; x < CONF.COLS; x++) {
    this.map[x] = [];
    for (var y = 0; y < CONF.ROWS; y++) {
      this.map[x][y] = new Node(x, y, goal);
    }
  }
  this.goal = this.map[goal.x][goal.y];
  this.goal.wall = false;

  var start = this.map[0][0];
  start.wall = false;
  start.setG(0);
  this.openSet = [start];
  this.current = start;

  this.tick = function() {
    if (this.openSet.length == 0) {
      console.error("OpenSet is empty");
      state = "END";
      return;
    }

    var current = this.current = findLowestFscore(this.openSet);
    if (current === this.goal) {
      console.info("GOAL REACHED!");
      state = "END";
      return;
    }

    removeFromArr(this.openSet, current);
    this.closedSet.push(current);

    var neighbors = this.neighbors(current);
    for (var i = 0; i < neighbors.length; i++) {
      var neigh = neighbors[i];

      // Is neighbor already checked?
      if (this.closedSet.includes(neigh) === true) {
        continue;
      }

      var tentative_g = current.g + 1; // distance is 1

      if (this.openSet.includes(neigh) === false) {
        // Discovered node
        this.openSet.push(neigh);
      } else if (tentative_g >= neigh.g) {
        // not a better path
        continue;
      }

      // New best path
      neigh.parent = current;
      neigh.setG(tentative_g);
    }
  }

  // TODO move to Node class so it is only done once
  this.neighbors = function(node) {
    var neighs = [];
    if (node.x > 0) { // add n to left
      var n = this.map[node.x - 1][node.y];
      if (n.wall == false)
        neighs.push(n);
    }
    if (node.x < CONF.COLS-1) { // add n to right
      var n = this.map[node.x + 1][node.y];
      if (n.wall == false)
        neighs.push(n);
    }
    if (node.y > 0) { // add n above
      var n = this.map[node.x][node.y - 1];
      if (n.wall == false)
        neighs.push(n);
    }
    if (node.y < CONF.ROWS-1) { // add n below
      var n = this.map[node.x][node.y + 1];
      if (n.wall == false)
        neighs.push(n);
    }

    if (CONF.DIAG) {

      if (node.x > 0 && node.y > 0) { // add NW
        var n = this.map[node.x - 1][node.y - 1];
        if (n.wall == false)
          neighs.push(n);
      }
      if (node.x < CONF.COLS-1 && node.y > 0) { // add NE
        var n = this.map[node.x + 1][node.y - 1];
        if (n.wall == false)
          neighs.push(n);
      }
      if (node.x > 0 && node.y < CONF.ROWS-1) { // add SW
        var n = this.map[node.x] - 1[node.y - 1];
        if (n.wall == false)
          neighs.push(n);
      }
      if (node.x < CONF.COLS-1 && node.y < CONF.ROWS-1) { // add SE
        var n = this.map[node.x + 1][node.y + 1];
        if (n.wall == false)
          neighs.push(n);
      }

    }

    return neighs;
  }

  function removeFromArr(a, v) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] == v) {
        a.splice(i, 1);
        return;
      }
    }
  }

  function findLowestFscore(set) {
    var indexOfLowest = 0;
    for (var i = 0; i < set.length; i++) {
      if (set[i].f < set[indexOfLowest].f) {
        indexOfLowest = i;
      }
    }
    return set[indexOfLowest];
  }


}