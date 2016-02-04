var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    childProcess = require('child_process'),
    path = require('path'),
    app = require('express')(),
    http = require('http'),
    WebSocketServer = require('ws').Server,
    httpServer = http.createServer(app),
    wss = new WebSocketServer({ server: httpServer }),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    initRemoteControlExpress = require("./remote-control-express"),
    initRemoteControlSocket = require("./remote-control-socket"),
    rover,
    remoteControl,
    httpPort = 3000,
    streamPort = 8082;

app.use(require("express").static('public'));
//app.get('js/jsmpg.js',function(req,res) {
//    console.log('sending jsmpg');
//    res.sendfile(path.join(__dirname,'node_modules','jsmpeg','jsmpg.js'));
//});

httpServer.listen(httpPort);

board.on("ready", function onReady() {
    console.log('device is ready');

    var led1 = new five.Led.RGB({
      pins: {
        red: 2,
        green: 1,
        blue: 0
      },
      controller: "PCA9685"
    });

  led1.on();
  led1.color("#FF0000");
   
    var led2 = new five.Led.RGB({                                            
      pins: {                                                               
        red: 5,                                                             
        green: 4,                                                           
        blue: 3                                                             
      },                                                                    
      controller: "PCA9685"                                                 
    });                                                                     
                                                                            
  led2.on();                                                                 
  led2.color("#00FF00");  

    var led3 = new five.Led.RGB({                                            
      pins: {                                                               
        red: 8,                                                             
        green: 7,                                                           
        blue: 6                                                             
      },                                                                    
      controller: "PCA9685"                                                 
    });                                                                     
                                                                            
  led3.on();                                                                 
  led3.color("#0000FF");  

    var led4 = new five.Led.RGB({                                            
      pins: {                                                               
        red: 11,                                                             
        green: 10,                                                           
        blue: 9                                                             
      },                                                                    
      controller: "PCA9685"                                                 
    });                                                                     
                                                                            
  led4.on();                                                                 
  led4.color("#00FF00");  

    var led5 = new five.Led.RGB({                                            
      pins: {                                                               
        red: 14,                                                             
        green: 13,                                                           
        blue: 12                                                             
      },                                                                    
      controller: "PCA9685"                                                 
    });                                                                     
                                                                            
  led5.on();                                                                 
  led5.color("#FF0000");  

 
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
  childProcess.exec(path.join(__dirname, 'do_ffmpeg.sh'), function(err, stdout, stderr) {
    if( err) {
      throw err;
    }

    console.log(stdout);
  });
  console.log('i am here right now');
});
