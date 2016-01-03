var five = require("johnny-five"),
    Edison = require("edison-io"),
    board = new five.Board({
        io: new Edison()
    }),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Rover = require("./rover"),
    RoverLogger = require("./rover-logger"),
    initRemoteControlExpress = require("./remote-control-express"),
    initRemoteControlSocket = require("./remote-control-socket"),
    rover,
    remoteControl;

app.use(require("express").static('public'));
http.listen(3000);

board.on("ready", function onReady() {
    console.log('device is ready');
    
    rover = new Rover(board);
    initRemoteControlSocket(io, rover);
    initRemoteControlExpress(app, rover);
});  



