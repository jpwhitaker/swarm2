Meteor.startup(function(){
  // Hexagon.prototype.type = this.type = type || ""

  Hexagon.select = function(){

  }

  Hexagon.prototype.generateNeighbors = function(x,y) {
    if (this.type == "piece"){
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


      //TODO change to 8, temporarily 6 because 7/8 had no xy values
      for (i=0; i<6; i++){
        ghost = (new Hexagon("Ghost "+i.toString(),xPositions[i],yPositions[i],'ghost'));
        this.connectToNeighbor(ghost,i)
      }
    }
  }
})