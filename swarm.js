if (Meteor.isClient) {

  Meteor.startup(function () {

    board = [];
    Canvas.resizeCanvas();

    var Swarm = {};

    (function() {
      // "Constants"
      var NW = 0;
      var NE = 1;
      var E = 2;
      var SE = 3;
      var SW = 4;
      var W = 5;
      var ABOVE = 6;
      var BELOW = 7;

      Swarm.sides = {
        NW: NW,
        NE: NE,
        E: E,
        SE: SE,
        SW: SW,
        W: W,
        ABOVE: ABOVE,
        BELOW: BELOW
      };

      Swarm.sideNames = [
        'NW',
        'NE',
        'E',
        'SE',
        'SW',
        'W',
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
                NW(0) /   \  NE(1)
                    /       \
                  /           \
            W(5) |             | E(2)
                 |             |
                  \           /
           SW(4)    \       / SE(3)
                      \   /

      */


      Hexagon.prototype.type = 'Piece';

      Hexagon.prototype.toString = function() { return this.name+' ('+this.type+')'; };

      Hexagon.prototype.resetNeighbors = function(side) {
        this.neighbors[0] = null; // 0 (NW)
        this.neighbors[1] = null; // 1 (NE)
        this.neighbors[2] = null; // 2 (E)
        this.neighbors[3] = null; // 3 (SE)
        this.neighbors[4] = null; // 4 (SW)
        this.neighbors[5] = null; // 5 (W)
        this.neighbors[6] = null; // 6 (Above)
        this.neighbors[7] = null; // 7 (Below)
      };

      Hexagon.prototype.connectToNeighbor = function(neighbor, side) {
        // Reset our neighbors
        // this.resetNeighbors();

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
      Hexagon.prototype.copyNeighbors = function(neighbor, side) {
        debugger
        // Don't connect to nothing
        if (!neighbor && side != null)
          return;

        // Don't connect to ourself, don't connect if already connected
        if (neighbor === this || this.neighbors[side] === neighbor)
          return;

        // Add the neighbor on ourself
        this.neighbors[side] = neighbor;

        // Add ourself on the neighbor
        neighbor.neighbors[compliment(side)] = this;

        if (side === NW) {
          this.copyNeighbors(neighbor.neighbors[SW], E);
          this.copyNeighbors(neighbor.neighbors[E], NE);
        }
        else if (side === NE) {
          this.copyNeighbors(neighbor.neighbors[W], NE);
          this.copyNeighbors(neighbor.neighbors[SE], E);
        }
        else if (side === E) {
          this.copyNeighbors(neighbor.neighbors[NW], NE);
          this.copyNeighbors(neighbor.neighbors[SW], SE);
        }
        else if (side === SE) {
          this.copyNeighbors(neighbor.neighbors[NE], E);
          this.copyNeighbors(neighbor.neighbors[E], SW);
        }
        else if (side === SW) {
          this.copyNeighbors(neighbor.neighbors[E], SE);
          this.copyNeighbors(neighbor.neighbors[NW], W);
        }
        else if (side === W) {
          this.copyNeighbors(neighbor.neighbors[NE], NW);
          this.copyNeighbors(neighbor.neighbors[SE], SW);
        }
      };

      /*
        Ant
        Can move around other pieces
      */
      Swarm.Ant = function() {
        // Call parent constructor
        Hexagon.apply(this, arguments);
      };

      // Inherit from Piece
      Swarm.Ant.prototype = Object.create(Hexagon.prototype);

      Swarm.Ant.prototype.type = 'Ant';

      Swarm.Ant.prototype.canMove = function(direction) {
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



  })
};
