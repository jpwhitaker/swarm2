  Meteor.startup(function () {
    canvas.addEventListener('dblclick', function(event){
          Canvas.addPieceToBoard()
        })
})

// Canvas.selectHex = function(e){
//   allPieces = player1.concat(player2)
//   allPieces.forEach(function(hexagon){
//     if(hexagon.isInBounds(e.x,e.y) && dragging == false){
//       dragging = true;
//       hexagon.selected = true
//       selection = hexagon;
//     } else if (hexagon.isInBounds(e.x,e.y) && dragging == true && selection == hexagon){
//       dragging = false;
//       hexagon.selected = false;
//       selection = null;
//       Canvas.clear();
//       Canvas.addPiecesToBoard();

//     }
//   })
// }


// Canvas.updateHexagonPoints = function(e){
//   //Update all 6 Points
//   selection.Points.forEach(function(point){
//     point.X += e.webkitMovementX;
//     point.Y += e.webkitMovementY;
//   })
//   //update all the other helper points
//   selection.TopLeftPoint.X     += e.webkitMovementX;
//   selection.TopLeftPoint.Y     += e.webkitMovementY;
//   selection.BottomRightPoint.X += e.webkitMovementX;
//   selection.BottomRightPoint.Y += e.webkitMovementY;
//   selection.x                  += e.webkitMovementX;
//   selection.y                  += e.webkitMovementX;
//   selection.x1                 += e.webkitMovementX;
//   selection.y1                 += e.webkitMovementY;
//   selection.MidPoint.X         += e.webkitMovementX;
//   selection.MidPoint.Y         += e.webkitMovementY;
// }

// Canvas.dragHex = function(){
//    selection = null;
//    dragging = false;
//   //prevent accidental selection of DOM elements
//   canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

//   canvas.addEventListener('mousedown', function(e){
//     Canvas.selectHex(e)
//   })

//   canvas.addEventListener('mousemove', function(e){
//     if(selection != null){
//       // Canvas.getClosestPiece()
//       Canvas.updateHexagonPoints(e)
//       Canvas.clear()
//       Canvas.addPiecesToBoard()
//       // Canvas.lineBetweenClosest(Canvas.getClosestPiece())
//       // Canvas.checkSnap()
//     }
//   })

// }
