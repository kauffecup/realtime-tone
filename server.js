const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.text());

app.get('/', function(req, res){
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});
