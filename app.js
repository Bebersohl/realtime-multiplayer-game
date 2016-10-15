const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket.listen(server);

let messages = [];
let dt, dte, localTime;
setInterval(function(){
    dt = Date.now() - dte;
    dte = Date.now();
    localTime += dt / 1000.0;
}, 4);


require('./server/io')(io);

server.listen(process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname })
});

module.exports = app;
