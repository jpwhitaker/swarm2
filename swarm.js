if (Meteor.isClient) {
  Meteor.startup(function () {
      // Canvas.resizeCanvas();
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

      givePlayerPieces = function(){
        for (player in players) {
          for (pieceType in pieces){
            for (i = 0; i < pieces[pieceType]; i++) {
              piece = new Piece.Hexagon(pieceType, 0, 0)
              players[player].push(piece)
            };
          };
        };
      };

      // givePlayerPieces = function(){
      //   _.each(players, function(player){
      //     _.each(pieces, function(piece){
      //       _.map(pieces, function(piece, amount){
      //         return 
      //       })
      //     })
      //   })
      // }



      // canvas.addEventListener('dblclick', function(event){
      //   Canvas.addPieceToBoard()
      // })

      // Canvas.dragHex();

  })
};
