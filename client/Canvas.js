  Canvas = {}
Meteor.startup(function(){

  var canvas = document.getElementById('canvas');
  Canvas.width = window.innerWidth;
  Canvas.height = window.innerHeight;

  Canvas.resizeCanvas = function(){

    ctx = canvas.getContext('2d');

    ctx.canvas.width = Canvas.width;
    ctx.canvas.height = Canvas.height;

    //canvas resize
    window.onresize = function(event) {
      Canvas.width = window.innerWidth;
      Canvas.height = window.innerHeight;
      ctx.canvas.width = Canvas.width;
      ctx.canvas.height = Canvas.height;
      Canvas.drawBoardPieces()
    }
  }

  Canvas.clear = function(){
    ctx.clearRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)

  }


  Canvas.drawAllPieces = function(){
    Canvas.drawBoardPieces()
    Canvas.drawGhost()
  }

  Canvas.drawBoardPieces = function(){
    for (piece in board) {
      board[piece].draw(ctx)
    }
  }

  Canvas.drawGhost = function(){
    for(piece in board){
      for(ghost in board[piece].neighbors){
        board[piece].neighbors[ghost].draw(ctx)
      }
    }
  }

})