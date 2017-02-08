const TILE_TYPES = {
    GRASS: 1,
    DIRT: 2,
    PLOWED: 3,
    FARM: 4,
    WATER: 5,
    ROCK: 6
  },
  PLANTS = {
    WHEAT: 1,
    WATERMELON: 2,
    RHYE: 3,
    CORN: 4
  },
  STAGES = {
    SOWN: 1,
    YOUNG: 2,
    ADULT: 3,
    MATURE: 4,
    OLD: 5,
    ROTTEN: 6
  }

const NAMES = {
  PLANTS: {
    1: "wheat",
    2: "melon",
    3: "rhye",
    4: "corn"
  },
  TILES: {
    1: 'grass',
    2: 'dirt',
    3: 'plowed',
    4: 'farm',
    5: 'water',
    6: 'rock'
  },
  STAGES: {
    1: 'sown',
    2: 'young',
    3: 'adult',
    4: 'mature',
    5: 'old',
    6: 'rotten'
  }
}


function Tile(pos)
{
	this.pos = pos; // Vector
  // this.type = TILE_TYPES.FARM;
  this.type = Math.round(random(1, 6));
  if (this.type == TILE_TYPES.FARM) {
    this.seed = Math.round(random(1, 4));
    this.growth_rate = 0.02;
  } else {
    this.growth_rate = 0;
  }
  this.age = 0.0;
  this.stage = 0;
  this.tick = function() {
      this.age += this.growth_rate;
      if (this.age > 2) {
        this.stage += 1;
        this.age = 0.0
      }

      if (this.stage == STAGES.ROTTEN) {
        this.reset();
      }
  }

  this.reset = function() {
    this.seed = null;
    this.stage = 0;
    this.growth_rate = 0;
    this.type = TILE_TYPES.DIRT;
  }

  this.describe = function() {
    return NAMES.TILES[this.type];
  }

  this.plow = function() {
    // Check for dirt?
    this.type = TILE_TYPES.PLOWED;
  }

  this.plant = function(seed) {
    if (this.type != TILE_TYPES.PLOWED) {
      return false;
    }

    this.seed = seed;
    this.stage = 0;
    this.growth_rate = 0.1; // DEFAULT FOR SEED TYPE

    return true;
  }
}