var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    childProcess = require('child_process'),
    path = require('path'),
    app = require('express')(),
    http = require('http').Server(app),
    WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ server: http }),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    initRemoteControlExpress = require("./remote-control-express"),
    initRemoteControlSocket = require("./remote-control-socket"),
    rover,
    remoteControl,
    httpPort = 3000,
    streamPort = 8082;

app.use(require("express").static('public'));
app.get('/js/jsmpeg.js',function(req,res) {
    res.sendfile(path.join(__dirname,'node_modules','jsmpeg','jsmpg.js'));
});

http.listen(httpPort);

board.on("ready", function onReady() {
    console.log('device is ready');
    
    rover = new Rover(board);
    initRemoteControlSocket(wss, rover);
    initRemoteControlExpress(app, rover);
});  

/// Video streaming section
// Reference: https://github.com/phoboslab/jsmpeg/blob/master/stream-server.js

var STREAM_MAGIC_BYTES = 'jsmp'; // Must be 4 bytes
var width = 320;
var height = 240;

wss.on('connection', function(socket) {
  // Send magic bytes and video size to the newly connected socket
  // struct { char magic[4]; unsigned short width, height;}
  var streamHeader = new Buffer(8);

  streamHeader.write(STREAM_MAGIC_BYTES);
  streamHeader.writeUInt16BE(width, 4);
  streamHeader.writeUInt16BE(height, 6);
  socket.send(streamHeader, { binary: true });

  console.log('New WebSocket Connection (' + wss.clients.length + ' total)');

  socket.on('close', function(code, message){
    console.log('Disconnected WebSocket (' + wss.clients.length + ' total)');
  });
});

wss.broadcast = function(data, opts) {
  for(var i in this.clients) {
    if(this.clients[i].readyState == 1) {
      this.clients[i].send(data, opts);
    }
    else {
      console.log('Error: Client (' + i + ') not connected.');
    }
  }
};

// HTTP server to accept incoming MPEG1 stream
http.createServer(function (req, res) {
  console.log(
    'Stream Connected: ' + req.socket.remoteAddress +
    ':' + req.socket.remotePort + ' size: ' + width + 'x' + height
  );

  req.on('data', function (data) {
    wss.broadcast(data, { binary: true });
  });
}).listen(streamPort, function () {
  console.log('Listening for video stream on port ' + streamPort);

  // Run do_ffmpeg.sh from node                                                   
  childProcess.exec('do_ffmpeg.sh');
});
