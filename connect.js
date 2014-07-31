var Piece, genNeighbors;

var NW = 0;
var NE = 1;
var E = 2;
var SE = 3;
var SW = 4;
var W = 5;
var ABOVE = 6;
var BELOW = 7;

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


var Piece = function(id, type){
  this.id = id;
  this.type = type;

  this.neighbors = []

  //TODO rename this connectGhost or some shit
  this.connect = function(piece, side){
    this.neighbors[side] = piece
    piece.neighbors[compliment(side)] = this
  }

  //TODO when adding a new piece, make neighbors
  //make a new moveToSpot method that lets a 'piece' type
  //move on to a ghost and take over its neighbors.
  //it should then makeOwnNeighbors for the empty spots


  //TODO make this more generic to work on all empty spots, not just first piece
  this.makeOwnNeighbors = function(){
    if (this.type == 'piece') {
      var neighbors = [];
      for (i=0;i<6;i++) {
        ghost = new Piece(i,'ghost');
        //connect ghost to main piece
        this.connect(ghost, i)
        //connect ghosts to previous ghost
        //maybe make this and the next if into connect previous and connect first?
        if (i>0){
          //all except first piece should get the last piece
          ghost.connect(this.neighbors[i-1],compliment(i)+1)
        };
        if (i === 5){
          //if last piece connect first piece
          ghost.connect(this.neighbors[0],1)
        };
      }
    }
  }

  this.makeOwnNeighbors();


}