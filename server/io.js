module.exports = function(io){

  let players = [];

  setInterval(function(){
    io.emit('update', {players: players});
  }, 100)

  io.on('connection', function(socket){
    // console.log(`[${socket.id}] -> connected`);
    socket.broadcast.emit('new player', {id: socket.id});
    players.push({
      id: socket.id,
      x: 100,
      y: 100,
    });

    socket.on('new position', function(packet){
      players = players.map((player) => {
        if(player.id === socket.id){
          return {
            id: socket.id,
            x: packet.x,
            y: packet.y,
          }
        }else{
          return player;
        }
      })
    });
    // console.log('connect', players);
    socket.on('disconnect', function(){
      // console.log(`[${socket.id}] -> disconnected`);
      players = players.filter((player) => player.id !== socket.id);
      socket.broadcast.emit('player left', {id: socket.id});
    });
  });

}
