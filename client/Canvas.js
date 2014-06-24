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
      Canvas.addPiecesToBoard()
    }
  }

  Canvas.clear = function(){
    Swarm.ctx.clearRect(0,0, Swarm.ctx.canvas.clientWidth, Swarm.ctx.canvas.clientHeight)

  }

  Canvas.addPiecesToBoard = function(){
    for (piece in board) {
      board[piece].draw(ctx)
    }
  }

})