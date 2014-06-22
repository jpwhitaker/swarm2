var Hive = {};

(function() {
  // "Constants"
  var W = 0;
  var SW = 1;
  var SE = 2;
  var E = 3;
  var NE = 4;
  var NW = 5;
  var ABOVE = 6;
  var BELOW = 7;

  Hive.sides = {
    W  : W,
    SW : SW,
    SE : SE,
    E  : E,
    NE : NE,
    NW : NW,
    ABOVE: ABOVE,
    BELOW: BELOW
  };

  Hive.sideNames = [
    'N',
    'NE',
    'SE',
    'S',
    'SW',
    'NW',
    'ABOVE',
    'BELOW'
  ];

  /*
    0 <-> 3
    1 <-> 4
    2 <-> 5
  */
  var compliment = function(side) {
    // Piece on top of another piece
    if (side == ABOVE)
      return BELOW;
    
    // Piece under another piece
    if (side == BELOW)
      return ABOVE;
  
    // Wrap around if side causes us to go over 5
    if (side >= 3)
      return side - 3;
  
    // Move around by 3
    return side + 3;
  };
  

  /*
                 0 (N)
             ___________
            /           \
    5 (NW) /             \ 1 (NE)
          /    6 (above)  \
          \    7 (below)  /
    4 (SW) \             / 2 (SE)
            \___________/
                      
                 3 (S)
  */
  Hive.Piece = function(options) {
    this.neighbors = [];
    this.resetNeighbors();
    
    // Copy supplied neighbors
    if (options.neighbors)
      this.neighbors = options.neighbors.slice(0);
    
    if (options.name)
      this.name = options.name;
  };

  Hive.Piece.prototype.type = 'Piece';
  
  Hive.Piece.prototype.toString = function() { return this.name+' ('+this.type+')'; };

  Hive.Piece.prototype.resetNeighbors = function(side) {
    this.neighbors[0] = null; // 0 (N)
    this.neighbors[1] = null; // 1 (NE)
    this.neighbors[2] = null; // 2 (SE)
    this.neighbors[3] = null; // 3 (S)
    this.neighbors[4] = null; // 4 (SW)
    this.neighbors[5] = null; // 5 (NW)
    this.neighbors[6] = null; // 6 (Above)
    this.neighbors[7] = null; // 7 (Below)
  };

  Hive.Piece.prototype.connectToNeighbor = function(neighbor, side) {
    // Reset our neighbors
    this.resetNeighbors();
  
    // Special cases
    if (side === BELOW) {
      // Add the neighbor on ourself
      this.neighbors[side] = neighbor;
    
      // Add ourself on the neighbor
      neighbor.neighbors[compliment(side)] = this;
    
      return;
    }
    
    if (side === ABOVE) {
      // Can only move on top
      throw new Error("A piece can't move under another piece!");
    }
    
    // Find neighbors given our location
    this.copyNeighbors(neighbor, side);
  };
  
  // I don't know if this works!
  Hive.Piece.prototype.copyNeighbors = function(neighbor, side) {
    // Don't connect to nothing
    if (!neighbor)
      return;
    
    // Don't connect to ourself, don't connect if already connected
    if (neighbor === this || this.neighbors[side] === neighbor)
      return;
    
    // Add the neighbor on ourself
    this.neighbors[side] = neighbor;
    
    // Add ourself on the neighbor
    neighbor.neighbors[compliment(side)] = this;
    
    if (side === N) {
      this.copyNeighbors(neighbor.neighbors[SW], NW);
      this.copyNeighbors(neighbor.neighbors[SE], NE);
    }
    else if (side === S) {
      this.copyNeighbors(neighbor.neighbors[NW], SW);
      this.copyNeighbors(neighbor.neighbors[NE], SE);
    }
    else if (side === NE) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[S], SE);
    }
    else if (side === SE) {
      this.copyNeighbors(neighbor.neighbors[SW], S);
      this.copyNeighbors(neighbor.neighbors[N], NE);
    }
    else if (side === NW) {
      this.copyNeighbors(neighbor.neighbors[NE], N);
      this.copyNeighbors(neighbor.neighbors[S], SW);
    }
    else if (side === SW) {
      this.copyNeighbors(neighbor.neighbors[NW], N);
      this.copyNeighbors(neighbor.neighbors[SW], S);
    }
  };
  
  /*
    Ant
    Can move around other pieces
  */
  Hive.Ant = function() {
    // Call parent constructor
    Hive.Piece.apply(this, arguments);
  };

  // Inherit from Piece
  Hive.Ant.prototype = Object.create(Hive.Piece.prototype);
  
  Hive.Ant.prototype.type = 'Ant';

  Hive.Ant.prototype.canMove = function(direction) {
    // An ant can't move onto another piece
    if (this.neighbors[direction])
      return false;
  
    // Get the left and right directions
    var left = direction === 0 ? 5 : direction - 1;
    var right = direction === 5 ? 0 : direction + 1;

    // If the left and right are both occupied, we can't move
    if (this.neighbors[left] && this.neighbors.right)
      return false;
  
    // Otherwise, we're clear
    return true;
  };
  
}());

