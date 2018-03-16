const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {

  socket.on('message', msg => {
    io.emit('message', msg);
  });

  socket.on('name', name => {
    io.emit('name', name);
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
