Meteor.startup(function () {
  canvas.addEventListener('dblclick', function(e){
        Canvas.addPieceToBoard(e)
        Canvas.drawAllPieces()
      })


Canvas.addPieceToBoard = function (e){
  board.push(new Hexagon (1, e.x, e.y, 'piece', Hexagon.generateNeighbors(e.x, e.y)))
}



  Canvas.selectHex = function(e){
    board.forEach(function(hexagon){
      if(hexagon.isInBounds(e.x,e.y) && dragging == false){
        dragging = true;
        hexagon.selected = true
        console.log('selected')
        selection = hexagon;
      }
    })
  }

  Canvas.deselectHex = function(e){
    board.forEach(function(hexagon){
      dragging = false;
      hexagon.selected = false;
      selection = null;
      Canvas.clear();
      Canvas.drawBoardPieces();
    })
  }


Canvas.updateHexagonPoints = function(e){
  console.log('moving')
  //Update all 6 Points
  selection.Points.forEach(function(point){
    point.X += e.webkitMovementX;
    point.Y += e.webkitMovementY;
  })
  //update all the other helper points
  selection.TopLeftPoint.X     += e.webkitMovementX;
  selection.TopLeftPoint.Y     += e.webkitMovementY;
  selection.BottomRightPoint.X += e.webkitMovementX;
  selection.BottomRightPoint.Y += e.webkitMovementY;
  selection.x                  += e.webkitMovementX;
  selection.y                  += e.webkitMovementX;
  selection.x1                 += e.webkitMovementX;
  selection.y1                 += e.webkitMovementY;
  selection.MidPoint.X         += e.webkitMovementX;
  selection.MidPoint.Y         += e.webkitMovementY;
}

  Canvas.dragHex = function(){
     selection = null;
     dragging = false;
    //prevent accidental selection of DOM elements
    canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

    canvas.addEventListener('mousedown', function(e){
      console.log('mousedown')
      Canvas.selectHex(e)
    })

    canvas.addEventListener('mousemove', function(e){
      if(selection != null){
        // Canvas.getClosestPiece()
        Canvas.updateHexagonPoints(e)
        Canvas.clear()
        Canvas.drawAllPieces()
        // Canvas.lineBetweenClosest(Canvas.getClosestPiece())
        // Canvas.checkSnap()
      }
    })
    canvas.addEventListener('mouseup', function(e){
      console.log('mouseup')
      Canvas.clear()
      Canvas.drawBoardPieces()
      Canvas.deselectHex(e)
    })
  }
})