import io from 'socket.io-client'

const socket = io();

socket.on('connection', () => {
  console.log(socket.id);
});