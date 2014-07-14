Meteor.startup(function () {

  selectedPiece = null;

  //Event Listeners
  canvas.addEventListener('dblclick', function(e){
        Canvas.addPieceToBoard(e)
        Canvas.drawAllPieces()
      })

  canvas.addEventListener('mousedown', function(e){
    var piece = Canvas.returnClickedPiece(e)
    Canvas.selectPiece(piece)
  })

  canvas.addEventListener('mousemove', function(e){
    if(selectedPiece != null){
      selectedPiece.updateNeighbors(e);
      selectedPiece.updatePositions(e.webkitMovementX,e.webkitMovementY);
      Canvas.drawAllPieces();
    }
  })

  canvas.addEventListener('mouseup', function(e){
    Canvas.deselectPiece();
    Canvas.clear();
    Canvas.drawBoardPieces();
  })

  Canvas.addPieceToBoard = function (e){
    newPiece = (new Hexagon ((board.length + 1) , e.x, e.y, 'piece'))
    // newPiece.neighbors = newPiece.generateNeighbors(e.x, e.y)
    board.push(newPiece)
  }

  Canvas.returnClickedPiece = function(e){
    var clickedPiece = null;
    board.forEach(function(hexagon){
      if(hexagon.isInBounds(e.x,e.y)){
        clickedPiece = hexagon
      }
    })
    return clickedPiece;
  }

  Canvas.selectPiece = function(piece){
    if(piece != null){
      if(!piece.selected){
        piece.selected = true
        selectedPiece = piece
      }
    }
  }
  Canvas.deselectPiece = function(){
    if(selectedPiece != null){
      selectedPiece.selected = false;
      selectedPiece = null;
    }
  }

  Hexagon.prototype.updatePositions = function(x,y){
    this.updateHexagonPoints(x,y);
    this.updateGhosts(x,y);
  }

  Hexagon.prototype.updateHexagonPoints = function(x,y){
    //Update all 6 Points
    this.Points.forEach(function(point){
      point.X += x;
      point.Y += y;
    })
    //update all the other helper points
    this.TopLeftPoint.X     += x;
    this.TopLeftPoint.Y     += y;
    this.BottomRightPoint.X += x;
    this.BottomRightPoint.Y += y;
    this.x                  += x;
    this.y                  += x;
    this.x1                 += x;
    this.y1                 += y;
    this.MidPoint.X         += x;
    this.MidPoint.Y         += y;
  }

  Hexagon.prototype.updateGhosts = function(e){
    // debugger
    if (this.type == 'piece' ){
      this.neighbors.forEach(function(ghost){
        if (ghost.type == 'piece' && ghost.selected){
          //do nothing
        } else {
          ghost.updateHexagonPoints(e)
        }
      })
    }
  }




})