module.exports = function(io){

  io.on('connection', function(socket){
    console.log(`[${socket.id}] -> connected`);
    socket.emit('connection');

    socket.on('disconnect', function(){
      console.log(`[${socket.id}] -> disconnected`);
    });
  });

}