Hexagon.type = ""

Hexagon.generateNeighbors = function() {
  var neighbors = []
  for (i=0; i<8; i++){
    neighbors.push(new Hexagon)
  }
  return neighbors
}

Hexagon.prototype.neighbors = Hexagon.generateNeighbors()