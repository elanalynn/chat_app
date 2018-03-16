const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  socket.on('message', msg => {
    io.emit('message', msg);
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/msgs', (req, res) => {

});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
