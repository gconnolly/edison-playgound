var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    express = require("express"),
    webServer = express(),
    http = require('http').Server(webServer),
    io = require("socket.io")(http),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    RemoteControlWebServer = require("./remote-control-web-server"),
    rover,
    remoteControl;

webServer.use(express.static('public'));
webServer.listen(3000);

board.on("ready", function onReady() {
    console.log('device is ready');
    io.on('connection', function(socket){
        console.log('a user connected');
        rover = new RoverLogger(board);
        remoteControl = new RemoteControlWebServer(webServer, rover);
        
        socket.on('forward', function () {
            console.log('user request forward');
            rover.forward();
        });
        
        socket.on('backward', function () {
            console.log('user request backward');
            rover.backward();
        });
        
        socket.on('right', function () {
            console.log('user request right');
            rover.right();
        });
        
        socket.on('left', function () {
            console.log('user request left');
            rover.left();
        });
        
        socket.on('honk', function () {
            console.log('user request honk');
            rover.honk();
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
            rover.stop();
        });
    });
});  



