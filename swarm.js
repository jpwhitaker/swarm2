if (Meteor.isClient) {

  Meteor.startup(function () {
      Canvas.resizeCanvas();
      Piece.Hexagon = Piece(document.querySelector('canvas'))


      player1 = [];
      player2 = [];

      players = [player1, player2];


      pieces = {
        ant:    3,
        hopper: 3,
        spider: 2,
        beetle: 2,
        queen:  1
      };

      Game.start()
      board = player1.concat(player2)


      // canvas.addEventListener('dblclick', function(event){
      //   Canvas.addPieceToBoard()
      // })

      Canvas.dragHex();

  })
};
