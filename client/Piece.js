Meteor.startup(function(){
  // Hexagon.prototype.type = this.type = type || ""

  Hexagon.generateNeighbors = function(x,y) {
    var neighbors = []
    var xPositions = [];
    var yPositions = [];
    xPositions.push( x - (Hexagon.Static.WIDTH/2) )
    xPositions.push( x + (Hexagon.Static.WIDTH/2) )
    xPositions.push( x + (Hexagon.Static.WIDTH) )
    xPositions.push( x + (Hexagon.Static.WIDTH/2) )
    xPositions.push( x - (Hexagon.Static.WIDTH/2) )
    xPositions.push( x - (Hexagon.Static.WIDTH) )

    yPositions.push( y - (Hexagon.Static.HEIGHT * (3/4)) )
    yPositions.push( y - (Hexagon.Static.HEIGHT * (3/4)) )
    yPositions.push( y )
    yPositions.push( y + (Hexagon.Static.HEIGHT * (3/4)) )
    yPositions.push( y + (Hexagon.Static.HEIGHT * (3/4)) )
    yPositions.push( y )



    for (i=0; i<8; i++){
      neighbors.push(new Hexagon(i.toString(),xPositions[i],yPositions[i],'ghost'))
    }
    return neighbors
  }

  Hexagon.prototype.neighbors = []
})