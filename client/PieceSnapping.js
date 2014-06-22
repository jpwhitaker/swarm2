// TODO: refactor the dick out of this!!!
Canvas.getClosestPiece = function(){
  var current = {};
  current.x = selection.MidPoint.X;
  current.y = selection.MidPoint.Y;
  smallestDistance = null;
  closestHex = null;

  board.forEach(function(hexagon){
    if(hexagon !== selection){
      testPiece = {};
      testPiece.x = hexagon.MidPoint.X;
      testPiece.y = hexagon.MidPoint.Y;
      if((Canvas.lineDistance(current, testPiece) < smallestDistance) || smallestDistance === null){
        smallestDistance = Canvas.lineDistance(current, testPiece)
        closestHex = hexagon
        board.forEach(function(hexagon){
          hexagon.lineColor = 'grey'
        })
        hexagon.lineColor = 'red';
      }
    }
  })
  // console.log(smallestDistance)
  return [selection, closestHex]
}

 Canvas.lineDistance = function( point1, point2 ){
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}

Canvas.hexagonAngle = function() {
  twoHexes = Canvas.getClosestPiece()
  midx1 = twoHexes[0].MidPoint.X
  midx2 = twoHexes[1].MidPoint.X

  midy1 = twoHexes[0].MidPoint.Y
  midy2 = twoHexes[1].MidPoint.Y


  //side = 50
  var TWOPI = Math.PI * 2;
  var value = Math.PI - (Math.atan2(midy2-midy1, midx2-midx1))

    value += Math.PI/6;
    value %= TWOPI;
    //console.log(value)
  return (Math.floor((value/TWOPI)*6));


  // Calculate Math.floor(value*6/(2*pi)) --> you get a number between 0..5 denoting the edge pairing.



}
  var reference = 0

Canvas.lineBetweenClosest = function(hexagonsArray){
  var latest = Canvas.hexagonAngle()
  // console.log(hexagonsArray[0].MidPoint.X)
  // console.log(hexagonsArray[1].MidPoint.X)
  // console.log(Canvas.hexagonAngle())
  if (reference != latest){
    reference = latest
    // console.log(latest)

  }
  // console.log(Canvas.hexagonAngle())
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(hexagonsArray[0].MidPoint.X, hexagonsArray[0].MidPoint.Y);
    ctx.lineTo(hexagonsArray[1].MidPoint.X, hexagonsArray[1].MidPoint.Y);
    ctx.closePath();
    ctx.stroke();
}


Canvas.checkSnap = function() {
  //refactor note, im running this twice ¯\_(ツ)_/¯
  pieces = Canvas.getClosestPiece() //returns selection and closest piece
  point1 = {x: pieces[0].MidPoint.X, y:  pieces[0].MidPoint.Y}
  point2 = {x: pieces[1].MidPoint.X, y:  pieces[1].MidPoint.Y}
  var distance = Canvas.lineDistance(point1, point2)
  if(distance <= 92){
    console.log('snap')
    joinSide = Canvas.hexagonAngle()
    Canvas.addNeighbor(pieces, joinSide)
    //v1 selection and draggin should be set to off
    //and selected piece moved to right spot
    //v2 slected piece should be moved to right spot but be
    //able to be moved if outside of snapping tolerance.
  }
}


Canvas.addNeighbor = function(pieces, joinSide){
  console.log(joinSide)
}