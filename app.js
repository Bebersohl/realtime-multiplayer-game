const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket.listen(server);
require('./server/io')(io);

server.listen(process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname })
});

module.exports = app;