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
    selectedPiece.tryMove();
    Canvas.deselectPiece();
    Canvas.clear();
    Canvas.drawBoardPieces();
  })

  Canvas.addPieceToBoard = function (e){
    board.push(new Hexagon ((board.length + 1) , e.x, e.y, 'piece', Hexagon.generateNeighbors(e.x, e.y)))
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

  Hexagon.prototype.updateNeighbors = function(){

  }

  Hexagon.prototype.returnOwnNeighbors = function(){
    return this.neighbors
  }

  Canvas.returnAllNeighbors = function(){
    ghostArray = [];
    board.forEach(function(hexagon){
      neighbors = (hexagon.returnOwnNeighbors())
      neighbors.forEach(function(neighbor){
        ghostArray.push(neighbor)
      })
    })
    return ghostArray
  }

  Hexagon.prototype.returnIfOnGhost = function(){
    point = this.MidPoint
    ghosts = Canvas.returnAllNeighbors()
    pieceLandedOn = null;
    ghosts.forEach(function(ghost){
      if(ghost.isInBounds(point.X,point.Y)){
        pieceLandedOn = ghost;
      }
    })
    return pieceLandedOn;
  }

  Hexagon.prototype.copyPoints = function(pointsToCopy){
    this.Points.forEach(function(point, num){
      
      point.X = pointsToCopy.Points[num].X;
      point.Y = pointsToCopy.Points[num.Y];
    })
    //update all the other helper points
    this.TopLeftPoint.X     = pointsToCopy.TopLeftPoint.X;
    this.TopLeftPoint.Y     = pointsToCopy.TopLeftPoint.Y ;
    this.BottomRightPoint.X = pointsToCopy.BottomRightPoint.X;
    this.BottomRightPoint.Y = pointsToCopy.BottomRightPoint.Y;
    this.x                  = pointsToCopy.x ;
    this.y                  = pointsToCopy.y ;
    this.x1                 = pointsToCopy.x1;
    this.y1                 = pointsToCopy.y1;
    this.MidPoint.X         = pointsToCopy.MidPoint.X;
    this.MidPoint.Y         = pointsToCopy.MidPoint.Y;
  }

  Hexagon.prototype.tryMove = function(){
    spot = selectedPiece.returnIfOnGhost();
    selectedPiece.copyPoints(spot);
  }



})