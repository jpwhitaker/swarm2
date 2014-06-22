Game = {}
Game.start = function(){

  Game.givePlayerPieces();
  Canvas.addPiecesToBoard();

}

Game.givePlayerPieces = function(){
  for (player in players) {

    for (var pieceType in pieces){
      for (i = 0; i < pieces[pieceType]; i++) {
        playersPieces = players[player]
        x = (playersPieces.length*100);
        y = (100*(+player + 1));
        // console.log (player,x,y, '2');
        piece = new Piece.Hexagon(playersPieces.length || '0', x, y, pieceType)
        players[player].push(piece)
      };
    };
  };
};
